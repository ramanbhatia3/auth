import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected")).catch((err) => console.error("MongoDB Connection Error", err))

app.get('/', (req, res) => {
    res.send("Server is running")
})

app.get('/health', (req, res) => {
    res.json({
        "status" : "ok"
    })
})

app.use('/api/auth', authRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
})