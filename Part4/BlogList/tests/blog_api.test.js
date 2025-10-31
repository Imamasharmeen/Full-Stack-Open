const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app') // new line added — import Express app
const Blog = require('../models/blog') // new line added — import Blog model

const api = supertest(app) // new line added — wrap app with SuperTest

// 🆕 new line added — sample initial blogs
const initialBlogs = [
  {
    title: 'First Blog',
    author: 'John Doe',
    url: 'http://example.com/1',
    likes: 5
  },
  {
    title: 'Second Blog',
    author: 'Jane Smith',
    url: 'http://example.com/2',
    likes: 3
  }
]

// 🆕 new line added — reset DB before each test
beforeEach(async () => {
  await Blog.deleteMany({})

  // insert initial blogs
  await Blog.insertMany(initialBlogs)
})

// 🆕 new line added — test GET /api/blogs
test('blogs are returned as json and correct amount', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length) // check correct count
})

after(async () => {
  await mongoose.connection.close() // 🆕 new line added — close DB connection
})
