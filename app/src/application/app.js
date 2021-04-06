const fastify = require('fastify')
const autoload = require('fastify-autoload')
const cors = require('fastify-cors')
const path = require('path')
const pluginCore = require('responsa-plugin-core-js')
const config = require('./config')
const auth = require('./auth')
const notFound = require('./notFound')
const errorHandler = require('./errorHandler')
const example = require('../models/example')

const addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({
    $id: 'ResponsaSingleChoiceResource',
    ...pluginCore.ResponsaSingleChoiceResource,
  })
  fastifyInstance.addSchema({
    $id: 'ResponsaRichMessageResource',
    ...pluginCore.ResponsaRichMessageResource,
  })
  fastifyInstance.addSchema({
    $id: 'Error',
    ...pluginCore.errorSchema,
  })

  example.addSchemas(fastifyInstance)
}

const createServer = (opts, customElastic) => {
  const defaultElastic = {
    uri: config.elasticUri,
    user: config.elasticUser,
    password: config.elasticPassword,
    index: config.elasticIndex,
  }
  const defaultOptions = {
    logger: pluginCore.loggerFactory({ ...defaultElastic, ...customElastic }),
    ignoreTrailingSlash: true,
  }
  const options = { ...defaultOptions, ...opts }
  return fastify(options)
}

let server = createServer()

exports.reboot = (options, elastic) => {
  server = createServer(options, elastic)
  return this.default(server, options)
}

exports.startUp = (options) => this.default(server, options)

exports.default = function (fastifyInstance, opts) {
  const f = fastifyInstance

  f.register(cors)
  f.register(pluginCore, {
    prefix: '/core',
  })
  f.decorate('auth', auth)
  f.setNotFoundHandler(notFound)
  f.setErrorHandler(errorHandler)

  addSchemas(f)
  // Do not touch the following lines

  // This loads all plugins defined in routes
  // define your routes in one of these
  f.register(autoload, {
    dir: path.join(__dirname, '..', 'routes'),
    options: { ...opts },
  })

  return f
}
