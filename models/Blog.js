const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const BlogSchema = new Schema({
  id: ObjectId,
  title: String,
  body: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog