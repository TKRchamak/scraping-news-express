import dotenv from 'dotenv'
// dotenv.config({ path: __dirname + '/.env' })
dotenv.config()

const config = {
  PORT: process.env.PORT as string,

  DB_NAME: process.env.DB_NAME as string,
  DB_USERNAME: process.env.DB_USERNAME as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
  DB_HOST: process.env.DB_HOST as string,
  DB_PORT: process.env.DB_PORT as string,

  MONGO_URI: process.env.MONGO_URI as string,

  JWT_SECRET: process.env.JWT_SECRET as string,
  REDIS_URL: process.env.REDIS_URL as string,
  MAIL_USER: process.env.MAIL_USER as string,
  MAIL_PASS: process.env.MAIL_PASS as string,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
}

export default config
