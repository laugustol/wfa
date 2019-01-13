var express = require('express');
var five = require ('johnny-five');
var app = express();
var socketIO = require('socket.io')(app.listen(8080));
var notification = 0;
app.use(express.static('public'));
app.set("view engine","jade");

app.get('/', function (req,res) { 
  	res.render("index");
});
app.get('/api/connect', function (req,res) { 
  	res.send('1');
});
app.get('/api/addNotification', function (req,res) { 
	console.log("addNotification");
	notification = 1;
  	res.send('1');
});
app.get('/api/queryNotification', function (req,res) { 
	if( notification==1 ){
		console.log("queryNotification1");
		notification = 0;
		res.send('1');	
	}else{
		console.log("queryNotification0");
		res.send('1');	
	}
});

var board = new five.Board({
  	repl:false
});
var html = "";
function log(data){
	var d = new Date();
	var date = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
	html += `<div class='terminal-line'><span class='terminal-time'>${date}</span> ${data}</div>`;
	return html;
}

board.on("ready", function() {
  //var leds = new five.Leds([9, 12, 10]);
  var statusOne=0,statusTwo=0,statusThree=0;
  socketIO.on('connection',function(io){
  	io.emit("log", log('Connection with the client'));
  	io.on("query",function(){
  		io.emit("query",[["led9",statusOne], ["led10",statusTwo], ["led11",statusThree]]);
  	});
  	io.on("ledOne",function(){
		if(!statusOne){
			//leds[0].on();
			statusOne=1;
			
            var pin9 = new five.Pin(9);
            pin9.write( state = 0x01);
            pin9.query(function(state){
                console.log(state);
            });

		  	log('Aire(9/GND) ON');
			io.emit("log","Aire(9/GND) ON");
		}else{
			//leds[0].off();
			statusOne=0;

			var pin9 = new five.Pin(9);
            pin9.write( state = 0x00);
            pin9.query(function(state){
                console.log(state);
            });

			log('Aire(9/GND) OFF');
			io.emit("log","Aire(9/GND) OFF");
		}
  	});
  	io.on("ledTwo",function(){
		if(!statusTwo){
			//leds[1].on();
			statusTwo=1;

			var pin12 = new five.Pin(12);
            pin12.write( state = 0x01);
            pin12.query(function(state){
                console.log(state);
            });

			log('Aire(10/GND) ON');
			io.emit("log","Luz(10/GND) ON");
		}else{
			//leds[1].off();
			statusTwo=0;

			var pin12 = new five.Pin(12);
            pin12.write( state = 0x00);
            pin12.query(function(state){
                console.log(state);
            });

			log('Aire(10/GND) OFF');
			io.emit("log","Luz(10/GND) OFF");
		}  		
  	});
  	io.on("ledThree",function(){
		if(!statusThree){
			leds[2].on();
			statusThree=1;
		}else{
			leds[2].off();
			statusThree=0;
		}  		
  	});
  });
});
console.log("Server ON Listen 8080");
