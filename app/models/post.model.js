

module.exports = (post) => {
    const AutoIncrement = require('mongoose-sequence')(post);
    var TheSchema = post.Schema;
    var schema = post.Schema(
        {
            user: { type: TheSchema.Types.ObjectId, ref: 'User' },
            title: { type: String, required: true },
            tags: { type: String, required: true },
            published: {type: String, required: true },
            message: { type: String, required: true },
            author: { type: String, required: true }
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    schema.plugin(AutoIncrement, {inc_field: 'postId', id:"postId_counter"});
    
    const Post = post.model("post", schema);
    return Post;
}