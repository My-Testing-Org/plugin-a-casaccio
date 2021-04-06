module.exports.code200 = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        description: 'Example 200',
        properties: {
          anyExampleProperty: {
            type: 'string',
            description: 'Any example property',
            nullable: true,
          },
        },
      },
    },
  },
  description: 'Example 200',
}

module.exports.code404 = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        description: 'Example 404',
        properties: {
          statusCode: {
            type: 'integer',
            format: 'int32',
            nullable: false,
          },
          error: {
            type: 'string',
            nullable: false,
          },
          message: {
            type: 'string',
            nullable: false,
          },
          stackTrace: {
            type: 'string',
            nullable: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
  description: 'Example 404',
}
