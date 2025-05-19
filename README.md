# grpc-nodejs

A Node.js application demonstrating bidirectional streaming using gRPC with three services:

1. Greet Service
2. Calculator Service
3. Blog Service

## Prerequisites

* Node.js (v16 or later)
* gRPC Tools
* Protobuf Compiler
* Docker (for MongoDB)

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

This command uses the `gen.sh` script located in the `scripts` folder and processes `greet`, `calculator`, and `blog` services.

---

## Running the Services

### Enabling TLS/SSL:

To enable TLS/SSL, set the `tls` variable to `true` in both the client and server main() functions. Ensure the following files are available in the `./ssl` directory:

* `ca.crt` - Root Certificate
* `server.crt` - Server Certificate
* `server.pem` - Private Key

Run the `ssl:gen` script to generate these files:

```bash
npm run ssl:gen
```

---

### Greet Service

* Start the Greet Server:

```bash
npm run greet:server
```

* Run the Greet Client:

```bash
npm run greet:client
```

---

### Calculator Service

* Start the Calculator Server:

```bash
npm run calculator:server
```

* Run the Calculator Client:

```bash
npm run calculator:client
```

---

### Blog Service

The Blog Service demonstrates CRUD operations with MongoDB using gRPC.

#### Starting MongoDB:

Before running the Blog Service, start MongoDB using Docker:

```bash
npm run blog:db
```

#### Start the Blog Server:

```bash
npm run blog:server
```

#### Run the Blog Client:

```bash
npm run blog:client
```

---

### Client Implementation

Each service has its own client implementation located in its respective folder (`greet/client`, `calculator/client`, `blog/client`).

Example usage for the Blog client:

```javascript
function main() {
    const creds = grpc.credentials.createInsecure();
    const client = new BlogServiceClient('localhost:50051', creds);

    const req = new Blog()
        .setAuthorId('Alex')
        .setTitle('My First Blog')
        .setContent('This is a sample blog post.');

    client.createBlog(req, (err, res) => {
        if (err) {
            console.error('Error:', err.message);
            return;
        }
        console.log('Blog created with ID:', res.getId());
    });
}

main();
```

---

## Project Structure

```
grpc-nodejs/
├── greet/
│   ├── client/
│   ├── server/
│   └── proto/
├── calculator/
│   ├── client/
│   ├── server/
│   └── proto/
├── blog/
│   ├── client/
│   ├── server/
│   ├── proto/
│   └── docker-compose.yml
├── scripts/
│   └── gen.sh
├── ssl/
│   └── (SSL Certificates)
├── package.json
└── README.md
```

---

## Dependencies

* `@grpc/grpc-js`: gRPC library for Node.js
* `google-protobuf`: Protocol Buffers library for Node.js
* `grpc-tools`: Tools for compiling `.proto` files
* `mongodb`: MongoDB driver for Node.js

---

## License

ISC

## Author

Alejandro Mariscal Romero
