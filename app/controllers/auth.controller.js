const db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const cryptoJS = require("crypto-js");
const User = db.user;
const Role = db.role;
const Cart = db.cart;
const Avatar = db.avatar;
const Token = db.token;
const SocialLogin = db.socialLogin; 
const chalk = require('chalk');
const upload = require('./../middlewares/upload');
const notification = require('./notification.controller');

exports.signup = async (req, res) => {
  try {
    const request = req.body.user;
  if (!request.terms){
    res.status(500).send({message: 'Form is incomplete',
      success: false});
  }

  const user = new User({
    username: request.username,
    email: request.email,
    firstname: request.firstname,
    lastname: request.lastname,
    phonenumber: request.phoneNumber,
    address: request.address,
    password: bcrypt.hashSync(request.password, 8),
    terms: request.terms,
    picture: {
        data: '',
        mimetype: '',
        url: request.picture
    }
  });

  await user.save( async (err, user) => {
    if (err) {
      res.status(500).send({ message: err, success: false });
      return;
    }
    if (req.body.roles) {
      await Role.find(
        {
          name: { $in: req.body.roles }
        },
        async (err, roles) => {
          if (err) {
            res.status(500).send({ message: err, success: false  });
            return;
          }

          user.roles = roles.map(role => role._id);
          await user.save(err => {
            if (err) {
              res.status(500).send({ message: err, success: false});
              return;
            }
            res.status(202).send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      await Role.findOne({ name: "user" }, async (err, role) => {
        if (err) {
          res.status(500).send({ message: err, success: false });
          return;
        }
        user.roles = [role._id];
        await user.save(err => {
          if (err) {
            res.status(500).send({ message: err, success:false });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
    notification.createNotification(user._id, `Welcome you register successfully as ${user.username}`,
                    'user', 'gift');
  });

  createCart(req);
  createAvatar(req);
  } catch (error) {
    console.log(error);
  }
};


exports.signin = (req, res) => {
  try {
    User.findOne({
      username: req.body.username
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err, success: false});
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." , success: false});
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
            success: false
          });
        }
        const passWord = req.body.password;
        respondUponSignin(user, res, passWord);
      });
  } catch (error) {
    console.log(error);
  }
};


const respondUponSignin = (user, res, pass='password') => {
try {
  const userId = user._id;
  let token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  });

  var authorities = [];

  for (let i = 0; i < user.roles.length; i++) {
    authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
  }


Token.deleteMany({userId: userId}, (err, result) => {
  if(err){
    console.log(err);
  }
  console.log('Sucessfully deleted tokens');
});

const createToken = new Token( {
  userId: user._id,
  token: token,
  creationTime: new Date()
});

createToken.save( (err, token1) => {
  if (err){
    console.log(err);
    return;
  }

  const key = cryptoJS.enc.Utf8.parse(process.env.ENCRYPT_SECRET);
  const iv = cryptoJS.enc.Utf8.parse(key);
  const hashPassword = cryptoJS.AES.encrypt(pass,key,
    {
      keySize: 128/8,
      iv: iv,
      mode: cryptoJS.mode.CFB,
      padding: cryptoJS.pad.Iso97971
    }).toString();
  res.status(200).send({
    id: user._id,
    username: user.username,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    address: user.address,
    phonenumber: user.phonenumber,
    roles: authorities,
    accessToken: token,
    tokenId: token1._id,
    hashId: hashPassword
  });
});
} catch (error) {
  console.log(error);
}
}


exports.checkTokenExpired = async  (req, res) => {
  try {
    const token = req.body.token;
    const tokenId = req.body.tokenId;
    if (!token){
      res.status(403).send({message: 'Invalid token request.'});
      return;
    }
    await Token.findById(tokenId)
      .then( (theToken) => {
          if (!theToken){
            res.status(404).send( {message: 'No token match found!'});
            return;
          }
          Token.findByIdAndDelete(tokenId
            ).then( data => {
              data;
            })

          const createdAt = theToken.creationTime;
          const thisTime = new Date();
          const sec = (thisTime.getTime() - createdAt.getTime()) / 1000;

          if (sec <= (process.env.EXPIRED_TIME_TOKEN) * 60 ) {
            respondTokenBack(req, res);
          } else {
            res.status(404).send( {message: 'Invalid token'})
          }
      }).catch(
        err => {
          console.log(err);
          res.status(400).send( { message: 'Server error. Try again!'});
          return
        }
      );
  } catch (error) {
    console.log(error);
    return;
  }
}


const respondTokenBack = (req, res) => {
  try {
    const id = req.body.userId;
    let token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES
    });
  
  
    const createToken = new Token( {
      userId: id,
      token: token,
      creationTime: new Date()
    }) 
  
    createToken.save( (err, token1) => {
      if (err){
        console.log(err);
        return;
      }
      res.status(200).send({
        refreshToken: token,
        tokenId: token1._id
      });
    });
  } catch (error) {
    console.log(error);
  }
}


exports.updateUserProfile = (req, res) => {
  try {
    if(!req.body) {
      return res.status(400).send( {
        message: 'Cannot change profile settings.',
        success: false
      });
    }
    const id = req.params.id;
    const data =req.body;
    User.findByIdAndUpdate( id ,data, {useFindAndModify: false},function( err, doc, res) {
      if(err) { 
        res.status(400).send(
          {message: err , success: false }
        )
      } })
  .then(data => {
      if(!data) {
          res.status(404).send( {
              message: ` Cannot update user with id=${id}. Check if user exist!`
          });
      }
      res.send( { message: `The username ${data.username} was successfully updated!`});
  })
  .catch( err => {
      res.status(500).send( {
          message: `Error updating user with id: ${id}`
      });
  });
  } catch (error) {
    console.log(error);
  }
}


exports.updateAvatar = async (req, res) => {
  try {
    await upload(req, res);
    const selectedFile = req.file;
    if(!selectedFile) {
      return res.status(406).send( {
        message: 'No profile picture selected.',
        success: false
      });
    }
    const buffer = selectedFile.buffer;
    const id = req.params.id;
    Avatar.findOneAndUpdate( {user: id} ,{ $set: {'data': buffer, 'mimetype': selectedFile.mimetype }}, {useFindAndModify: false},function( err, doc, res) {
      if(err) {
        console.log(err);
        res.status(400).send({message: err , success: false});
      }
    })
    .then(data => {
      if(!data) {
          res.status(404).send( {
              message: ` Cannot update profile picture with id=${id}. Check if user exist!`,
              success: false
          });
      }
      res.status(200).send( { message: `The profile picture was successfully updated!`,
                  success: true});
    })
    .catch( err => {
        res.status(500).send( {
            message: `Error updating avatar with id: ${id}`,
            success: false
        });
  });
  } catch (error) {
    console.log(error);
    res.status(500).send({message: error, success:false})
  }
  
}

exports.getUserProfile = (req, res) => {
  try {
    const id = req.params.id;
    User.find({ _id: id })
    .then(data => {
        if (!data){
            res.status(404).send( { message: `Can't find cart`});
        } else {
          if(data[0] !== undefined){
            var newArray = data[0];
            newArray = JSON.parse(JSON.stringify(newArray));
            delete newArray['password'];
            const finalData = [newArray];
            res.send(finalData);
          }
        }
    })
    .catch( err => {
        console.log(err);
        res.status(500)
        .send( {message: err.message || `Error retrieving cart with id=${id}`});
    });
  } catch (error) {
    console.log(error);
  }
}


exports.getAvatarProfile = (req, res) => {
  const id = req.params.id;
   Avatar.find({user: id })
    .then(data => {
        var newObject = data[0];
        newObject = JSON.parse(JSON.stringify(newObject));
        const buffer = Buffer.from(newObject.data);
        newObject.data = buffer.toString('base64');
        const finalData = [newObject];
        res.send(finalData)
    })
    .catch( err => {
        res.status(500)
        .send( {message: err.message || `Error retrieving cart with id=${id}`});
    });
}

exports.socialLogin = (req, res) => {

  const request = req.body;
  if (!request.terms){
    res.status(500).send({message: 'Form is incomplete',
      success: false});
  }

  SocialLogin.findOne({
    altId: request.altId , email: request.email
  }).exec( (err,socialAccount) => {
    if (err){
      console.log(err);
      res.status(500).send({ message: err, success:false});
      return;
    }
    if (socialAccount){
      socialSignIn(req, res);
    } 
    if (!socialAccount){
      socialAccountSignUp(req, res);
    }
  })
};

exports.getSocialLogin = (req, res) => {
  const body = req.body;
  console.log(body);
  res.send('hello')
}


const socialAccountSignUp = (req, res) => {
  const request = req.body;
  const socialLogin = new SocialLogin({
    firstname: request.firstname,
    lastname: request.lastname,
    altId: request.altId,
    email: request.email,
    provider: request.provider,
    token: {
      auth: request.token.auth ? request.token.auth : '',
      id: request.token.id !== '' ? request.token.id : process.env.DEFAULT_USER_PASSKEY
    },
    photoUrl: request.photoUrl
  });

  socialLogin.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      console.log(err);
      return;
    }
    if (user) {
      User.findOne({
        email: request.email
      }).populate("roles", "-__v")
      .exec((err, user2) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: err });
          return;
        }
        if (!user2) {
          socialUserSignUp(req, res, user);
        }
        if (user2) {
          respondUponSignin(user2, res);
        }
      });
    }
  })
};



const socialSignIn = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        address: user.address,
        phonenumber: user.phonenumber,
        roles: authorities,
        accessToken: token
      });
    });
};


const socialUserSignUp = async (req, res, socialUser) => {
try {
  const request = req.body
  const username = 't'+socialUser.altId;
  const user = new User({
    username: username,
    email: request.email,
    firstname: request.firstname,
    lastname: request.lastname,
    phonenumber: 'none',
    address: 'none',
    password: bcrypt.hashSync(socialUser.token.id, 8),
    terms: request.terms,
    picture: {
        data: '',
        mimetype: '',
        url: request.photoUrl
    }
  });

  await user.save( async (err, user3) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      await Role.find(
        {
          name: { $in: req.body.roles }
        },
        async (err, roles) => {
          if (err) {
            console.log(err);
            res.status(500).send({ message: err  });
            return;
          }

          user3.roles = roles.map(role => role._id);
          await user3.save( (err, user) => {
            if (err) {
              console.log(err);
              res.status(500).send({ message: err});
              return;
            }
            if (user){
              socialSignIn(req, res);
            }
          });
        }
      );
    } else {
      await Role.findOne({ name: "user" }, async (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user3.roles = [role._id];
        await user3.save( (err, user4) => {
          if (err) {
            console.log(err);
            res.status(500).send({ message: err });
            return;
          }
          if (user4) {
            socialSignIn(req, res);
          }
          
        });
      });
    }
  });

  createCartSocial(username);
  createAvatarSocial(username);
} catch (error) {
  console.log(error);
}
};


const createCart = (req) => {
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
    User.findOne({ username: req.body.user.username} , (err, user) => {
    if (err) {
    console.log(chalk.red(err));
    return;
    }
    cart.user = user.id;
    cart.save( err => {
    if(err){
    console.log(chalk.red(err));
    }
    console.log(chalk.green('Successfully added a cart to user!'));
    })
    });
    });
  } catch (error) {
    console.log(error);
  }
}


const createAvatar = (req) => {
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
    User.findOne({ username: req.body.user.username} , (err, user) => {
    if (err) {
    console.log(chalk.red(err));
    return;
    }
    avatar.user = user.id;
    avatar.save( err => {
    if(err){
    console.log(chalk.red(err));
    }
    console.log(chalk.green('Successfully added an avatar profile to a user!'));
    })
    });
    });
  } catch (error) {
    console.log(error);
  }
}


const createCartSocial = (username) => {
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
    console.log(chalk.green('Successfully added a cart to user in Social!'));
    })
    });
    });
  } catch (error) {
    console.log(error);
  }
}


const createAvatarSocial = (username) => {
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
    console.log(chalk.green('Successfully added an avatar profile to a user in Social!'));
    })
    });
    });
  } catch (error) {
    console.log(error);
  }
}
