export default function rabbitMQConfig(uri: string, exchanges: {}[], queues: {}[], bindings: {}[]): {
    connection: {
        uri: string;
    };
    exchanges: {}[];
    queues: {}[];
    bindings: {}[];
};
