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

module.exports = router
