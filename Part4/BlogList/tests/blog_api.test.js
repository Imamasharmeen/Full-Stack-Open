const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json and correct amount', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

// 🆕 নতুন test
test('blog posts have id property, not _id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = response.body

  // check that at least one blog exists
  assert.strictEqual(blogs.length > 0, true)

  // check each blog has 'id' and not '_id'
  blogs.forEach(blog => {
    assert.strictEqual(blog.id !== undefined, true) // id আছে কিনা
    assert.strictEqual(blog._id === undefined, true) // _id নেই কিনা
  })
})

after(async () => {
  await mongoose.connection.close()
})