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
  email: {},
});
