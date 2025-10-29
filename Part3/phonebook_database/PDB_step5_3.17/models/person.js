// Import mongoose library for MongoDB interaction
const mongoose = require('mongoose')

// Get MongoDB URI from environment variables (.env file)
const url = process.env.MONGODB_URI

// Disable strict query warnings (for compatibility)
mongoose.set('strictQuery', false)

// Log connection attempt
console.log('connecting to', url)

// Connect to MongoDB
mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB') // ✅ Successful connection
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message) // ❌ Connection failed
  })

// Define schema for Person collection
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be at least 3 characters long.'], // Name must be >= 3 chars
    unique: true, // Prevent duplicate names
    required: [true, 'Name is required'], // Must have a name
  },
  number: {
    type: String,
    minLength: [8, 'Phone number must be at least 8 characters long.'], // Number must be >= 8 chars
    unique: true, // Prevent duplicate phone numbers
    required: [true, 'Number is required'], // Must have a number
    validate: {
      // Custom validation: phone number format
      validator: (v) => {
        return /^\d{2,3}-\d+$/.test(v) // e.g., 09-1234567 or 040-123456
      },
      message: (props) => `${props.value} is not a valid phone number!`, // Error message if invalid
    },
  },
})

// Modify the toJSON output to clean up MongoDB internal fields
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // Convert _id to string for frontend
    delete returnedObject._id // Remove internal _id field
    delete returnedObject.__v // Remove version key
  },
})

// Export the model for use in other files
module.exports = mongoose.model('Person', personSchema)
