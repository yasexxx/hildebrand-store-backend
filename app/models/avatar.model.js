const mongoose = require("mongoose");

const Avatar = mongoose.model(
  "Avatar",
  new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    data: { type: Buffer} ,
    mimetype: { type: String },
    url: {type: String}
    })
);

module.exports = Avatar;