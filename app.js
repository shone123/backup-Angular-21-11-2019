/*var http = require("http");
var opn = require('opn');

const chromeLauncher = require('chrome-launcher');

http.createServer(function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end('Hello World\n');

}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
opn('http://sindresorhus.com');*/


//const chromeLauncher = require('chrome-launcher');
const chromeLauncher = require('chrome-launcher');

chromeLauncher.launch({
  startingUrl: 'https://google.com'
}).then(chrome => {
  console.log(`Chrome debugging port running on ${chrome.port}`);
});

 
