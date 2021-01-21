

module.exports = carousel => {
    var schema = carousel.Schema(
        {
                name: { type: String, required: true},
                mimetype:{ type: String, required: true},
                miniDescription: { type: String, required: true},
                data: { type: Buffer, required: true},
                size: { type: Number, required: true}
        }
        ,
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Carousel = carousel.model("carousel", schema);
    return Carousel;
}