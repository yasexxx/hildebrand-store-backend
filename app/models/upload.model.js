

module.exports = file => {
    const AutoIncrement = require('mongoose-sequence')(file);
    var schema = file.Schema(
        {
            filename: { type: String, required: true },
            mimetype: { type: String, required: true },
            size: { type: Number, required: true },
            data:  { type: Buffer, required: true },
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    schema.plugin(AutoIncrement, {inc_field: 'uploadId', id:"uploadId_counter"});

    const File = file.model("file", schema);
    return File;
}