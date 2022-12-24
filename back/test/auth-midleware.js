const { expect } = require('chai')
const middleware = require('../middleware/is-auth')
const sinon = require('sinon')
const jwt = require('jsonwebtoken')

it('authorization header is empty', () => {
    const req = {
        //we are simulating get func of req
        get: function(header) {
            return null
        }
    }
    
    //because our created req isnot real req, so we should bind it to middleware
    expect(middleware.bind(this, req, {}, () => {})).be.throw('Not authenticated.')
})

it('should yield a userid after decoding the token', () => {
    const req = {
        //we are simulating get func of req
        get: function(header) {
            return "Bearer fgjjgynhfghhil,ugffdfh"
        }
    }
    //we should simulate verify of jwt class
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userId: 'abc' })

    middleware(req, {}, () => {})
    expect(req).to.have.property('userId')
    expect(req).to.have.property('userId','abc')
    expect(jwt.verify.called).to.be.true

    //return jwt to default 
    jwt.verify.restore();
})