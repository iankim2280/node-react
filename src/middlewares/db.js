import mongoose from "mongoose";
import dotenv from "dotenv";
import key from "../config/key";

dotenv.config();

mongoose
  .connect(key.mongoURI(process.env.NODE_ENV), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
