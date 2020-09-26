import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { User } from "./models/User";
// const { auth } = require("./middlewares/auth");
import { auth } from "./middlewares/auth";
import "./middlewares/db";
dotenv.config();
const app = express();
const { PORT } = process.env;
// when you open the localhost on browser
app.get("/", (req, res) => res.send("hello world"));

app.get("/api/hello", (req, res) => {
  res.send("Hello from server.");
});

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/api/users/register", (req, res) => {
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

app.post("/api/users/login", (req, res) => {
  // 1. Find a user using this email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "There's no user using this email. ",
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

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email,
    isAdmin: req.user.role === "USER" ? false : true,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  // console.log('req.user', req.user)
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

export default app;
// why do I use authentication? only authenticated users can use the app properly.
