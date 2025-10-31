const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // title is required
  },
  author: String,
  url: {
    type: String,
    required: true // url is required
  },
  likes: {
    type: Number,
    default: 0 // set default value to 0 if likes is missing
  }
})

// transform _id to id when converting to JSON
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// export the model
module.exports = mongoose.model('Blog', blogSchema)