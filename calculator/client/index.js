const grpc = require('@grpc/grpc-js');
const { CalculatorServiceClient } = require('../proto/calculator_grpc_pb')
const { SumRequest, PrimeRequest, AvgRequest } = require('../proto/calculator_pb')

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

function doAvg(client) {
    console.log('avg was invoked');
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const call = client.avg((err, res) => {
        if (err) {
            return console.error(err.message)
        }
        console.log(`Avg: ${res.getResult()}`)
    })
    numbers.map((number) => {
        return new AvgRequest().setNumber(number)
    }).forEach((req) => call.write(req))
    call.end()
}

function main() {
    const creds = grpc.ChannelCredentials.createInsecure();
    const client = new CalculatorServiceClient('localhost:50051', creds);
    // doSum(client);
    // doPrime(client);
    doAvg(client);

}

main();