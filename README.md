# grpc-nodejs

A Node.js application that demonstrates bidirectional streaming using gRPC with two services:

1. Greet Service
2. Calculator Service

## Prerequisites

* Node.js (v16 or later)
* gRPC Tools
* Protobuf Compiler

## Installation

1. Clone the repository:

```bash
git clone https://github.com/mariscalromeroalejandro/gRPC-nodejs
cd grpc-nodejs
```

2. Install dependencies:

```bash
npm install
```

## Generate Protobuf Files

To generate the gRPC client and server code from `.proto` files, run:

```bash
npm run pb:gen
```

This command uses the `gen.sh` script located in the `scripts` folder and processes both `greet` and `calculator` services.

## Running the Services

### Enabling TLS/SSL:

To enable TLS/SSL, set the tls variable to true in both the client and server main() functions. Ensure the following files are available in the ./ssl directory:

`ca.crt` - Root Certificate

`server.crt` - Server Certificate

`server.pem` - Private Key

Run the `ssl:gen` script to generate these files.
The server can also be configured for secure or insecure connections. The tls variable in the server and client `main()` function controls the configuration.

### Greet Service

* Start the Greet Server:

```bash
npm run greet:server
```

* Run the Greet Client:

```bash
npm run greet:client
```

### Calculator Service

* Start the Calculator Server:

```bash
npm run calculator:server
```

* Run the Calculator Client:

```bash
npm run calculator:client
```

## Client Implementation

The `main()` function in `client/index.js` is the entry point for the client-side implementation of the Calculator service. It establishes a connection to the gRPC server and invokes the desired RPC method.

### Usage:

* The client is set to invoke the `doMax` function by default. This function streams a series of numbers to the server and receives the maximum number in the stream as a response.

* To run other functions such as `doSum`, `doPrime`, or `doAvg`, uncomment the respective function calls in the `main()` function and comment out the current `doMax(client)` call.

Example:

```javascript
function main() {
    const creds = grpc.ChannelCredentials.createInsecure();
    const client = new CalculatorServiceClient('localhost:50051', creds);

    // Uncomment the desired function call to test:
    // doSum(client);
    // doPrime(client);
    // doAvg(client);
    doMax(client);  // This is the default implementation
}
```

After making changes, run the client using:

```bash
npm run calculator:client
```

## Project Structure

```
grpc-nodejs/
├── greet/
│   ├── client/
│   ├── server/
│   └── greet.proto
├── calculator/
│   ├── client/
│   ├── server/
│   └── calculator.proto
├── scripts/
│   └── gen.sh
├── package.json
└── README.md
```

## Dependencies

* `@grpc/grpc-js`: gRPC library for Node.js
* `google-protobuf`: Protocol Buffers library for Node.js
* `grpc-tools`: Tools for compiling `.proto` files

## License

ISC

## Author

Alejandro Mariscal Romero
