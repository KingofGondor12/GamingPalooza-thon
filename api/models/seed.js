const Product = require('./Product')
const Store = require('./Store')

Product.create([
  { brandName: 'Coca-Cola', name: '390ml Glass Bottle Coke'},
  { brandName: 'Coca-Cola', name: '390ml Glass Bottle Sprite'},
  { brandName: 'Coca-Cola', name: '390ml Glass Bottle Fanta'},
])
  .then((products) => {
    console.log('Created!', products)
  })
  .catch((error) => {
    console.log('Unable to seed products', error)
  })

Store.create([
  { name: `Jim's Food`, address: `3 Lollipop Lane`},
  { name: `Bill's Convience`, address: `12 Muffin Drive`}
])
  .then((stores) => {
    console.log('Created!', stores)
  })
  .catch((error) => {
    console.log('Unable to seed stores', error)
  })
