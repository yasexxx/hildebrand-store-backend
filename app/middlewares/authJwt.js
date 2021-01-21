const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Role = db.role;


const verifyToken = (req, res, next) => {
  try {
    let tokenInMsg = req.headers["x-access-token"];
  const token = tokenInMsg ? tokenInMsg.split(' ')[1]: '';
  if (!token) {
    return res.status(404).send({ message: "No token provided!",
    success: false });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" , success: false});
    }
    req.userId = decoded.id;
    next();
  });
  } catch (error) {
    console.log(error)
  }
};

const isAdmin = (req, res, next) => {
  try {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err, success: false });
        return;
      }
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err, success: false });
            return;
          }
          
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "Admin") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Admin Role!", success: false });
          return;
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

const isModerator = (req, res, next) => {
  try {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err , success: false});
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err, success: false });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Moderator Role!", success: false });
          return;
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;
