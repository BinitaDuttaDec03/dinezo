import dotenv from "dotenv"
import express from "express"

import connectDB from "./config/db.config.js"

dotenv.config()
const app = express()

app.use(express.json())

const port = process.env.PORT || 5100

app.listen(port, () => {
    console.log(`Auth service is running on port ${port}`)
    connectDB()
})