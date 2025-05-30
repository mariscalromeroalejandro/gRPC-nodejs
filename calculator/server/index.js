const grpc = require('@grpc/grpc-js');
const serviceImpl = require('./service_impl')
const { CalculatorServiceService } = require('../proto/calculator_grpc_pb')

const addr = 'localhost:50051'

function cleanup(server) {
    console.log('Cleanup');
    if (server) {
        server.forceShutdown()
    }
}

function main() {
    const server = new grpc.Server();
    const creds = grpc.ServerCredentials.createInsecure();

    process.on('SIGINT', () => {
        console.log('Caught intterrupt signal');
        cleanup(server)
    })

    server.addService(CalculatorServiceService, serviceImpl);
    server.bindAsync(addr, creds, (err, port) => {
        if (err) {
            console.error(`Error binding server: ${err.message}`);
            return cleanup(server)
        }
        console.log(`Listening on port ${port}`);
        server.start();
    })
}

main();