

module.exports = order => {
    const AutoIncrement = require('mongoose-sequence')(order);
    var TheSchema = order.Schema;
    var schema = order.Schema(
        {
            user: {type: TheSchema.Types.ObjectId, ref: 'User' },
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            companyName: { type:String },
            email: { type:String, required: true },
            country: { type: String, required: true },
            streetAddress: { type: String, required: true },
            city: { type: String, required: true },
            postcode: { type: String, required: true },
            phoneNumber: { type: String },
            orderNotes: { type:String },
            terms: { type: Boolean, required: true },
            orderItems: [
                {
                    name: { type: String, required: true},
                    price: { type: Number, required: true},
                    quantity: { type: Number, required: true}
                }
            ],
            paymentOption: {type:String, required: true },
            type: {
                processing: { type: Boolean, required: true},
                delivered: { type: Boolean, required: true}
            },
            value: {
                totalAmount: { type: Number, required: true },
                shippingAmount: { type: Number, required: true }
            }
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    schema.plugin(AutoIncrement, {inc_field: 'orderId', id:"orderId_counter"});


    const Order = order.model("order", schema);
    return Order;
}