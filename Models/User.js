const mongoose = require("mongoose");
const Schema = mongoose.Schema; //Schema 用于创建 Model 类.
//一个类的一个新建对象:document;
//一个类的全部对象:collection;
//全部 collection: database

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  identity: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

var Users = mongoose.model("users", userSchema);

module.exports = Users;
