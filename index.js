var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000))


app.get('/', function(request, response){
	response.send("success");
});

app.get('/game.js', function(request, response){
	fs.openSync(__dirname + "/public/game.js", 'w');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})