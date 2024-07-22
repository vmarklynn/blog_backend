const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')
const { beforeEach, describe, test, after } = require('node:test')
const { assert } = require('node:assert')
const { initialUsers, usersInDb } = require('./test_helper')

const api = supertest(app)

describe('when there are users in the database', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
  })

  test('GET requests return a valid response', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})
