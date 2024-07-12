const { MONGODB_URI, PORT } = require('./utils/config')
const { info, error } = require('./utils/logger')
const express = require('express')
const blogsRouter = require('./controllers/blogs')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


mongoose.connect(MONGODB_URI).then(result => {
  info('Connected to MongoDB')
}).catch(error => {
  error('Connection error: ', error.message)
})

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.listen(PORT || 3001, () => {
  info(`Server running on port ${PORT}`)
})
