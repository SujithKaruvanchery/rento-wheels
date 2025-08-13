const express = require('express')
const cors = require('cors');
const connectDB = require('./config/db')
const apiRouter = require('./routes')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const app = express()

connectDB()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true, methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));
app.use(cookieParser())

app.use("/api", apiRouter)

app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log(`server starts on port ${process.env.PORT}`)
    }
})
