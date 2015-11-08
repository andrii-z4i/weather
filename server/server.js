var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
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
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:57013');
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
        CityModel.find({city: {$elemMatch: {$eq: _cityToSearch}}}, function(err, result){
            if (err) {
                res.end(JSON.stringify({error: err}));
            }
            else {
                console.log(result);
                res.end(JSON.stringify({results: result}));
            }
        });
        return;
    }
    res.end(JSON.stringify(object));
});

app.get('forecast/:attitude/:latitude', function(req, res){

    res.end({temperature: 22});
});

var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})
