var http = require('http'),
    send = require('send');

var mongo = require('mongodb'),
    monk = require('monk'),
    db = monk('localhost:27017/bookshelf');

var server = http.createServer(function(req, res) {
  console.log(req.method)
  console.log(req.url)

  switch (req.method) {
    case "GET":
      if (req.url === '/books') {
        db.get('bookcollection').find({}, {}, function(e, docs) {
          res.writeHead({ 'Content-Type': 'application/json' });
          res.end(JSON.stringify(docs));
        });
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
