const { cart } = require("./../models");
const db = require("./../models");
const Cart = db.cart;


exports.findAllCart = (req, res) => {
    try {
        const cartUser = req.query.user;
    var listUserCart = cartUser ? { user: { $regex: new RegExp(cartUser), $options: "i" }}: {};

    Cart.find(listUserCart)
        .then( cartData => {
            res.status(200).send(cartData);
        })
        .catch( err => {
            res.status(500).send( {
                message:
                err.message || "Some error occured! Contact site administrator.",
                success: false
            })
        });
    } catch (error) {
        console.log(error);
    }
}


exports.getCartByUserId = (req, res) => {
    try {
        const id = req.params.id;
        Cart.find({user: id })
        .then(data => {
            if (!data)
                res.status(404).send( { message: `Can't find cart`, success: false});
            else {
                res.status(200).send(data);
            }
        })
        .catch( err => {
            res.status(500)
            .send( {message: err.message || `Error retrieving cart with id=${id}`,
                success: false});
        });  
    } catch (error) {
        console.log(error);
    }
}


exports.deleteCart = (req, res) => {
    try {
        const id = req.params.id;
        if(!req.body) {
                return res.status(400).send( {
                    message: 'Cart to update cannot be empty or invalid form!',
                    success: false
                });
            }
    const updateCartPush = function (err, docs) { 
        if (err){ 
            console.log(err); 
        }
    };

    Cart.findOneAndUpdate( { user:id}, { attributes: { cartArr : [] }  },updateCartPush, { new:true, upsert:true, useFindAndModify: false})
        .then(doc => {
            if(!doc) {
                res.status(404).send( {
                    message: `Cannot delete cart with id=${id}. Check if product exist!`,
                    success: false
                });
            }
            res.status(202).send(doc);
        })
        .catch( err => {
            res.status(500).send( {
                message: `Error updating cart with id: ${id}`,
                success: false
            });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send( { messsage: error.message || `Error when trying upload image`,
    success: false} );
    }
};



exports.updateCart =  (req, res) => {
    try {
        const id = req.params.id;
        const parseData = JSON.parse(JSON.stringify(req.body));

        if(!req.body) {
                return res.status(400).send( {
                    message: 'Cart to update cannot be empty or invalid form!',
                    success: false
                });
            }
    const updateCartPush = function (err, docs) { 
        if (err){ 
            console.log(err); 
        }
    };

    Cart.findOneAndUpdate( { user:id}, { attributes: { cartArr : parseData }  },updateCartPush, { new:true, upsert:true, useFindAndModify: false})
        .then(doc => {
            if(!doc) {
                res.status(404).send( {
                    message: `Cannot update cart with id=${id}. Check if product exist!`,
                    success: false
                });
            }
            res.status(202).send(doc);
        })
        .catch( err => {
            res.status(500).send( {
                message: `Error updating cart with id: ${id}`,
                success: false
            });
        });
    }
    catch (error) {
        res.status(500).send( { messsage: error.message || `Error when trying upload image`,
    success: false } );
    }
};

exports.deleteCartItem = (req, res) => {
    try {
        const id = req.params.id;
        const parseData = JSON.parse(JSON.stringify(req.body));
        const name = parseData.name;
        const itemId = parseData.itemId;
        if(!req.body) {
            return res.status(400).send( {
                message: 'Cannot delete item empty request or invalid form!',
                success: false
            });
        }

        const logError = function (err, docs) { 
            if (err){ 
                console.log(err); 
            }
        }

        Cart.findOneAndUpdate({ user:id}, 
            { $pull: { 'attributes.cartArr': { _id : itemId }}}, logError,
            { useFindAndModify: false})
                .then(doc => {
                    if(!doc) {
                        res.status(404).send( {
                            message: `Cannot delete item ${name} with user id=${id}. Try again later!`,
                            success: false
                        });
                    }
                    res.status(202).send(doc);
                });
    }
    catch(err) {
        console.log(err);
    }
}


exports.changeQuantityCart = async (req, res) => {
    try {
        const id = req.params.id
        const parseData = JSON.parse(JSON.stringify(req.body));
        const name = parseData.name;
        const quantity = parseData.quantity;
        if(!req.body) {
            return res.status(400).send( {
                message: 'Cannot delete item empty request or invalid form!',
                success: false
            });
        }

        const logError = function (err, docs) { 
            if (err){ 
                console.log(err); 
            }
        }

        Cart.findOne({ user:id, 'attributes.cartArr.name': name},logError)
                .then( doc => {
                    if(!doc) {
                        res.status(404).send( {
                            message: `Cannot find item ${name} with user id=${id}. Try again later!`,
                            success: false
                        });
                    }
                    Cart.findOneAndUpdate({ user:id, 'attributes.cartArr.name': name}, 
                        { $set: {'attributes.cartArr.$.quantity': quantity}}, logError,
                        { useFindAndModify: false})
                            .then(doc => {
                                if(!doc) {
                                    res.status(404).send( {
                                        message: `Cannot update quantity of item ${name} with user id=${id}. Try again later!`,
                                        success: false
                                    });
                                }
                                res.status(202).send(doc);
                                
                            });
                });
        

    } catch (error) {
        console.log(error);
        res.status(500).send({message: error, success: false})
    }
}


