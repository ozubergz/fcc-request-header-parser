// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var ip = require('ip');
var os = require('os')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/whoami", function (req, res) {
// var address = ip.address(); //gets user's ip address

//gets user's ip address
//-----------------------
// var addresses = []; 
// var interfaces = os.networkInterfaces();
// for(var x in interfaces) {
//  for(var y in interfaces[x]) {
//    var address = interfaces[x][y];
//    if(address.family === "IPv4" && !address.internal) {
//       addresses.push(address.address);
//     }
//   }
// }
  
  var address = req.header('x-forwarded-for').split(',')[0] || req.connection.remoteAddress; // gets ip address
  var language = req.header("accept-language"); // gets language
  var software = req.header("user-agent"); // gets browser software
  
  res.json({ipaddress: address, language: language , software: software});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
