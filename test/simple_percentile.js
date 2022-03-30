process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server/server')
const should = chai.should()

chai.use(chaiHttp)

describe('Simple percentile', () => {

  /*
   * all inserted api test
   */
  describe('/POST insert', () => {
    it('Should return missing poolId', (done) => {
      let body = {
        "poolValues": [1]
      }
      chai.request(server)
        .post('/insert')
        .send(body)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          res.body.errors[0].msg.should.eql("Missing poolId field")
          done()
        })
    })

    it('Should return missing poolValues', (done) => {
      let body = {
        "poolId": 1
      }
      chai.request(server)
        .post('/insert')
        .send(body)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          res.body.errors[0].msg.should.eql("Missing poolValues field")
          done()
        })
    })

    it('Should return wrong data type of poolValues', (done) => {
      let body = {
        "poolId": 1,
        "poolValues": 1
      }
      chai.request(server)
        .post('/insert')
        .send(body)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          res.body.errors[0].msg.should.eql('poolValues is an array')
          done()
        })
    })

    it('Should return "inserted"', (done) => {
      let body = {
        "poolId": 111,
        "poolValues": [1,
          2,
          5,
          12,
          45,
          55,
          123,
          234,
          3,
          4,
          454,
          575,
          76,
          88,
          99,
          23,
          876,
          236,
          32,
          34]
      }
      chai.request(server)
        .post('/insert')
        .send(body)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql("inserted")
          done()
        })
    })
    it('Should return "inserted"', (done) => {
      let body = {
        "poolId": 123546,
        "poolValues": [
          1,
          7,
          2,
          6
        ]
      }
      chai.request(server)
        .post('/insert')
        .send(body)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql("inserted")
          done()
        })
    })

    it('Should return "appended"', (done) => {
      let body = {
        "poolId": 123546,
        "poolValues": [
          1,
          7,
          2,
          6
        ]
      }
      chai.request(server)
        .post('/insert')
        .send(body)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql("appended")
          done()
        })
    })
  })

  /*
   * all query api test
   */
  describe('/POST query', () => {
    it('Should return NOT_EXIST', (done) => {
      let body = {
        "poolId": 123,
        "percentile": 0
      }
      chai.request(server)
        .post('/query')
        .send(body)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.body.should.have.property('error').eql('NOT_EXIST')
          done()
        })
    })
    it('Should return percentile_value=99 pool_size=20', (done) => {
      let body = {
        "poolId": 111,
        "percentile": 70
      }
      chai.request(server)
        .post('/query')
        .send(body)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('percentile_value').eql(99)
          res.body.should.have.property('pool_size').eql(20)
          done()
        })
    })

    it('Should return percentile_value=1 pool_size=20', (done) => {
      let body = {
        "poolId": 111,
        "percentile": 0
      }
      chai.request(server)
        .post('/query')
        .send(body)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('percentile_value').eql(1)
          res.body.should.have.property('pool_size').eql(20)
          done()
        })
    })

    it('Should return percentile_value=876 pool_size=20', (done) => {
      let body = {
        "poolId": 111,
        "percentile": 100
      }
      chai.request(server)
        .post('/query')
        .send(body)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('percentile_value').eql(876)
          res.body.should.have.property('pool_size').eql(20)
          done()
        })
    })
  })
})