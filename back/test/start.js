const { expect } = require("chai")

it('first test', () => {
    expect(2+2).to.equal(4)
})

it('second test', () => {
    expect(2+2).not.to.equal(5)
})