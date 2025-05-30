const fs = require('fs')
const grpc = require('@grpc/grpc-js');
const { GreetServiceClient } = require('../proto/greet_grpc_pb');
const { GreetRequest } = require('../proto/greet_pb');

//unary
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

//client streaming
function doGreetManyTimes(client) {
    console.log('Do greet many times was invoked');
    const req = new GreetRequest()
        .setFirstName('Alex');
    const call = client.greetManyTimes(req);
    call.on('data', (res) => {
        console.log(`Greet many times: ${res.getResult()}`)
    })
}

//server streaming
function doLongGreet(client) {
    console.log('doLongGreet was invoked');

    const names = ['Alex', 'Paco'];
    const call = client.longGreet((err, res) => {
        if (err) {
            return console.log(err)
        }
        console.log(`LongGreet: ${res.getResult()}`)
    })
    names.map((name) => {
        return new GreetRequest().setFirstName(name);
    }).forEach((req) => call.write(req))
    call.end()
}

//bi-directional streaming
function doGreetEveryone(client) {
    console.log('doGreetEveryone invoked')
    const names = ['Alex', 'Paco'];
    //write on the stream (from client streaming)
    const call = client.greetEveryone();
    // event (from the server streaming)
    call.on('data', (res) => {
        console.log(`GreetEveryone: ${res.getResult()}`)
    });
    names.map((name) => {
        return new GreetRequest().setFirstName(name);
    }).forEach((req) => call.write(req))
    call.end();
}

function doGreetWithDeadline(client, ms) {
    console.log(`Do greet with deadile was invoked`)
    const req = new GreetRequest().setFirstName('Alex')
    client.greetWithDeadline(req,
        { deadline: new Date(Date.now() + ms) }, (err, res) => {
            if (err) {
                return console.error(err.message)
            }
            console.log(`GreetWithDeadline: ${res.getResult()}`)
        }
    )
}


function main() {
    const tls = true;
    let creds;
    if (tls) {
        const rootCert = fs.readFileSync('./ssl/ca.crt');
        creds = grpc.ChannelCredentials.createSsl(rootCert)
    } else {
        creds = grpc.ChannelCredentials.createInsecure();
    }
    const client = new GreetServiceClient('localhost:50051', creds);
    doGreet(client);
    // doGreetManyTimes(client);
    // doLongGreet(client);
    // doGreetEveryone(client);
    //     doGreetWithDeadline(client, 1000)

    // doGreetWithDeadline(client, 5000)

}

main();
