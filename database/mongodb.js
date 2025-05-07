import mongoose from 'mongoose';

import { NODE_ENV, DB_URI } from '../config/env.js';



if(!DB_URI) {
    console.error(`MongoDB URI is missing inside .env.${NODE_ENV}.local file`);
}

const connectToDB = async () => {
    try{
        await mongoose.connect(DB_URI);
        console.log('MongoDB Connected!');
    } catch(err){
        console.error(err);
        process.exit(1);
    }


}

export default connectToDB;