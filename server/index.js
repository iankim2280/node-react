import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import "./middlewares/db";
const app = express();

// when you open the localhost on browser
app.get("/", (req, res) => res.send("hello world"));

app.get("/api/hello", (req, res) => {
  res.send("Hello from server.");
});

app.use(cors());

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));


app.listen(process.env.PORT || 5000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

export default app;
// why do I use authentication? only authenticated users can use the app properly.
