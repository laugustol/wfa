var express = require('express');
var five = require ('johnny-five');
var app = express();
var socketIO = require('socket.io')(app.listen(8080));

app.use(express.static('public'));
app.set("view engine","jade");

app.get('/', function (req,res) { 
  	res.render("index");
});

var board = new five.Board({
  	repl:false
});
 
board.on("ready", function() {
  var leds = new five.Leds([9, 10, 11]);
  var statusOne,statusTwo,statusThree=0;
  socketIO.on('connection',function(io){
  	console.log("Connection with the client");
  	io.on("ledOne",function(){
		if(!statusOne){
			leds[0].on();
			statusOne=1;
		}else{
			leds[0].off();
			statusOne=0;
		}  		
  		console.log("ledOne");
  	});
  	io.on("ledTwo",function(){
  		leds[1].blink(300);
  		console.log("ledTwo");
  	});
  	io.on("ledThree",function(){
  		leds[2].blink(300);
  		console.log("ledThree");
  	});
  });
});

console.log("Server ON");
