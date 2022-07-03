// @usage   login & Register
const express = require("express");
const router = express.Router();

// $route   GET /api/user/test
// @desc    返回请求的 JSON 数据
// @access  public
router.get("/test", (req, res) => {
  res.json({ msg: "this is /test page" });
});

module.exports = router;

//外部文件在调这个 router 为中间件时,等价于一个路由组.
//调用语句为 app.use("/api/user", users);
//不管之后 router 再添加几个api ,访问地址都是localhost:3000/api/user/XXXX....
