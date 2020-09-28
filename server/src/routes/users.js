import express from "express";
const router = express.Router();
import { User } from "../models/User";
import { auth } from "../middlewares/auth";

//=================================
//             User
//=================================

router.post("/register", (req, res) => {
  // 회원 가입 할 떄 필요한 정보들을 client를 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);

  // error handler
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  // 1. Find a user using this email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found.",
      });
    }
    // 2. 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "Wrong password.",
        });
      // 3. if passwords are correct, generate token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email,
    isAdmin: req.user.role === "USER" ? false : true,
  });
});

router.get("/logout", auth, (req, res) => {
  // console.log('req.user', req.user)
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

module.exports = router;
