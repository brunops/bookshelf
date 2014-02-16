var http = require('http'),
    send = require('send');

var books = require('./books');

var server = http.createServer(function(req, res) {
  switch (req.method) {
    case "GET":
      if (req.url === '/books') {
        res.writeHead({ 'Content-Type': 'application/json' });
        res.end(JSON.stringify(books));
      }
      else {
        send(req, req.url).root(__dirname).pipe(res);
      }
      break;

    case "POST":
      break;

    case "DELETE":
        res.writeHead({ 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      break;

    default:
      res.statusCode = 400;
      return res.end('Error 400: Invalid HTTP method.');
  }

});

server.listen(process.env.PORT || 3000);
console.log('Server listening on port 3000');
