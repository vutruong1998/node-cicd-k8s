const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Nodejs - CI/CD - K8S')
})

app.get('/ready', (req, res) => {
  res.send('Ready')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})