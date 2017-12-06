const Product = require('./Product')

Product.deleteMany()
  .then() => {
    console.log('Database has been wiped.')
  })
  .catch((error) => {
    console.log('Unable to wipe database', error)
  })
