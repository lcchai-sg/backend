import Blog from "../models/Blog";

export const getAllBlogs = async(req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error querying for blogs! "});
    }
    if (!blogs || blogs.length === 0) {
        return res.status(404).json({ message: "No Blogs Found!" });
    }
    return res.status(200).json({ blogs });
}

export const addBlog = async(req, res, next) => {
    const { title, description, image, user } = req.body;
    let blog = new Blog({ title, description, image, user });
    try {
        const lastBlog = await Blog.find({},{_id:0,blogID:1}).sort({blogID:-1}).limit(1);
        let id = 1;
        console.log(lastBlog);
        if (lastBlog && lastBlog.length > 0 && lastBlog[0].blogID) id = lastBlog[0].blogID + 1;
        blog.blogID = id;
        await blog.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error querying for blogs! "});
    }
    return res.status(200).json({ blog });
}

export const updateBlog = async(req, res, next) => {
    const blogID = req.params.id;
    const { title, description, image } = req.body;
    let blog;
    try {
        blog = await Blog.findOne({ blogID });
        if (!blog || blog.length === 0) {
            return res.status(404).json({ message: "Blog Not Found! "});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error querying for blogs! "});        
    }
    try {
        blog.title = title;
        blog.description = description;
        blog.image = image;
        await blog.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error updating blog! "});        
    }
    return res.status(200).json({ blog });
}