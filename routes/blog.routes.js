import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {createBlog, getBlog} from "../controllers/blog.controller.js";


const blogRouter = Router();

blogRouter.post("/", authorize, createBlog);

blogRouter.get('/', getBlog);

export default blogRouter;
