const config = require('./application/config')
const application = require('./application/app')

const fastify = application.startUp()

fastify.log.info('APPLICATION STARTED')

const start = async () => {
  try {
    await fastify.listen(config.port, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
