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

    const passwordHash = await bcrypt.hash('testpassword', 10)
    const user = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash
    })
    await user.save()

    const loginResponse = await api
      .post('/api/login')
      .send({
        username: 'testuser',
        password: 'testpassword'
      })

    token = loginResponse.body.token

    // 🆕 fixed: save blogs individually (ensures user attached)
    for (const blog of helper.initialBlogs) {
      const blogObject = new Blog({ ...blog, user: user._id })
      const savedBlog = await blogObject.save()
      user.blogs = user.blogs.concat(savedBlog._id)
    }

    await user.save()
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blog posts have id property, not _id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    assert.strictEqual(blogs.length > 0, true)

    blogs.forEach(blog => {
      assert.strictEqual(blog.id !== undefined, true)
      assert.strictEqual(blog._id === undefined, true)
    })
  })

  // 🧪 DELETE tests for 4.21
  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid and user is creator', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })

    test('fails with 403 if user is not the creator', async () => {
      const anotherUser = {
        username: 'otheruser',
        name: 'Other User',
        password: 'password123',
      }

      await api.post('/api/users').send(anotherUser)
      const loginRes = await api
        .post('/api/login')
        .send({ username: 'otheruser', password: 'password123' })

      const otherToken = loginRes.body.token

      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${otherToken}`)
        .expect(403)
    })

    test('fails with 401 if token is not provided', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
