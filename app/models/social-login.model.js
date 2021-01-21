

module.exports = socialLogin => {
    const AutoIncrement = require('mongoose-sequence')(socialLogin);
    var schema = socialLogin.Schema(
        {
                firstname: { type: String, required: true},
                lastname: { type: String, required: true},
                altId:{ type: String, required: true},
                email: { type: String, required: true},
                provider: { type: String, required: true},
                token: {
                    auth: {type: String},
                    id: { type: String, required: true }
                },
                photoUrl: {type: String}
        }
        ,
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    schema.plugin(AutoIncrement, {inc_field: 'socialId', id:"socialLoginId_counter"});

    const SocialLogin = socialLogin.model("socialLogin", schema);
    return SocialLogin;
}