
var router = require("express").Router();

module.exports = app => {


const carousel  = require("./../controllers/carousel.controller");

    const url = "/carousel";
    
    router.get(url, carousel.findAll);

    router.get(url+'/:id', carousel.findCarousel);

    router.post(url, carousel.uploadCarousel);

    router.put(url+'/:id', carousel.update);

    app.use('/api/v1/en-PH', router);
}