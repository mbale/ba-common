export default function rabbitMQConfig(uri: string, exchanges: {}[], queues: {}[], bindings: {}[]) {
  return {
    connection: {
      uri,
    },
    exchanges,
    queues,
    bindings,
  }
}