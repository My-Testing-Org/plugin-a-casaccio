module.exports = (error, request, reply) => {
  if (request.url.indexOf('/?q') !== -1) return reply.sendFile('root400.html')

  if (error instanceof Error) {
    return reply.type('application/json').send({
      statusCode: reply.statusCode,
      error: error.message,
      message: error.message,
      stackTrace: error.stack,
    })
  }

  const errorContent = error()

  return reply.code(errorContent.statusCode).type('application/json').send({
    statusCode: errorContent.statusCode,
    error: errorContent.code,
    message: errorContent.message,
  })
}
