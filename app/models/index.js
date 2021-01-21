const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

//DB MODEL IMPORTS
db.product = require('./product.model.js')(mongoose);
db.post = require('./post.model.js')(mongoose);
db.notification = require('./notification.model')(mongoose);
db.user = require('./user.model');
db.role = require('./role.model');
db.avatar = require('./avatar.model');
db.token = require('./token.model');
db.file = require('./upload.model')(mongoose);
db.carousel = require('./carousel.model')(mongoose);
db.cart = require('./cart.model')(mongoose);
db.order = require('./order.model')(mongoose);
db.socialLogin = require('./social-login.model')(mongoose);
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;

