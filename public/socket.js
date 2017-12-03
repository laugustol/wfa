var socket = io.connect('http://localhost:8080', { 'forceNew': true });
console.log(socket);
$(document).ready(function(){
	$("#led9").click(function(){
		socket.emit("ledOne");
	});
	$("#led10").click(function(){
		socket.emit("ledTwo");
	});
	$("#led11").click(function(){
		socket.emit("ledThree");
	});
});