const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  // find user by username
  const user = await User.findOne({ username })

  // check if password is correct
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  // if user not found or password incorrect, return error
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  // create token payload with user info
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // sign token with secret
  const token = jwt.sign(userForToken, process.env.SECRET)

  // send token and user info in response
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter