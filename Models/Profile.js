const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  //收支类型    income and expenditure type
  ieType: {
    type: String,
  },
  //收支描述    income and expenditure describe
  ieDescribe: {
    type: String,
  },
  //收入
  income: {
    type: String,
    require: true,
  },
  //支出
  expend: {
    type: String,
    require: true,
  },
  //现金
  cash: {
    type: String,
    require: true,
  },
  //备注
  remark: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("profiles", ProfileSchema);
