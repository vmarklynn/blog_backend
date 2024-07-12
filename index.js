require('dotenv').config()

const Blog = require('./models/blog')
const express = require('express')
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

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = process.env.PORT
app.listen(PORT || 3001, () => {
  console.log(`Server running on port ${PORT}`)
})
