
var router = require("express").Router();

const { authJwt } = require("../middlewares");

module.exports = app => {


const order  = require("./../controllers/order.controller");

    const url = "/order";

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept",
        );
        next();
        });
        
    router.post(url+'/:id', authJwt.verifyToken, order.createOrder );

    router.get(url+'/:id', order.getOrderByUserId);

    router.get(url+'/id/:id', order.getItemById);
    
    app.use('/api/v1/en-PH', router);
}