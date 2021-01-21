module.exports = cart => {
    const AutoIncrement = require('mongoose-sequence')(cart);
    var schema = cart.Schema(
        {
            user: { type: cart.Schema.Types.ObjectId, ref: 'User'},
            attributes: {
                cartId: { type: Number},
                cartArr: [{
                    name: {type: String, required: true},
                    price: {type: Number, required: true},
                    quantity: {type: Number, required: true},
                    img: {type: Object, required: true},
                    conId: {type: String, required: true}
                }]
            }
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    // schema.methods.addToCart = () => {
    //     const i = 0;
    //     console.log(i+'hello');
        
    // }

    schema.plugin(AutoIncrement, {inc_field: 'cartId', id:"cartId_counter"});

    const Cart = cart.model("cart", schema);
    return Cart;
}