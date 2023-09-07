import express from "express";
import { getAllBlogs, addBlog, updateBlog } from "../controllers/blog-controller";

const blogRouter = express.Router();
blogRouter.get("/", getAllBlogs);
blogRouter.post("/addBlog", addBlog);
blogRouter.post("/update/:id", updateBlog);

export default blogRouter;