const request = require('supertest')
const app = require('../server')
const User = require('../models/User')
const Product = require('../models/Product')
const chai = require('chai')
const should = chai.should()

let token
let productId

describe('Test routes', () => {
  it('should return a 404 for an invalid URL', (done) => {
    request(app)
      .get('/test')
      .expect(404, done)
  })
  it('should register a user', (done) => {
    request(app)
      .post('/auth/register')
      .send({
        firstName: "John",
        lastName: "Smith",
        email: `test@testing.com`,
        password: "kittenfluffy"
      })
      .expect(200)
      .then((response) => {
        console.log(response.body)
        done()
      })
  }).timeout(5000)
  it('should login a user', (done) => {
    request(app)
      .post('/auth')
      .send({
        email: `test@testing.com`,
        password: "kittenfluffy"
      })
      .expect(200)
      .then((response) => {
        token = response.body.token
        done()
      })
  }).timeout(5000)
  it('should require correct credentials', (done) => {
    request(app)
      .post('/auth')
      .send({
        email: `test@test.com`,
        password: "kittenfluffy"
      })
      .expect(401, done)
  })
  it('should require a token to view products', (done) => {
    request(app)
      .get('/products')
      .expect(401, done)
  })
  it('should display products to valid token bearers', (done) => {
    request(app)
    .get('/products')
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
    .then((response) => {
      response.body.should.to.be.an('array')
      done()
    })
  })
  it('should not let normal users through to /admin', (done) => {
    request(app)
      .get('/admin')
      .expect(401, done)
  })
  it('should allow users to create', (done) => {
    request(app)
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .send({
        brandName: 'Pawesome',
        name: 'Kitty-Socks'
      })
      .expect(200)
      .then((response) => {
        productId = response.body._id
        console.log(response.body)
        done()
      })
  }).timeout(100000)

  it('should allow users to update', (done) => {
    request(app)
      .patch(`/products/${productId}`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        brandName: 'Paweful',
        name: 'Doggy-Crocs'
      })
      .expect(200)
      .then((response) => {
        console.log(response.body)
        done()
      })
      .catch((error) => {
        console.log(error.message)
        done(error)
      })
  }).timeout(10000)

  it('should allow users to delete', (done) => {
    request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200, done)
  }).timeout(1000000)


  after(() => {
    User.remove({ email: 'test@testing.com' })
      .then(() => {
        console.log('Cleaned up the database!')
      })
  })
})
