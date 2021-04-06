const helper = require('../helper')

// setup a basic test to verify routes and schemas
describe('App', () => {
  it('Status API answers properly', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(sut, 'status', helper.requiredHeaders)
    expect(response.statusCode).toEqual(200)
  })
})
