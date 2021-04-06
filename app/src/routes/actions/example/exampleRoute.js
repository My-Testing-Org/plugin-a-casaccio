const routeSchema = {
  tags: ['Example'],
  summary: 'Example summary',
  description: 'Example description',
  querystring: {
    type: 'object',
    properties: {
      example_param: { type: 'string', description: 'Example querystring param' },
    },
    required: ['example_param'],
  },
  response: {
    200: {
      $ref: 'Example200#',
    },
    404: {
      $ref: 'Example404#',
    },
    500: {
      $ref: 'Example500#',
    },
  },
}

module.exports = async function (fastify) {
  fastify.get('/', { schema: routeSchema }, async (req, reply) => {
    reply.code(200).send({
      anyExampleProperty: 'anyExampleProperty',
    })
  })
}
