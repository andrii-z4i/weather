var fs = require('fs');
var mongoose = require('mongoose');

fs.readFile('cities.json', 'utf8', function(err, data) {
    console.log('opened');
    var _parsed_data = JSON.parse(data);
    mongoose.connect('mongodb://localhost/weather');

    var CitySchema = new mongoose.Schema({
        city: [String],  
        attitude: Number,
        latitude: Number 
    });
   
    var CityModel = mongoose.model('City', CitySchema);

    var total = _parsed_data.cities.length;
    var saved_number = 0;
    var errors = 0;
    for (var i = _parsed_data.cities.length - 1; i >= 0; i--) {
        var concreteCity = new CityModel({
            city : _parsed_data.cities[i].city,
            attitude : _parsed_data.cities[i].attitude,
            latitude : _parsed_data.cities[i].latitude
        }); 
        concreteCity.save(function(err){
            saved_number++;
            if (saved_number === total) {
                mongoose.disconnect();
                console.error(errors);
            }
            if (err) {
                errors++;
                return console.error(err);
            }
        });
    }
    console.log('finished');
});

