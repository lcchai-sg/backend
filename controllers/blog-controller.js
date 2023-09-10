import mongoose from "mongoose";
import Blog from "../models/Blog";
import User from "../models/User";

export const getAllBlogs = async(req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error querying for blogs!"});
    }
    if (!blogs || blogs.length === 0) {
        return res.status(404).json({ message: "No Blogs Found!" });
    }
    return res.status(200).json({ blogs });
}

export const addBlog = async(req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error querying for user!"});
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User Not Found!" });
    }
    let blog = new Blog({ title, description, image, user });
    try {
        const lastBlog = await Blog.find({},{_id:0,blogID:1}).sort({blogID:-1}).limit(1);
        let id = 1;
        if (lastBlog && lastBlog.length > 0 && lastBlog[0].blogID) id = lastBlog[0].blogID + 1;
        blog.blogID = id;
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error querying for blogs!"});
    }
    return res.status(200).json({ blog });
}

export const updateBlog = async(req, res, next) => {
    const blogID = req.params.id;
    const { title, description, image } = req.body;
    let blog;
    try {
        blog = await Blog.findOne({ blogID });
        if (!blog) {
            return res.status(404).json({ message: "Blog Not Found!"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error querying for blogs!"});        
    }
    try {
        blog.title = title;
        blog.description = description;
        blog.image = image;
        await blog.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error updating blog!"});        
    }
    return res.status(200).json({ blog });
}

export const getByID = async(req, res, next) => {
    const blogID = req.params.id;
    let blog;
    try {
        blog = await Blog.findOne({ blogID });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error querying for blog!"});        
    }
    if (!blog) {
        return res.status(404).json({ message: "Blog Not Found!"});
    }
    let user;
    try {
        user = await User.findById({_id: blog[0].user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error querying for blog!"});        
    }
    res.status(200).json({ blog, name: user.name });
}

export const deleteBlog = async (req, res, next) => {
    const blogID = req.params.id;
    let blog;
    try {
        blog = await Blog.findOne({ blogID });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error deleteing blog!"});        
    }
    if (!blog) {
        return res.status(404).json({ message: "Blog Not Found!"});
    }
    let userId = blog.user;
    let bid = blog._id;
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await Blog.deleteOne({ blogID }, { session });
        let user = await User.findById({ _id: userId });
        if (user && user.blogs) {
            let newBlogs = [];
            user.blogs.forEach(e => {
                if (e.toString() !== bid.toString()) newBlogs.push(e);
            })
            user.blogs = newBlogs;
            await user.save({ session });
            session.commitTransaction();
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error deleteing blog!"});        
    }
    return res.status(200).json({ message: "Blog Deleted."});
}