const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  let token = null

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    // Create a test user
    const passwordHash = await bcrypt.hash('testpassword', 10)
    const user = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash,
    })
    await user.save()

    // Login to get token
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'testpassword' })

    token = loginResponse.body.token

    // Save initial blogs with correct user reference
    for (const blog of helper.initialBlogs) {
      const blogObject = new Blog({ ...blog, user: user._id })
      const savedBlog = await blogObject.save()
      user.blogs = user.blogs.concat(savedBlog._id)
    }
    await user.save()
  })

  // ✅ Existing tests (GET, ID, etc.) remain unchanged ...

  // 🆕 POST blog tests (fixed for token authentication)
  describe('addition of a new blog', () => {
    test('succeeds with valid data and valid token', async () => {
      const newBlog = {
        title: 'Authenticated Blog Post',
        author: 'Test Author',
        url: 'http://example.com/new',
        likes: 15,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`) // 🆕 token added here
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map((b) => b.title)
      assert(titles.includes('Authenticated Blog Post'))
    })

    test('defaults likes to 0 if not provided', async () => {
      const newBlog = {
        title: 'Blog without likes',
        author: 'Test Author',
        url: 'http://example.com/no-likes',
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, 0)
    })

    test('fails with status code 400 if title is missing', async () => {
      const newBlog = {
        author: 'Test Author',
        url: 'http://example.com/no-title',
        likes: 5,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails with status code 400 if url is missing', async () => {
      const newBlog = {
        title: 'Missing URL Blog',
        author: 'Test Author',
        likes: 5,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    // 🆕 NEW TEST: token missing should return 401 Unauthorized
    test('fails with status code 401 if token is not provided', async () => {
      const newBlog = {
        title: 'Unauthorized Blog',
        author: 'Hacker',
        url: 'http://example.com/hack',
        likes: 10,
      }

      await api
        .post('/api/blogs') // 🆕 no token sent
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  // ✅ delete and update tests remain same
})

after(async () => {
  await mongoose.connection.close()
})
