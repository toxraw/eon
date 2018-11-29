var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var appDoc = express();

app.use(express.static(path.join(__dirname, "../../build/webapp")));
appDoc.use(express.static(path.join(__dirname, "../../docs/release")));

// Main server
var serverMain = app.listen(8081, function() {
  var host = serverMain.address().address;
  var port = serverMain.address().port;
  console.log("Main server listening at http://localhost:" + port);
});

// Doc server
var serverDoc = appDoc.listen(8091, function() {
  var host = serverDoc.address().address;
  var port = serverDoc.address().port;
  console.log("Documentation server listening at http://localhost:" + port);
});