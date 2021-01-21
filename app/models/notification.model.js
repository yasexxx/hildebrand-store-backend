

module.exports = notification => {
    const AutoIncrement = require('mongoose-sequence')(notification);
    var schema = notification.Schema(
        {
            user: { type: notification.Schema.Types.ObjectId, ref: 'User'},
            activity: {type: String, required: true },
            type: {type: String, required: true },
            isRead: {type: Boolean, required: true },
            icon: {type: String, required: true },
            global: {type: Boolean, required: true}
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    schema.plugin(AutoIncrement, {inc_field: 'notificationId', id:"notificationId_counter"});

    const Notification = notification.model("notification", schema);
    return Notification;
}