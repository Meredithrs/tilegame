// index.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var api = express.Router();              // get an instance of the express Router

api.use(function(req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
});

api.route('/maps/:x/:y').get(function(req, res){
	var maps	=	require("./models/maps.js");
	maps.setCoordinates(req.params.x, req.params.y);
	res.json({"terrain": maps.getTerrain(), "objects": maps.getObjects()});
});

app.use(express.static(__dirname + '/public'));

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', api);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);