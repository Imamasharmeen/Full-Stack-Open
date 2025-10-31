const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

// 🆕 new line added — Transform _id to id and remove __v
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // new line added
    delete returnedObject._id // new line added
    delete returnedObject.__v // new line added
  },
})

module.exports = mongoose.model('Blog', blogSchema)
