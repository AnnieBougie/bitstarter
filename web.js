var express = require('express');
var fs = require('fs');

var fileName = 'index.html';
fs.stat(fileName, function(error, stats) {
  fs.open(fileName, "r", function(error, fd) {
    var buffer = new Buffer(stats.size);
    fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
      var data = buffer.toString("utf8", 0, buffer.length);
      fs.close(fd);
      var app = express.createServer(express.logger());

      app.get('/', function(request, response) {
        response.send(data);
      });

      var port = process.env.PORT || 8080;
      app.listen(port, function() {
        console.log("Listening on " + port);
      });
    });
  });
});
