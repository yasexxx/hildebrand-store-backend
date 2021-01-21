const mongoose = require("mongoose");

const Token = mongoose.model(
  "Token",
  new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    token: { type: String, required: true },
    creationTime: { type: Date, required: true }
  })
);

Token.schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = Token;
