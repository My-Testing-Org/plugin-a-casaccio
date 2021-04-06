module.exports = (request, reply) => {
  reply.code(404).type('application/json').send({ message: 'Requested route does not exist' })
}
