const { expect } = require('chai')
const sinon = require('sinon')

const controller = require('../controllers/feed')
const Post = require('../models/post')


it('post create', () => {
    sinon.stub(Post,'findOne')
    Post.findOne.throws()

    expect(controller.getPosts())

    Post.findOne.restore()
})