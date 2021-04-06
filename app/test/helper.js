const app = require('../src/application/app')

const setupTestEnvironment = () => {
  const options = {
    logger: false,
    pluginTimeout: 2 * 60 * 1000,
  }

  // setup fastify server
  const server = app.reboot(options)

  // setup test lifecycle hooks
  beforeAll(async () => {
    await server.ready()
  })

  afterAll(async () => {
    await server.close()
  })

  return server
}

async function doGet(fastifyInstance, path, headers) {
  const serverResponse = await fastifyInstance.inject({
    url: path,
    method: 'GET',
    headers,
  })
  return serverResponse
}

async function doPost(fastifyInstance, path) {
  const serverResponse = await fastifyInstance.inject({
    url: path,
    method: 'POST',
  })
  return serverResponse
}

const getSwagger = async () => {
  const sut = await setupTestEnvironment()

  const response = await doGet(sut, 'documentation/json')

  const actual = JSON.parse(response.payload)

  return actual
}

const checkRouteForCode = (swagger, route, code, expectedResponse) => {
  const actual = swagger.paths[route]
  expect(actual.get).toBeDefined()
  expect(actual.get.responses).toBeDefined()
  expect(actual.get.responses[code]).toBeDefined()
  expect(actual.get.responses[code]).toEqual(expectedResponse)
}

const checkResponses = async (url, expectedResponses) => {
  const actual = await getSwagger()
  Object.keys(expectedResponses).forEach((key) => {
    checkRouteForCode(actual, url, key.replace('code', ''), expectedResponses[key])
  })
}

const checkTranslations = async (expected) => {
  const actual = await getSwagger()
  expect(actual.info['x-translations']).toBe(expected)
}

const requiredHeaders = {
  'X-ConversationId': 4,
  'X-ResponsaTS': Date.now(),
}

module.exports = {
  doGet,
  doPost,
  setupTestEnvironment,
  checkResponses,
  requiredHeaders,
  checkTranslations,
}
