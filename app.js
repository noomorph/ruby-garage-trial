var redis = require('redis'),
    client = redis.createClient(),
    express = require('express'),
    fbVerify = require('./lib/fb-verify'),
    appId = '188996117830571',
    app = express().
              // use(express.logger('dev')).
              use(express.static('app')).
              use(express.query()).
              use(express.bodyParser()).
              get('/lists', function (req, res) {
                  var identity = fbVerify(req.query.signedRequest, appId);

                  if (!identity || typeof identity === "string") {
                      return res.send(401, identity || undefined);
                  }

                  client.get(identity.user_id, function (err, lists) {
                      if (err) {
                          res.json(500, err);
                      } else {
                          res.json(JSON.parse(lists || '[]'));
                      }
                  });
              }).
              put('/lists', function (req, res) {
                  var identity = fbVerify(req.query.signedRequest, appId);

                  if (!identity || typeof identity === "string") {
                      return res.send(401, identity || undefined);
                  }

                  client.set(id, JSON.stringify(req.body), function (err) {
                      if (err) {
                          res.json(500, err);
                      } else {
                          res.send(200);
                      }
                  });
              }).
              listen(80);

client.on("error", function (err) {
    console.log("Error " + err);
});

