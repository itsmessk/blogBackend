import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    topic: {
        type: String,
        required: [true, "Topic is required"],
    },
    date: {
        type: Date,
        required: [true, "Date is required"],

    },
    author: {
        type: String,
        required: [true, "Author is required"],
    },
    postLink: {
        type: String,
        required: [true, "PostLink is required"],
    },
    imageUrl: {
        type: String,
        required: [true, "Image is required"],
    }
}, {timestamps: true });

const Blog  = mongoose.model("Blog", blogSchema);

export default Blog;