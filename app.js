import express from 'express';
import {NODE_ENV, PORT, SERVER_URL} from './config/env.js';

import authRouter from './routes/auth.routes.js';
import blogRouter from "./routes/blog.routes.js";

import connectToDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);

app.use('/', (req, res) => {
    res.send(`Infoziant Blog Server!! ${req.method || "GET"}`);
});

app.use(errorMiddleware);




app.listen(PORT, async () => {
    try{
        console.log(`Server started on ${SERVER_URL} in ${NODE_ENV}`);
        connectToDB();
    } catch(e){
        console.log(e);
    }
});