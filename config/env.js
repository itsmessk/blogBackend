import { config } from 'dotenv';

config({path: `.env.${process.env.NODE_ENV||'development'}.local`});


export const {SERVER_URL  ,DB_URI, NODE_ENV , PORT, JWT_EXPIRES_IN , JWT_SECRET  } = process.env;