// @usage   login & Register
const express = require("express");
const router = express.Router();
const Profile = require("../../Models/Profile"); //代表数据库中 profiles 这个 collection
const passport = require("passport");

// $route   GET /api/profile/add
// @desc    添加收支信息
// @access  private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newProfile = {};
    if (req.body.ieType) newProfile.ieType = req.body.ieType;
    if (req.body.ieDescribe) newProfile.ieDescribe = req.body.ieDescribe;
    if (req.body.income) newProfile.income = req.body.income;
    if (req.body.expend) newProfile.expend = req.body.expend;
    if (req.body.cash) newProfile.cash = req.body.cash;
    if (req.body.remark) newProfile.remark = req.body.remark;
    if (req.body.date) newProfile.date = req.body.date;
    new Profile(newProfile)
      .save()
      .then(profile => {
        //profile which is the saved product
        res.json(profile);
      })
      .catch(err => {
        console.log(err);
      });
  }
);

// $route   GET /api/profile
// @desc    查询所有信息
// @access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find()
      .then(profile => {
        //参数 profile 表示 find() 的搜索结果。
        if (profile) {
          res.json(profile);
        } else {
          res.status(404).json("内容为空");
        }
      })
      .catch(err => res.status(404).json("查询出错"));
  }
);

// $route   GET /api/profile/:id
// @desc    查询单条信息
// @access  private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ _id: req.params.id })
      .then(profile => {
        //参数 profile 表示 find() 的搜索结果。
        if (profile) {
          res.json(profile);
        } else {
          res.status(404).json("内容为空");
        }
      })
      .catch(err => res.status(404).json("查询出错"));
  }
);

// $route   GET /api/profile/update
// @desc    修改收支信息
// @access  private
router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newProfile = {};
    if (req.body.ieType) newProfile.ieType = req.body.ieType;
    if (req.body.ieDescribe) newProfile.ieDescribe = req.body.ieDescribe;
    if (req.body.income) newProfile.income = req.body.income;
    if (req.body.expend) newProfile.expend = req.body.expend;
    if (req.body.cash) newProfile.cash = req.body.cash;
    if (req.body.remark) newProfile.remark = req.body.remark;
    if (req.body.date) newProfile.date = req.body.date;

    //{new：true} 要求返回修改后的新数据
    Profile.findOneAndUpdate({ _id: req.params.id }, newProfile, { new: true })
      .then(profile => {
        res.json(profile);
      })
      .catch(err => res.status(400).json({ msg: "编辑用户信息出错" }));
  }
);

// $route   GET /api/profile/delete
// @desc    删除收支信息
// @access  private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    Profile.findByIdAndDelete(id)
      .then(profile => {
        res.json(profile);
      })
      .catch(err => res.status(400).json({ msg: "删除用户信息出错" }));
  }
);
module.exports = router;
