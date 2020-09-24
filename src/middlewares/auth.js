// import User from "../models/User";
const { User } = require("../models/User");

let auth = (req, res, next) => {
  //인증 처리하는곳
  // bring tokens from client cookies
  let token = req.cookies.x_auth;

  // recover tokens, find users

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    // if(user) auth == okay
    req.token = token;
    req.user = user;
    // finish middleware, go to the next step
    next();
    // if(!user) auth == no
  });
};
// export default auth;
module.exports = { auth };
