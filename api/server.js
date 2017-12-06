// Bring in env variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const { initialize } = require('./middleware/auth')
const app = express()

// Plugins
app.use(bodyParser.json())
app.use(initialize)

// Routes
app.use([
  require('./routes/products'),
  require('./routes/auth'),
  require('./routes/stores')
])

// JSON error handling
app.use((error, req, res, next) => {
  res.send({ error: error.message })
})

// No other routes, must be a 404 ;(
app.use((req, res, next) => {
  res.status(404).send({
    error: `No route found for ${req.method}, ${req.url}`
  })
})

app.listen(3042, (error) => {
  if (error) {
    console.log('There was a problem starting the server', error)
  } else {
    console.log('Server is listening on http://localhost:3042')
  }
});
