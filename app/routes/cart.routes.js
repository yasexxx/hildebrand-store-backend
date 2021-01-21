
var router = require('express').Router();

module.exports = app => {
    const cart = require('./../controllers/cart.controller');

    cartUrl = '/cart';

    router.get(cartUrl, cart.findAllCart);

    router.get(cartUrl+'/:id', cart.getCartByUserId );

    router.put(cartUrl+'/:id', cart.updateCart);

    router.post(cartUrl+'/item/:id', cart.deleteCartItem);

    router.post(cartUrl+'/change/:id', cart.changeQuantityCart);

    router.delete(cartUrl+'/remove/:id', cart.deleteCart);

    app.use('/api/v1/en-PH/user', router);
}