const pb = require("../proto/greet_pb")

exports.greet = (call, callback) => {
    console.log("Greet was invoked")
    const res = new pb.GreetResponse()
        .setResult(`Hello ${call.request.getFirstName()}`);
    callback(null, res);
}

exports.greetManyTimes = (call, _) => {
    console.log('Greet many times was invoked');
    
    for (let i = 0; i < 10; i++) {
        const res = new pb.GreetResponse();
        res.setResult(`Hello ${call.request.getFirstName()} - number ${i}`)
        call.write(res)
    }
    call.end();

}