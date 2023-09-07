//mongodb+srv://root:<password>@cluster0.jrvjy.mongodb.net/?retryWrites=true&w=majority
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";

const app = express();

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
mongoose
  .connect(
    "mongodb+srv://root:sysadmin@cluster0.jrvjy.mongodb.net/blogApp?retryWrites=true&w=majority"
  )
  .then(app.listen(5000))
  .then(() => console.log("Connected to Mongo DB\nListening on port 5000"))
  .catch((error) => console.log(error));
