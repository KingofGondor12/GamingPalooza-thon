const Product = require('./Product')
const Store = require('./Store')

Product.deleteMany()
  .then(() => {
    console.log('Database has been wiped.')
  })
  .catch((error) => {
    console.log('Unable to wipe database', error)
  })

Store.deleteMany()
  .then(() => {
    console.log('Database has been wiped.')
  })
  .catch((error) => {
    console.log('Unable to wipe database', error)
  })
