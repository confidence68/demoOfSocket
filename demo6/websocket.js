var app =require("http").createServer();
var io =require('socket.io')(app)
var PORT = 8008
var clientCount = 0
app.listen(PORT,function(){
	console.log("websocket server listening on port " + PORT)
})

io.on('connection',function(socket){
	clientCount++
	socket.nickname ="user"+clientCount
	io.emit("enter",socket.nickname +"comes in")

	socket.on('message',function(str){
		io.emit("message",socket.nickname +"say:" +str)

	})

	socket.on('disconnect',function(){
		io.emit("leave",socket.nickname +"left")
	})

})



