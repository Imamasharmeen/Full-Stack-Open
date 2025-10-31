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

test('blog posts have id property, not _id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = response.body

  assert.strictEqual(blogs.length > 0, true)

  blogs.forEach(blog => {
    assert.strictEqual(blog.id !== undefined, true)
    assert.strictEqual(blog._id === undefined, true)
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Async/Await is awesome',
    author: 'Test Author',
    url: 'http://example.com/new',
    likes: 15
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // verify total number increased by 1
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  // verify content saved correctly
  const contents = response.body.map(blog => blog.title)
  assert(contents.includes('Async/Await is awesome'))
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Test Author',
    url: 'http://example.com/no-likes'
    // likes property is intentionally missing
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // verify that likes defaults to 0
  assert.strictEqual(response.body.likes, 0)
})

// test for missing title
test('blog without title is not added and returns 400', async () => {
  const newBlog = {
    author: 'Test Author',
    url: 'http://example.com/no-title',
    likes: 5
    // title is missing
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  // verify that blog was not added
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

// test for missing url
test('blog without url is not added and returns 400', async () => {
  const newBlog = {
    title: 'Blog without URL',
    author: 'Test Author',
    likes: 5
    // url is missing
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  // verify that blog was not added
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

// test for missing both title and url
test('blog without title and url is not added and returns 400', async () => {
  const newBlog = {
    author: 'Test Author',
    likes: 5
    // both title and url are missing
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  // verify that blog was not added
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})