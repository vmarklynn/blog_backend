const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb } = require('./test_helper')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObj = new Blog(initialBlogs[0])
  await blogObj.save()

  blogObj = new Blog(initialBlogs[1])
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
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blogs have the field id as identifiers', async () => {
  const response = await api.get('/api/blogs')
  const firstBlog = response.body[0]

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

  const response = await blogsInDb()
  assert.strictEqual(response.length, initialBlogs.length + 1)
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

  const response = await blogsInDb()

  assert.strictEqual('likes' in response[initialBlogs.length - 1], true)

  console.log(response[initialBlogs.length])
  assert.strictEqual(response[initialBlogs.length].likes, 0)
})

test('POST requests with invalid requests should return 400', async () => {

  const testInvalidPost =
  {
    url: "www.primeagen.com",
  }

  await api
    .post('/api/blogs')
    .send(testInvalidPost)
    .expect(400)
})

test('DELETE request with a valid id should return a 204', async () => {
  const idToDelete = initialBlogs[0]._id

  await api
    .delete(`/api/blogs/${idToDelete}`)
    .expect(204)
})

after(async () => {
  await mongoose.connection.close()
})

