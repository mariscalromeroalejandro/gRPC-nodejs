const grpc = require('@grpc/grpc-js');
const serviceImpl = require('./service_impl')
const { BlogServiceService } = require('../proto/blog_grpc_pb')
const {MongoClient} = require('mongodb')
const fs = require('fs')

const addr = 'localhost:50051';
const uri = 'mongodb://root:root@localhost:27017/'
const mongoClient = new MongoClient(uri);

global.collection = undefined;

async function cleanup(server) {
    console.log('Cleanup');
    if (server) {
        await mongoClient.close();
        server.forceShutdown();
    }
}

async function main() {
  process.on('SIGINT', () => {
    console.log('Caught interrupt signal');
    cleanup(server);
  });

  await mongoClient.connect();

  const database = mongoClient.db('blogdb');
  collection = database.collection('blog');

  const creds = grpc.ServerCredentials.createInsecure();
  server = new grpc.Server();
  server.addService(BlogServiceService, serviceImpl);
  server.bindAsync(addr, creds, (err, _) => {
    if (err) {
      return cleanup(server);
    }

    server.start();
  });

  console.log('Listening on: ' + addr);
}

main().catch(cleanup());
