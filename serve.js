const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const passport = require("passport");

//DB config & connect
const mongoose = require("mongoose");
const db = require("./config/keys").uri;
mongoose
  .connect(db)
  .then(() => {
    console.log("连接MongoDB成功");
  })
  .catch(err => {
    console.log("连接 MongoDB 出错,错误原因为:");
    console.log(err);
  });

//添加中间件
//添加 JSON 解析中间件处理表单。
//当请求的数据类型是application/x-www-form-urlencoded时才会进入这个中间件进行处理。
app.use(express.urlencoded({ extended: false }));

//解析并返回 json 格式的数据
//只有是正确的content-type默认是application/json才进入这个中间件解析处理。
app.use(express.json());

//使用passport
app.use(passport.initialize());
require("./config/passport")(passport); //passport 传入到引入的 JS 文件里

app.use("/api/user", users); //"/api/user" 是一个路由组
app.use("/api/profile", profiles);

app.listen(port, () => {
  console.log("serve is run");
});
