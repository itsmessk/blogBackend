import Blog from "../models/blog.model.js";

export const createBlog = async (req, res) => {
    try{
        const blog = await Blog.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export const getBlog = async (req, res) => {
    try{
        const blogs = await Blog.find();
        if(!blogs) return res.status(404).json("No blog found");
        res.status(200).json({
            blogs: blogs,
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

