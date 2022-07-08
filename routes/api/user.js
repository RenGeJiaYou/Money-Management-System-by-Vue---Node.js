// @usage   login & Register
const express = require("express");
const router = express.Router();
const User = require("../../Models/User");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys").secretOrPrivateKey;

// $route   GET /api/user/test
// @desc    返回请求的 JSON 数据
// @access  public
router.get("/test", (req, res) => {
  res.json({ msg: "this is /test page" });
});

// $route   GET /api/user/register
// @desc    提交注册信息
// @access  public
router.post("/register", (req, res) => {
  //先检查数据库是否已注册该邮箱
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "邮箱已被注册" });
    } else {
      //根据邮箱生成一个头像，实质是一个 url ,指向一个默认地址
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg", //照片限制级，g/pg/r/x
        d: "mm",
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar,
      });
      //加密密码:bcrypt.hash()在加密后，通过回调函数将内部的 err(错误信息) 和hash(密文) 翻出来
      bcrypt.hash(newUser.password, 10, function (err, hash) {
        if (err) throw err;

        newUser.password = hash; //const 对象能修改或添加某个属性值，但不能将该对象赋值
        newUser
          .save()
          .then(user => {
            res.json(user);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  });
});

// $route   GET /api/user/login
// @desc    登录 API
// @access  public
router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      //提示查无此用户，并转到登录页面
      return res.status(404).json({ eamil: "查无此用户" });
    } else {
      //存在此用户，检查密码
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          let rule = { id: user.id, name: user.name };
          jwt.sign(rule, key, { expiresIn: 8 * 60 * 60 }, (err, token) => {
            if (err) throw err;
            res.json({ msg: "success", jwt: token });
          });
        } else {
          return res.status(400).json({ msg: "密码错误" });
        }
      });
    }
  });
});

module.exports = router;

//外部文件在调这个 router 为中间件时,等价于一个路由组.
//调用语句为 app.use("/api/user", users);
//不管之后 router 再添加几个api ,访问地址都是localhost:3000/api/user/XXXX....
