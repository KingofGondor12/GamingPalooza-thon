const mongoose = require('./init')
const Store = mongoose.model('Store', {
  name: String,
  address: String
})

module.exports = Store
