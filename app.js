var http = require('http'),
    send = require('send');

var server = http.createServer(function(req, res) {
  send(req, req.url).root(__dirname).pipe(res);
});

server.listen(process.env.PORT || 3000);
console.log('Server listening on port 3000');
