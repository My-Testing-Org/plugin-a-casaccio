module.exports.Example = {
  type: 'object',
  properties: {
    anyExampleProperty: {
      type: 'string',
      description: 'Any example property',
      nullable: true,
    },
  },
}

module.exports.Example200 = {
  type: 'object',
  description: 'Example 200',
  $ref: 'Example#',
}

module.exports.Example404 = {
  type: 'object',
  description: 'Example 404',
  $ref: 'Error#',
}

module.exports.Example500 = {
  type: 'object',
  description: 'Errore interno',
  $ref: 'Error#',
}

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'Example', ...this.Example })
  fastifyInstance.addSchema({ $id: 'Example200', ...this.Example200 })
  fastifyInstance.addSchema({ $id: 'Example404', ...this.Example404 })
  fastifyInstance.addSchema({ $id: 'Example500', ...this.Example500 })
}
