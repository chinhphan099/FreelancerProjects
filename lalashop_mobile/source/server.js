var express = require('express'),
  http = require('http'),
  path = require('path'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');

var app = express();

var port = process.env.PORT || 1111;
app.set('port', port);
app.set('views', path.join(__dirname, '/views/pages'));
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/me', function(req, res){
  res.send({
    app: 'Template',
    version: '1.0.0'
  });
});

app.use(function(req, res){
  res.setHeader('Content-Type', 'text/plain');
  res.send(JSON.stringify(req.body, null, 2));
});

http.createServer(app).listen(port);
console.log('Template is running on port ' + port);
