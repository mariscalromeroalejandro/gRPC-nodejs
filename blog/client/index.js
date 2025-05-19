const fs = require('fs')
const grpc = require('@grpc/grpc-js');
const {BlogServiceClient} = require('../proto/blog_grpc_pb')
const { Blog, BlogId } = require('../proto/blog_pb');

function createBlog(client) {
  console.log('---createBlog was invoked---');
  return new Promise((resolve, reject) => {
    const req = new Blog()
        .setAuthorId('Alex')
        .setTitle('My First Blog')
        .setContent('Content of the first blog');

    client.createBlog(req, (err, res) => {
      if (err) {
        reject(err);
      }

      console.log(`Blog was created: ${res}`);
      resolve(res.getId());
    });
  });
}

function readBlog(client, id) {
  console.log('---readBlog was invoked---');
  return new Promise((resolve, reject) => {
    const req = new BlogId().setId(id);
    client.readBlog(req, (err, res) => {
      if (err) {
        reject(err)
      } 
      console.log(`Blog was read: ${res}`)
      resolve();
    })
  })
  

}

async function main() {
  const client = new BlogServiceClient(
      '0.0.0.0:50051',
      grpc.credentials.createInsecure(),
  );

  const id = await createBlog(client);
  await readBlog(client, id);
}

main();
