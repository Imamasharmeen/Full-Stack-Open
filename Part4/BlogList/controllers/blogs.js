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

// DELETE a blog - new functionality
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    // return 204 No Content on successful deletion
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

// PUT update a blog - new functionality
blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    // findByIdAndUpdate returns the old document by default
    // { new: true } option returns the updated document
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id, 
      blog, 
      { new: true, runValidators: true, context: 'query' }
    )

    if (updatedBlog) {
      response.json(updatedBlog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter