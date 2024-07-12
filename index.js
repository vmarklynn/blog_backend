require('dotenv').config()

const express = require('express')
const blogsRouter = require('./controllers/blogs')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl).then(result => {
  console.log('Connected to MongoDB')
}).catch(error => {
  console.log('Connection error: ', error.message)
})

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

const PORT = process.env.PORT
app.listen(PORT || 3001, () => {
  console.log(`Server running on port ${PORT}`)
})
