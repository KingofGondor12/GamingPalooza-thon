// Bring in env variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Plugins
app.use(bodyParser.json())

// Routes
app.listen(117, (error) => {
  if (error) {
    console.log('There was a problem starting the server', error)
  } else {
    console.log('Server is listening on http://localhost:117')
  }
});
