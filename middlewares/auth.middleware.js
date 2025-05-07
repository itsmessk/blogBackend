import jwt from 'jsonwebtoken';
import User from "../models/user.models.js";
import {JWT_SECRET} from "../config/env.js";


const authorize = async (req, res, next) => {
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token) {
            return res.status(401).send("No token provided/ User not authorized");
        }

        const decoded = jwt.verify(token, JWT_SECRET);


        const user = await User.findById(decoded.userId);

        if(!user) {
            return res.status(401).send("User not found" );
        }

        req.user = user;
        next();


    } catch(err) {

        return res.status(401).json({
            success: false,
            error: err.message,
            message: "User not found/ User not authorized"

        })
    }
}

export default authorize;