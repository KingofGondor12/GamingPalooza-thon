const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/GamingPalooza-thon', { useMongoClient: true })
  .then(() => {
    console.log('Successful connection to the database')
  })
  .catch(error => {
    // Something went wrong
    console.log('Error connecting to MongoDB database', error)
  })

module.exports = mongoose
