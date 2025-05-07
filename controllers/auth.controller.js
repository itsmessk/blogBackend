import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js"
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

export const register = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser){
            const err = new Error("User already exists");
            err.status = 400;
            throw err;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create([{name, email, password: hashedPassword}], {session});
        const token = await jwt.sign( { userId: user[0]._id }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        await session.endSession();

        res.status(201).json({
            success: true,
            message: `User Registered successfully.`,
            data: {
                user: user,
                token: token,
            }
        });
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        await session.endSession();
        next(error);
    }
}

export const login = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            const err = new Error("User doesn't exists");
            err.status = 400;
            throw err;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            const err = new Error("Invalid Password");
            err.status = 401;
            throw err;
        }

        const token = await jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(201).json({
            success: true,
            message: `User Login successfully.`,
            data: {
                user: user,
                token: token
            }
        });
    } catch (err){
        console.log(err);
        next(err);
    }
}



