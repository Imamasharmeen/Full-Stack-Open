const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET all blogs - already using async/await
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// GET single blog - converted from promises to async/await
blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

// POST new blog - converted from promises to async/await
blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    // wait for blog to be saved in database
    const savedBlog = await blog.save()
    // send 201 status code for successful resource creation
    response.status(201).json(savedBlog)
  } catch (error) {
    // pass error to error handler middleware
    next(error)
  }
})

module.exports = blogsRouter