const grpc = require('@grpc/grpc-js');
const { GreetServiceClient } = require('../proto/greet_grpc_pb');
const { GreetRequest } = require('../proto/greet_pb');

function doGreet(client) {
    console.log('doGreet was invoked');
    const req = new GreetRequest();
    req.setFirstName('Alex');

    client.greet(req, (err, res) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        console.log(`Greet Response: ${res.getResult()}`);
    });
}

function doGreetManyTimes(client) {
    console.log('Do greet many times was invoked');
    const req = new GreetRequest()
        .setFirstName('Alex');
    const call = client.greetManyTimes(req);
    call.on('data', (res) => {
        console.log(`Greet many times: ${res.getResult()}`)
    })
}

function main() {
    const creds = grpc.ChannelCredentials.createInsecure();
    const client = new GreetServiceClient('localhost:50051', creds);
    // doGreet(client);
    doGreetManyTimes(client);

}

main();
