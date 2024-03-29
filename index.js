const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const { createClient } = require('redis')
const uuid = require('uuid')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Blog = require('./models/Blog.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const client = createClient({ url: process.env.REDIS_URI })
console.log(process.env.REDIS_URI)
client.on('error', (err) => console.log('Redis Client Error', err))
client.connect()

// mongoose.connect(
//   process.env.MONGO_URI,
//   { useUnifiedTopology: true, useNewUrlParser: true }
// )
// const connection = mongoose.connection

// connection.once("open", function() {
//   console.log("MongoDB database connection established successfully");
// })


app.get('/', (req, res) => {
  res.send('Nodejs - CI/CD - GKE')
})

app.get('/ready', (req, res) => {
  res.send('Ready to run...')
})

app.get('/call-redis', async (req, res) => {
  const key = uuid.v4()

  await client.set(key, `dcmm ${key}`)

  const value = await client.get(key)

  res.send(value)
})

// create blog
app.post('/blogs', async (req, res) => {
  const blog = await Blog.create(req.body);
  res.send(blog)
})

app.listen(port, () => {
  console.log(process.env)
  console.log(`Example app listening on port ${port}`)
})