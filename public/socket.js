var socket = io.connect(window.location.origin, { 'forceNew': true, 'reconnection': false });

socket.on('query',function(data){
	data.forEach(function(o){
		if(o[1]==1){
			$('#'+o[0]).attr("checked",true);
		}else{
			$('#'+o[0]).attr("checked",false);
		}
	});
});
socket.on('log',function(data){
	var d = new Date();
	var date = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
	var html = $(".terminal").html() + `<div class='terminal-line'><span class='terminal-time'>${date}</span> ${data}</div>`;
	$(".terminal").html(html);

});
function query(){
	socket.emit("query",function(data){
		console.log(data);
	});
}
$(document).ready(function(){
	query();
	$("#led9").click(function(){
		query();
		socket.emit("ledOne");
	});
	$("#led10").click(function(){
		query();
		socket.emit("ledTwo");
	});
	$("#led11").click(function(){
		query();
		socket.emit("ledThree");
	});
});
