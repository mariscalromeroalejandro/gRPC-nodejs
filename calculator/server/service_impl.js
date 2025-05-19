const pb = require("../proto/calculator_pb");

exports.sum = (call, callback) => {
    console.log("Sum was invoked");
    const res = new pb.SumResponse()
        .setResult(call.request.getFirstNumber() + call.request.getSecondNumber())
    
    callback(null, res);
}

exports.primes = (call, _) => {
    console.log('Get primes was invoked');
    let k = 2;
    let N = call.request.getNumber();
    while (N > 1) {
        if (N % k === 0) {
            const res = new pb.PrimeResponse();
            res.setResult(k);
            call.write(res);
            N /= k;
        } else {
            k++;
        }
    }

    call.end();
};

exports.avg = (call, callback) => {
    console.log('Average was invoked');
    let sum = 0;
    let len = 0;
    call.on('data', (req) => {
        sum += req.getNumber()
        len++;
    })
    call.on('end', () => {
        const avg = sum / len;
        const res = new pb.AvgResponse()
            .setResult(avg);
        callback(null,res)
    })
}
