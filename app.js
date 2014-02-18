var http = require('http'),
    send = require('send');

var mongo = require('mongodb'),
    monk = require('monk'),
    db = monk('localhost:27017/bookshelf');

var server = http.createServer(function(req, res) {
  console.log(req.method)
  console.log(req.url)

  var body = "";
  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    body = body ? JSON.parse(body) : '';

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
        if (req.url === '/books') {
          // Find next book id by looking at "counters" document
          // and increment sequence by 1
          db.get('counters').findAndModify({ _id: 'bookid' }, { $inc: { seq: 1 } }, function(e, docs) {
            // Next integer id needs to be set in order for Backbone to work properly
            body.id = docs.seq;

            // Insert new book
            db.get('bookcollection').insert(body, { safe: true }, function(e, docs) {
              res.writeHead({ 'Content-Type': 'application/json' });
              res.end(JSON.stringify(docs));
            });
          });
        }
        break;

      case "PUT":
          // Match URL for /books/:id
          var matches;
          if (matches = req.url.match(/\/books\/(\d+)/)) {
            db.get('bookcollection').update({ id: parseInt(matches[1], 10) }, body, function(e, docs) {
              res.writeHead({ 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true }));
            });
          }

        break;

      case "DELETE":
          // Match URL for /books/:id
          var matches;
          if (matches = req.url.match(/\/books\/(\d+)/)) {
            db.get('bookcollection').remove({ id: parseInt(matches[1], 10) }, function(e, docs) {
              console.log(docs)
              res.writeHead({ 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true }));
            });
          }

        break;

      default:
        res.statusCode = 400;
        return res.end('Error 400: Invalid HTTP method.');
    }
  });

});

server.listen(process.env.PORT || 3000);
console.log('Server listening on port 3000');
