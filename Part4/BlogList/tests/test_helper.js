const Blog = require('../models/blog')
const User = require('../models/user')

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

// helper function to get all blogs from database
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

// helper function to get a non-existing blog id
const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'willremovethissoon',
    url: 'http://example.com/temp'
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

// helper function to get all users from database
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
  usersInDb
}