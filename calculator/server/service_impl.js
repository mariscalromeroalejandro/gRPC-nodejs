const pb = require("../proto/calculator_pb");

exports.sum = (call, callback) => {
    console.log("Sum was invoked");
    const res = new pb.SumResponse()
        .setResult(call.request.getFirstNumber() + call.request.getSecondNumber())
    
    callback(null, res);
}