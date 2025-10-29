const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET all blogs
blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => response.json(blogs))
})

// GET single blog
blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) response.json(blog)
      else response.status(404).end()
    })
    .catch(error => next(error))
})

// POST new blog
blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  blog.save()
    .then(savedBlog => response.status(201).json(savedBlog))
    .catch(error => next(error))
})

module.exports = blogsRouter
