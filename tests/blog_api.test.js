const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]


beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObj = new Blog(blogs[0])
  await blogObj.save()

  blogObj = new Blog(blogs[1])
  await blogObj.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs return the correct number of blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, blogs.length)
})

test('blogs have the field id as identifiers', async () => {
  const response = await api.get('/api/blogs')
  const firstBlog = response.body[0]
  console.log(firstBlog)
  assert.strictEqual('id' in firstBlog, true)
  assert.strictEqual(!('_id' in firstBlog), true)
})

test('POST requests should work as expected', async () => {
  const testPost =
  {
    title: "Quit School",
    author: "Primeagen",
    url: "www.primeagen.com",
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(testPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // TODO: Refactor to helpers
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, blogs.length + 1)
})

test('POST requests with empty like will default to 0 ', async () => {
  const testPost =
  {
    title: "Quit School",
    author: "Primeagen",
    url: "www.primeagen.com",
  }

  await api
    .post('/api/blogs')
    .send(testPost)
    .expect(201)

  const response = await api.get('/api/blogs')

  assert.strictEqual('likes' in response.body[blogs.length], true)
  assert.strictEqual(response.body[blogs.length].likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})

