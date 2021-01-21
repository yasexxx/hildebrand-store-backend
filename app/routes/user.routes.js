const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {

  const extendUrl = '/api/v1/en-PH/test';


  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(extendUrl+"/all", controller.allAccess);

  app.get(extendUrl+"/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    extendUrl+"/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    extendUrl+"/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
