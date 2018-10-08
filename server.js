let express = require('express')
const expressApp = express()
var path = require('path')
var fs = require('fs')
var http = require('http')


expressApp.use('/', express.static(path.join(__dirname, 'hosted_files')))
expressApp.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/hosted_files/index.html'));
})
let port = process.argv[2]
var server = http.createServer(expressApp)
try {
    server.listen(port)
    port = server.address().port //incase port was not passed in
    console.log("listening on port " + port)
} catch (e) {
    console.error(e)
}