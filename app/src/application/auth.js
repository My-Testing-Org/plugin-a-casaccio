const config = require('./config')

module.exports = (request, reply, next) => {
  const secret = config.secretValue

  if (
    request.headers['x-secret'] !== undefined &&
    request.headers['x-secret'].toString() === secret
  ) {
    return next()
  }
  reply.code(401)

  return next(new Error('Unauthorized'))
}
