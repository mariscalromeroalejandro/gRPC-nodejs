const grpc = require('@grpc/grpc-js');
const { CalculatorServiceClient } = require('../proto/calculator_grpc_pb')
const { SumRequest, PrimeRequest } = require('../proto/calculator_pb')

function doSum(client) {
    console.log('sum was invoked');
    const req = new SumRequest()
        .setFirstNumber(3)
        .setSecondNumber(2);

    client.sum(req, (err, res) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        console.log(`Sum response: ${res.getResult()}`);
    });
}

function doPrime(client) {
    console.log('prime was invoked');
    const req = new PrimeRequest()
        .setNumber(120)
    const call = client.primes(req);
    call.on('data', (res) => {
        console.log(`Prime: ${res.getResult()}`)
    })
} 

function main() {
    const creds = grpc.ChannelCredentials.createInsecure();
    const client = new CalculatorServiceClient('localhost:50051', creds);
    // doSum(client);
    doPrime(client);

}

main();