
// Import mongoose for MongoDB connection
const mongoose = require('mongoose')
// Import dotenv to read environment variables from .env
require('dotenv').config()

// Disable strict query warnings (optional)
mongoose.set('strictQuery', false)

// Get MongoDB connection string from .env file
const url = process.env.MONGODB_URI

// If MONGODB_URI is missing, show error and exit
if (!url) {
  console.error('Error: MONGODB_URI is missing from .env file')
  process.exit(1)
}

// Connect to MongoDB
mongoose.connect(url)
  .then(() => {
    console.log('✅ Connected to MongoDB')
  })
  .catch((error) => {
    console.log('❌ Error connecting to MongoDB:', error.message)
  })

// Define schema for a person
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Create Mongoose model
const Person = mongoose.model('Person', personSchema)

// Check the number of arguments
if (process.argv.length === 2) {
  // ✅ If no name/number given → show all entries
  Person.find({}).then((result) => {
    console.log('📒 Phonebook:')
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 4) {
  // ✅ If name & number given → add new person
  const name = process.argv[2]
  const number = process.argv[3]

  const person = new Person({ name, number })

  person.save().then(() => {
    console.log(`✅ Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  // ⚠️ Incorrect usage message
  console.log('Usage:')
  console.log('  node mongo.js          → show all entries')
  console.log('  node mongo.js <name> <number>  → add a new person')
  mongoose.connection.close()
}
