let net = require('net');
let client = net.createConnection(
    { port: 8080}, function (data) {
    console.log(data)
})