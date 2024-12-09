import fp from 'fastify-plugin'

export interface Config {
  value: string
}

export default fp(async (fastify) => {
  fastify.decorate('config', { value: 'test' })
})

declare module 'fastify' {
  interface FastifyInstance {
    config: Config
  }
}
