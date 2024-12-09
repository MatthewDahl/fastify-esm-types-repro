import fp from 'fastify-plugin'

export default fp(async (fastify) => {
  const configValue = fastify.config.value
  fastify.decorate('feature', { configValue })
}, {
  name: 'feature',
  dependencies: ['config']
})

declare module 'fastify' {
  interface FastifyInstance {
    feature: {
      configValue: string
    }
  }
}
