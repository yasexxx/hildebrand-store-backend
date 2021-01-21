const db = require("./../models");
const Order = db.order;
const Cart = db.cart;
const chalk  = require('chalk');
const notification = require('./notification.controller');

exports.createOrder = (req, res) => {
    try {
        const id = req.params.id;
        const request = req.body;
        const order = new Order({
          email: request.email,
          firstname: request.firstname,
          lastname: request.lastname,
          companyName: request.companyName ? request.companyName : '',
          phoneNumber: request.phoneNumber,
          country: request.country,
          streetAddress: request.streetAddress,
          city: request.city,
          postcode: request.postcode,
          phoneNumber: request.phoneNumber,
          orderNotes: request.orderNotes ? request.orderNotes : '',
          terms: request.terms,
          paymentOption: request.paymentOption,
          type: {
              processing: true,
              delivered: false
          },
          value: {
              totalAmount: request.value.totalAmount,
              shippingAmount: request.value.shippingAmount
          }
        });
    
    
        order.save( (err) => {
            if (err) {
                res.status(500).send( {message: err, success: false});
                return;
            }
            Cart.findOne( { user: id}, (err, cart) => {
                if (err) {
                    console.log(chalk.red(err));
                    res.status(500).send({message: err, success: false});
                    return
                }
                order.user = cart.user;
                order.orderItems = cart.attributes.cartArr;
                order.save( (err,result) => {
                    if(err) {
                        console.log(chalk.red(err));
                        res.status(500).send({message: err, success: false})
                        return;
                    }
                    console.log(chalk.green('Order of user was successful.'));
                    res.status(200).send({success: true , message: 'Order was successfully added!' });
                    notification.createNotification(cart.user, `You order was successful with confirmation # ${result.id}`,
                    'order', 'notifications-circle');
                })
            });
        });
    } catch (error) {
        console.log(error);
    }
}

exports.getOrderByUserId = (req, res) => {
    try {
        const id = req.params.id;
        Order.find({user: id })
        .then(data => {
            if (!data)
                res.status(404).send( { message: `Can't find cart`, success: false});
            else {
                res.status(202).send(data);
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

exports.getItemById = (req, res) => {
    try {
        const orderId = req.params.id;
        Order.findOne({orderId: orderId })
        .then(data => {
            if (!data)
                res.status(404).send( { message: `Can't find order with id ${id}`, success: false});
            else {
                res.status(202).send(data);
            }
        })
        .catch( err => {
            res.status(500)
            .send( {message: err.message || `Error retrieving cart with id=${id}`,
        success: false });
        });
    } catch (error) {
        console.log(error);
    }
}