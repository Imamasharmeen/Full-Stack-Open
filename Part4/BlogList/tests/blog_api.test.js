const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
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

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
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

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      assert(titles.includes('Async/Await is awesome'))
    })

    test('if likes property is missing, it defaults to 0', async () => {
      const newBlog = {
        title: 'Blog without likes',
        author: 'Test Author',
        url: 'http://example.com/no-likes'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, 0)
    })

    test('fails with status code 400 if title is missing', async () => {
      const newBlog = {
        author: 'Test Author',
        url: 'http://example.com/no-title',
        likes: 5
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails with status code 400 if url is missing', async () => {
      const newBlog = {
        title: 'Blog without URL',
        author: 'Test Author',
        likes: 5
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      assert(!titles.includes(blogToDelete.title))
    })

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with valid data and id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedData = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)

      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
      assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      const updatedData = {
        title: 'Updated Title',
        author: 'Updated Author',
        url: 'http://example.com/updated',
        likes: 100
      }

      await api
        .put(`/api/blogs/${validNonexistingId}`)
        .send(updatedData)
        .expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      const updatedData = {
        title: 'Updated Title',
        author: 'Updated Author',
        url: 'http://example.com/updated',
        likes: 100
      }

      await api
        .put(`/api/blogs/${invalidId}`)
        .send(updatedData)
        .expect(400)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})