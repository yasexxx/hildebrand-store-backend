const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {

  const apiUrl = '/api/v1/en-PH/auth';
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  app.post(
    apiUrl+"/signup",
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    controller.signup
  );

  app.post(apiUrl+'/refresh-token', controller.checkTokenExpired);

  app.get(apiUrl+'/callback', controller.getSocialLogin);

  app.post(apiUrl+'/oath/signin', controller.socialLogin);

  app.put(apiUrl+"/update-user/:id", authJwt.verifyToken, controller.updateUserProfile);

  app.put(apiUrl+"/update-user/avatar/:id", authJwt.verifyToken, controller.updateAvatar);
  
  app.post(apiUrl+"/signin", controller.signin);

  app.get(apiUrl+"/user/:id", authJwt.verifyToken, controller.getUserProfile);

  app.get(apiUrl+"/update-user/avatar/:id", authJwt.verifyToken, controller.getAvatarProfile);
};
