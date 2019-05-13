var express = require('express'),
  http = require('http'),
  path = require('path');

var app = express();

var port = process.env.PORT || 3333;
app.set('port', port);
app.use(express.static(path.join(__dirname, '/')));

http.createServer(app).listen(port);
console.log('Localhost run at port ' + port);
