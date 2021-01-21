
var router = require("express").Router();

const { authJwt } = require("../middlewares");

module.exports = app => {


const notification  = require("./../controllers/notification.controller");

    const url = "/notification";

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept",
        );
        next();
        });
        
    router.get(url+'/user', notification.getUserNotification );

    router.get(url+'/read', notification.getNotificationIsRead );

    router.delete(url+'/delete', notification.deleteUserNotification);
    
    app.use('/api/v1/en-PH', router);
}