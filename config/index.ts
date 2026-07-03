import dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: {
    name: process.env.DB_NAME,
    host: process.env.HOST,
    port: process.env.DB_PORT!,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
  },
  jwt : {
    secret : process.env.JWT_SECRET
  }
};
