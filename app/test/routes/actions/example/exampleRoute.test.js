require('jest-extended')
const helper = require('../../../helper')
const responses = require('./responses')

describe('Example - Swagger OpenApi tests', () => {
  it('Example - loads correctly', async () => {
    helper.checkResponses('/actions/example', responses)
  })
})

describe('Example - Querystring validation', () => {
  it('Example - answers 200 with correct qs', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/example?example_param=1011913191',
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(200)
  })

  it('Example - answers 400 with invalid querystring', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/example?wrong_param=2',
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(400)
  })
})
