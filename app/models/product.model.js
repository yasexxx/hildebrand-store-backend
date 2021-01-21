

module.exports = product => {
    const AutoIncrement = require('mongoose-sequence')(product);
    var schema = product.Schema(
        {
            productId: { type: Number },
            productName: {type:String, required:true },
            description: { type: String, required: true },
            category: { type: String, required: true },
            price: { type: Number, required: true },
            availableProduct:{ type: Number, required: true },
            isPublished: { type: Boolean, required: true },
            imageFile: {
                fileName: { type: String, required: true },
                mimetype: String,
                size: { type: Number, required: true },
                data:  { type: Buffer, required: true },
            },
            post: {
                topProduct: { type: Boolean, required: true},
                featuredProduct: { type: Boolean, required: true},
                latestProduct: { type: Boolean, required: true},
                restaurantProduct: { type: Boolean, required: true},
                supermarketProduct: { type: Boolean, required: true},
                other: { type: Boolean, required: true},
              },
            options: {
                restaurantFood: { type: Boolean, required: true},
                restaurantDrink: { type: Boolean, required: true},
                restaurantDessert: { type: Boolean, required: true},
                supermarketGrocery: { type: Boolean, required: true},
                supermarketVegetable: { type: Boolean, required: true},
                supermarketCannedGoods: { type: Boolean, required: true},
            }
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    schema.plugin(AutoIncrement, {inc_field: 'productId', id:"productId_counter"});

    const Product = product.model("products", schema);
    return Product;
}