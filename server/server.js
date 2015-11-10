var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var https = require('https');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

var connection = mongoose.connection;
var connected = false;
connection.on('error', function(err) {console.error(err)});
connection.once('open', function(){
    console.log('connected');
    connected = true;
});

mongoose.connect('mongodb://localhost/weather');

var CitySchema = new mongoose.Schema({
    city: [String],  
    attitude: Number,
    latitude: Number 
});

var CityModel = mongoose.model('City', CitySchema);

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get('/city/:city', function(req, res){
    var object = {};
    if (connected == false) {
        object = {error: 'can\'t connect to database'};
    }
    else if (req.params.city === undefined) {
        object = {error: 'search is undefined'};

    } else {
        var _cityToSearch = req.params.city;
        console.log(_cityToSearch);
        CityModel.find({city: {$elemMatch: {$gte: _cityToSearch, $lte: _cityToSearch}}}, function(err, result){
            if (err) {
                res.end(JSON.stringify({error: err}));
            }
            else {
                res.end(JSON.stringify({results: result}));
            }
        });
        return;
    }
    res.end(JSON.stringify(object));
});

app.get('/forecast/:attitude/:latitude', function(req, response){
    var forecastRequestOptions = {
        hostname: 'api.forecast.io',
        port: 443,
        path: '/forecast/74eee671c24e24a04f85929168194a9e/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    forecastRequestOptions.path += req.params.attitude + ',' + req.params.latitude;
    var req = https.request(forecastRequestOptions, function(res) {
          res.setEncoding('utf8');
          var fullBody = '';
          res.on('data', function (chunk) {
            fullBody += chunk;
          });
          res.on('end', function() {
            response.end(fullBody);
          })
    });
    req.on('error', function(e) {
        response.end(JSON.stringify({error: e}));
    });
    req.end();
});

var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})
