import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected")).catch((err) => console.error("MongoDB Connection Error", err))

app.get('/', (req, res) => {
    res.send("Server is running")
})

app.get('/health', (req, res) => {
    res.json({
        "status" : "ok"
    })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
})