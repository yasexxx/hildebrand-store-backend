
var router = require("express").Router();

const { authJwt } = require("../middlewares");

module.exports = app => {


const product  = require("./../controllers/product.controller");

    const url = "/products";

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    
    router.post(url, [authJwt.verifyToken, authJwt.isAdmin], product.fileUpload );

    router.get(url, product.findAll);

    router.get(url+"/published", product.findAllPublished);
  
    router.get(url+'/:id', product.findOne);

    router.put(url+'/:id', [authJwt.verifyToken, authJwt.isAdmin], product.update);
  
    router.delete(url+'/:id', [authJwt.verifyToken, authJwt.isAdmin], product.delete);

    router.delete(url+'/',[authJwt.verifyToken, authJwt.isAdmin], product.deleteAll);

    router.get(url+'/display/top-products', product.findTopProduct);

    router.get(url+'/display/top-products/length', product.topProductCount );

    router.get(url+'/display/latest-products', product.findLatestProduct);

    router.get(url+'/display/featured-products', product.findFeaturedProduct);

    router.get(url+'/display/supermarket-products', product.findSupermarketProduct);

    router.get(url+'/display/restaurant-products', product.findRestaurantProduct);

    router.get(url+'/display/other-products', product.findOtherProduct);

    router.get(url+'/display/restaurant-products/food', product.findRestaurantFood);

    router.get(url+'/display/restaurant-products/dessert', product.findRestaurantDessert);

    router.get(url+'/display/restaurant-products/drink', product.findRestaurantDrink);

    router.get(url+'/display/supermarket-products/grocery', product.findSupermarketGrocery);

    router.get(url+'/display/supermarket-products/vegetable', product.findSupermarketVegetable);

    router.get(url+'/display/supermarket-products/canned-goods', product.findSupermarketCannedGoods);

    app.use('/api/v1/en-PH', router);
}