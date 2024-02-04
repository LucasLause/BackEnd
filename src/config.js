import dotenv from 'dotenv'

dotenv.config()

export default {
    puerto: process.env.PUERTO,
    mongo_uri: process.env.MONGO_URI,
    jwt_key: process.env.JWT_KEY,
    gmail_user: process.env.GMAIL_USER,
    gmail_pass: process.env.GMAIL_PASS
}

