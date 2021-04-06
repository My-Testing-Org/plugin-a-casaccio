module.exports = async function (fastify) {
  fastify.get('/', async () => {
    const ciCommit = 'CI_PUTS_HERE_LAST_GIT_COMMIT'
    const lastDeploy = 'CI_PUTS_HERE_DEPLOY_DATE'

    return `ok! Plugin Demo released on ${lastDeploy}, last commit was "${ciCommit}"`
  })
}
