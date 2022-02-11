const express = require('express')
const app = express()
const port = 3000
const { createClient } = require('redis');
const uuid = require('uuid')

const client = createClient()
client.on('error', (err) => console.log('Redis Client Error', err))
client.connect()

app.get('/', (req, res) => {
  res.send('Nodejs - CI/CD - K8S')
})

app.get('/ready', (req, res) => {
  res.send('Ready')
})

app.get('/call-redis', async (req, res) => {
  const key = uuid.v4()

  await client.set(key, `dcmm ${key}`)

  const value = await client.get(key)

  res.send(value)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})