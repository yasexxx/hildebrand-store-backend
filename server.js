/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const chalk = require('chalk');
const compress = require("shrink-ray-current");
const session = require("express-session");
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const app = express();
const enforce = require('express-sslify');
const rateLimit = require('express-rate-limit');
const path = require('path');

dotenv.config();

const apiLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT * 60 * 1000,
  max: process.env.RATE_MAX_LIMIT
});

app.use(helmet({
  contentSecurityPolicy: false,
}));

if( process.env.NODE_ENV !== 'development'){
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.enable('trust proxy');
}
app.use(
  session({
    secret: process.env.SESSION_SECRET ,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000000
    }
  })
);
//parse requests of content-type - application/json
app.use(bodyParser.json({limit: '50mb'}));
//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(compress());

const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Cart = db.cart;
const Avatar = db.avatar;

db.mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
        console.log(chalk.cyanBright("Connected to the database!"));
        initial();
    })
    .catch( err => {
        console.log(chalk.red("Cannot connect to the database!"), err);
        process.exit();
    });

//simple route
app.use(apiLimiter);

require("./app/routes/product.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/upload.routes")(app);
require("./app/routes/carousel.route")(app);
require("./app/routes/cart.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/notification.routes")(app);

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/*', async (req, res) => {
  try {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  } catch (error) {
    console.log(error);
  }
});


// set port, listen for requests
const PORT = process.env.PORT || 3000;
const ADDR = 'localhost';
app.listen(PORT, () => {
    console.log(chalk.cyanBright(`Server is running at ${ADDR} on port ${PORT}.`));
});
//

async function initial() {
  try {
    await Role.estimatedDocumentCount( async (err, count) => {
      if (!err && count === 0) {
         await new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("Added 'user' to roles collection");
        });
  
        await new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("Added 'moderator' to roles collection");
        });
  
        await new Role({
          name: "Admin"
        }).save( (err,admin) => {
          if (err) {
            console.log("error", err);
          }
          if(admin){
            userAdminCreation();
            console.log("Added 'admin' to roles collection");
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
  }
  const userAdminCreation = async () => {
    try {     
    const roleSet = ['moderator', 'Admin', 'user'];
    const userAdminName = process.env.ADMIN_USER_KEY;
    const user = new User({
      username: userAdminName,
      email: 'adminuser123@gmail.com',
      firstname: 'Admin',
      lastname: "User",
      phonenumber: "None",
      address: "Not Available",
      password: bcrypt.hashSync( process.env.ADMIN_PASS_KEY, 8),
      terms: true,
      picture: {
          data: '',
          mimetype: '',
          url: 'https://ssl.gstatic.com/accounts/ui/avatar_2x.png'
      }
    });
    
    await user.save( async (err, user) => {
      if (err) {
        console.log(err);
        return;
      }
      if (roleSet) {
        await Role.find(
          {
            name: { $in: roleSet}
          },
          async (err, roles) => {
            if (err) {
              console.log(err);
            }
            user.roles = roles.map(role => role._id);
            await user.save(err => {
              if (err) {
                console.log(err);
                return;
              }
              console.log("Admin successfully registered at rules");
            });
          }
        );
        createCartAdmin(userAdminName);
        createAvatarAdmin(userAdminName);
      } else {
        await Role.findOne({ name: "user" }, async (err, role) => {
          if (err) {
            console.log(err);
            return;
          }
          user.roles = [role._id];
          await user.save(err => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("Admin successfully registered at user");
          });
        });
        createCartAdmin(userAdminName);
        createAvatarAdmin(userAdminName);
      }
    });
    } catch (error) {
      console.log(error);
    }
  };

const createCartAdmin = (username) => {
  try {
    const cart = new Cart({
      attributes: {
          cartArr: [],
          totalAmount: 0
      }
  });
  cart.save( (err, cart) => {
    if(err){
    console.log(chalk.red(err));
    }
    User.findOne({ username: username} , (err, user) => {
    if (err) {
    console.log(chalk.red(err));
    return;
    }
    cart.user = user.id;
    cart.save( err => {
    if(err){
    console.log(chalk.red(err));
    }
    console.log(chalk.green('Successfully added a cart to an admin'));
    })
    });
    });
  } catch (error) {
    console.log(error);
  }
  }
  
  
const createAvatarAdmin = (username) => {
  try {
    const avatar = new Avatar({
      data: '',
      mimetype: '',
      url: 'https://ssl.gstatic.com/accounts/ui/avatar_2x.png'
    });
    avatar.save( (err, avatar) => {
    if(err){
    console.log(chalk.red(err));
    }
    User.findOne({ username: username} , (err, user) => {
    if (err) {
    console.log(chalk.red(err));
    return;
    }
    avatar.user = user._id;
    avatar.save( err => {
    if(err){
    console.log(chalk.red(err));
    }
    console.log(chalk.green('Successfully added an avatar profile to an admin'));
    })
    });
    });
  } catch (error) {
    console.log(error);
  }
  }