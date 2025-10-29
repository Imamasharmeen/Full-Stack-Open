/* eslint-disable @stylistic/js/indent */
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

// Custom Morgan token to log POST request body
morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return null
})

// Serve static frontend files from 'dist' folder
app.use(express.static('dist'))

// Middleware for parsing JSON requests
app.use(express.json())

// Morgan middleware for logging HTTP requests
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens['body'](req, res),
    ].join(' ')
  })
)

// Route to show phonebook info and total people count
app.get('/info', (request, response) => {
  Person.estimatedDocumentCount()
    .then((count) => {
      response.send(
        `<div>
          <p>Phonebook has info for ${count} ${count === 1 ? 'person' : 'people'}</p>
          <p>${new Date()}</p>
        </div>`
      )
    })
    .catch((error) => {
      console.error(error)
      response.status(500).send({ error: 'Something went wrong' })
    })
})

// Get all persons from the database
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

// Get a single person by ID
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.sendStatus(404) // Person not found
      }
    })
    .catch((error) => next(error))
})

// Delete a person by ID
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((deletedPerson) => {
      if (deletedPerson) {
        response.sendStatus(204) // Successfully deleted
      } else {
        response.sendStatus(404) // Person not found
      }
    })
    .catch((error) => next(error))
})

// Add a new person to the phonebook
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // Optionally check if name or number is missing
  // if (!body.name || !body.number) {
  //   return response.status(400).json({ error: "name or number missing" });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

// Update an existing person's information
app.put('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, request.body, {
    new: true, // Return the updated document
    runValidators: true, // Run schema validations
  })
    .then((updatedObject) => {
      if (updatedObject) {
        response.json(updatedObject)
      } else {
        response.sendStatus(404) // Person not found
      }
    })
    .catch((error) => next(error))
})

// Middleware for handling unknown endpoints
const unkownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unkownEndpoint)

// Error handler middleware for catching exceptions
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

// Start the server
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
