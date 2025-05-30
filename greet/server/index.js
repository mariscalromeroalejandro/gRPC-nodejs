const grpc = require('@grpc/grpc-js');
const serviceImpl = require('./service_impl')
const { GreetServiceService } = require('../proto/greet_grpc_pb')
const fs = require('fs')

const addr = 'localhost:50051';

function cleanup(server) {
    console.log('Cleanup');
    if (server) {
        server.forceShutdown();
    }
}

function main() {
    const server = new grpc.Server();
    const tls = true;
    let creds;
    if (tls) {
        const rootCert = fs.readFileSync('./ssl/ca.crt')
        const certChain = fs.readFileSync('./ssl/server.crt')
        const privateKey = fs.readFileSync('./ssl/server.pem')
        creds = grpc.ServerCredentials.createSsl(rootCert, [{
            cert_chain: certChain,
            private_key: privateKey
        }])
    } else {
        grpc.ServerCredentials.createInsecure()
    }

    process.on('SIGINT', () => {
        console.log('Caught interrupt signal');
        cleanup(server);
    });

    server.addService(GreetServiceService, serviceImpl);
    server.bindAsync(addr, creds, (err, port) => {
        if (err) {
            console.error(`Error binding server: ${err.message}`);
            return cleanup(server);
        }
        console.log(`Listening on ${addr}`);
        server.start()
    });
}

main();
