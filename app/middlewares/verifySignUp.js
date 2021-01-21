const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  try {
      // Username
  User.findOne({
    username: req.body.user.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err , success: false});
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" , success: false});
      return;
    }

    // Email
    User.findOne({
      email: req.body.user.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err, success: false });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" , success: false});
        return;
      }

      next();
    });
  });
  } catch (error) {
    console.log(error);
  }
};


checkDuplicateEmailOnly = (req, res, next) => {
  try {
    // Username
    // Email
    User.findOne({
      email: req.body.user.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err, success: false });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!", success: false });
        return;
      }
      next();
    });
  } catch (error) {
    console.log(error);
  }
};


const checkRolesExisted = (req, res, next) => {
  try {
    if (req.body.roles) {
      for (let i = 0; i < req.body.user.roles.length; i++) {
        if (!ROLES.includes(req.body.user.roles[i])) {
          res.status(400).send({
            message: `Failed! Role ${req.body.user.roles[i]} does not exist!`,
            success: false
          });
          return;
        }
      }
    }
  
    next();
  } catch (error) {
    console.log(error);
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
