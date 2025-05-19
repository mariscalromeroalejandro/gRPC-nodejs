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
