var ws = require("nodejs-websocket")
var PORT = 8008
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")
	conn.on("text", function (str) {
		console.log("Received "+str)
		conn.sendText(str)
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})
	conn.on("error", function (err) {
		console.log("hander");
		console.log(err)

	})
}).listen(PORT)

console.log("websocket server listening on port " + PORT)