const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// GET all users
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

  response.json(users)
})

// POST create new user
usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    // validate username is provided
    if (!username) {
      return response.status(400).json({
        error: 'username is required'
      })
    }

    // validate username length
    if (username.length < 3) {
      return response.status(400).json({
        error: 'username must be at least 3 characters long'
      })
    }

    // validate password is provided
    if (!password) {
      return response.status(400).json({
        error: 'password is required'
      })
    }

    // validate password length
    if (password.length < 3) {
      return response.status(400).json({
        error: 'password must be at least 3 characters long'
      })
    }

    // generate password hash with salt rounds 10
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // create new user object
    const user = new User({
      username,
      name,
      passwordHash
    })

    // save user to database
    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter