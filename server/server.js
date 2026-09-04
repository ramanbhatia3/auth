import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send("Server is running")
})

app.get('/health', (req, res) => {
    res.json({
        "status" : "ok"
    })
})

const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
})