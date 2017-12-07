const express = require('express')
const Product = require('../models/Product')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

router.get('/products', requireJWT, (req, res) => {
  Product.find().then((products) => {
    res.send(products)
  })
  .catch((error) => {
    res.status(500).send({ error: error.message })
  })
})

router.get('/products/:id', requireJWT, (req, res) => {
  Product.findById(req.params.id).then((product) => {
    res.send(product)
  })
  .catch((error) => {
    res.status(500).send({ error: error.message })
  })
})

router.post('/products', requireJWT, (req, res) => {
  Product.create({ brandName: req.body.brandName, name: req.body.name })
    .then((product) => {
    console.log('Product created!', product)
    res.send(product)
  })
  .catch((error) => {
    res.status(500).send({ error: error.message })
  })
})

router.delete('/products/:id', requireJWT, (req, res) => {
  Product.findOneAndRemove(req.params.id).then(() => {
    console.log('Product deleted');
    res.send('Product deleted')
  })
  .catch((error) => {
    console.log('Unable to drop product', error)
  })
})

router.patch('/products/:id', requireJWT, (req, res) => {
  Product.findByIdAndUpdate(req.params.id,
    {$set: {
        brandName: req.body.brandName,
        name: req.body.name
      }}
  )
  .then(() => {
    console.log('Product updated');
    res.send('Product updated')
  })
  .catch((error) => {
    console.log('Unable to update product', error)
  })
})

module.exports = router
