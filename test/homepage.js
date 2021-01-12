var chai = require('chai')
var chaiHttp = require('chai-http')

var app = require('../index')

chai.use(chaiHttp)
chai.should()

describe('Homepage', () => {
  it('should show the Hello World message', done => {
    chai
      .request(app)
      .get('/')
      .end((error, response) => {
        response.text.should.equal('Hello World!!')
        done()
      })
  })
})
