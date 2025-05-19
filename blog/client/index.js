const fs = require('fs')
const grpc = require('@grpc/grpc-js');
const {BlogServiceClient} = require('../proto/blog_grpc_pb')
const { Blog, BlogId } = require('../proto/blog_pb');
const { Empty } = require('google-protobuf/google/protobuf/empty_pb');

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

function updateBlog(client, id) {
  console.log('-----updateBlog was invoked----')
  return new Promise((resolve, reject) => {
    const req = new Blog()
      .setId(id)
      .setAuthorId('not Alex')
      .setTitle('blog about marbella')
      .setContent('content of the blog')
    client.updateBlog(req, (err, _) => {
      if (err) {
        reject(err)
      }
      console.log('blog was updated')
      resolve();

    })
  })
}

function listBlogs(client) {
  console.log('----list blogs invoked----');
  return new Promise((resolve, reject) => {
    const req = new Empty();
    const call = client.listBlogs(req);
    call.on('data', (res) => {
      // readable object
      console.log(res.toObject())
    })
    call.on('error', (err) => {
      reject(err)
    })
    call.on('end', () => {
      resolve();
    })
  })
}

function deleteBlog(client, id) {
  console.log('delete blog invoked');
  return new Promise((resolve, reject) => {
    const req = new BlogId().setId(id);
    client.deleteBlog(req, (err, _) => {
      if (err) {
        reject(err)
      }
      console.log('Blog was deleted')
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
  await updateBlog(client, id);
  await listBlogs(client);
  await deleteBlog(client, id);
}

main();
