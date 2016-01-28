var http = require('http');
var info = require('./lib/info/info.js');
var shortenerdb = require('./lib/shortenerdb/shortenerdb.js');

var server = http.createServer(function(req, res) {
  //if no parameters -> send info page
  if (req.url === '/') {
    info(req, res);
  } else if (req.url.indexOf('/new/') === 0) {
    // url insertion
    var allowInvalid = false;
    var original = '';

    // check if invalid urls are allowed
    if (req.url.indexOf('?allow=true') === (req.url.length - '?allow=true'.length)) {
      allowInvalid = true;
      original = req.url.substring(5, req.url.length - '?allow=true'.length);
    } else {
      original = req.url.substr(5);
    }

    data = {
      original_url: original
    };

    try { // I'm codifying the index in base 36 to reduce space
      data.short_url = 'http://localhost/' +
        shortenerdb.addUrl(original, allowInvalid).toString(36);
    } catch (e) {
      data = {
        error: "URL invalid"
      };
    } finally {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(data), 'utf-8');
    }

  } else { // url retrival
    //check if the parameter is a valid shortened URL
    try {
      var url = shortenerdb.getUrl(parseInt(req.url.substr(1), 36));
      res.writeHead(302, {
        'Location': url
      });
      res.end();
    } catch (e) {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify({
        error: "No short url found for given input"
      }), 'utf-8');
    }
  }
});

server.listen((process.env.PORT || 5000), function() {
  console.log("Server URL Shortener listening on port: %s", (process.env.PORT || 5000));
});
