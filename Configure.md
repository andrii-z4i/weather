Configure mongodb:
* install mongodb;
* run mongodb;
* connect using shell (mongo);
* install node.js to run import.js;
* run `node import.js` to import data to db;
* check that data imported successfully -> connect to mongo: mongo weather 
* run 'db.cities.find({city: {$elemMatch: {$eq: "Знаменка"}}})'
* should be 
{ "_id" : ObjectId("563e5843f638ffd2b1147472"), "attitude" : 48.71278, "latitude" : 32.66472, "city" : [ "Snamenka", "Znam\"yanka", "Znam'janka", "Znamenka", "Znamenka Pervaya", "Znam”yanka", "Znomenka", "Знаменка", "Знам’янка" ], "__v" : 0 }