const grpc = require('@grpc/grpc-js');
const { Blog, BlogId } = require('../proto/blog_pb');
const { ObjectId } = require('mongodb');
const { Empty } = require('google-protobuf/google/protobuf/empty_pb');

function blogToDocument(blog) {
    return {
        author_id: blog.getAuthorId(),
        title: blog.getTitle(),
        content: blog.getContent()
    }
}

function documentToBlog(document) {
    return new Blog()
        .setId(document._id.toString())
        .setAuthorId(document.author_id)
        .setTitle(document.title)
        .setContent(document.content);
}

const internal = (err, callback) => callback({
    code: grpc.status.INTERNAL,
    message: err.toString()
})

function checkNotAcknowledged(res, callback) {
    if (!res.acknowledged) {
        callback({
            code: grpc.status.INTERNAL,
            message: 'Operation was not acknowledged'
        })
    }
}

/**
 * Attempts to convert the provided ID string to a MongoDB ObjectId.
 * If the conversion fails, invokes the callback with an INTERNAL gRPC error.
 *
 * @param {string} id - The string to convert to an ObjectId.
 * @param {function} callback - The callback to send the error if conversion fails.
 * @returns {ObjectId|undefined} The ObjectId if successful, otherwise undefined.
 */
function checkOID(id, callback) {
    try {
        return new ObjectId(id)
    } catch (error) {
        callback({
            code: grpc.status.INTERNAL,
            message: 'Invalid OID'
        })
    }
}

function checkNotFound(res, callback) {
    if (!res || res.matchedCount == 0 || res.deleteCount == 0) {
        callback({
            code: grpc.status.NOT_FOUND,
            message: 'Could not find blog'
        })
    }
}

/**
 * Handles the gRPC request to create a new blog entry.
 * @param {Object} call - The gRPC call object containing the request.
 * @param {function} callback - The callback to send the response or error.
 * @returns {void}
 * 
 * The function converts the incoming blog request to a MongoDB document,
 * inserts it into the collection, and returns the generated BlogId.
 * If an error occurs, it responds with an INTERNAL gRPC error.
 */
exports.createBlog = async (call, callback) => {
    const data = blogToDocument(call.request);
    await collection.insertOne(data).then((res) => {
        checkNotAcknowledged(res, callback);
        const id = res.insertedId.toString();
        const blogId = new BlogId().setId(id);

        callback(null,blogId)
    }).catch((err) => {
        console.error(err)
        internal(err, callback)
    })
}

exports.readBlog = async (call, callback) => {
    const oid = checkOID(call.request.getId(), callback)
    await collection.findOne({ _id: oid }).then((res) => {
        checkNotFound(res, callback);
        callback(null, documentToBlog(res))
    }).catch((error) => internal(error, callback))
}

exports.updateBlog = async (call, callback) => {
    const oid = checkOID(call.request.getId(), callback);
    await collection.updateOne(
        { _id: oid },
        { $set: blogToDocument(call.request) },
    ).then((res) => {
        checkNotFound(res, callback);
        checkNotAcknowledged(res, callback);
        callback(null, new Empty())
    }).catch((err) => internal(err, callback))
}

exports.listBlogs = async (call, _) =>
    await collection.find()
        .map((doc) => documentToBlog(doc))
        .forEach((blog) => call.write(blog))
        .then(() => call.end())
        .catch((err) => call.destroy({
            code: grpc.status.INTERNAL,
            message: 'Could not list blogs'
        }))

exports.deleteBlog = async (call, callback) => {
    const oid = checkOID(call.request.getId(), callback);
    await collection.deleteOne({ _id: oid }).then((res) => {
        checkNotFound(res, callback);
        checkNotAcknowledged(res, callback);
        callback(null, new Empty())
    }).catch((err) => internal(err, callback))

}