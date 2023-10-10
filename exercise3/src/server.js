const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const http = require("http").Server(app)
const io = require("socket.io")(http)
const host = "localhost"
const path = require("path")

app.use(express.static(__dirname + "../client"))

app.get("/", (req,res) =>{
  res.sendFile(path.join(__dirname, "../client/home.html"))
})

app.get("/global.css", (req,res) =>{
  res.sendFile(path.join(__dirname, "../client/global.css"))
})

app.get("/home.js", (req,res) =>{
  res.sendFile(path.join(__dirname, "../client/home.js"))
})

http.listen(port, host, () => {
  console.log(`Socket.IO server running at http://${host}:${port}/`);
});


io.on("connection", (socket) => {
  console.log("someone connected");
  socket.on("chat message", (msg) => { //vi lytter efter en connection
    io.emit("chat message",msg) //når den får fat i chat message, eksikverer den en funktion
  });
  socket.on("user joined", username => {
    console.log(username + "joined the chat")
    io.emit("chat message", username + " joined the chat")
  });
});
// server = app.listen(port, () => {
//   console.log(`Server open on port ${port}`);
// });
 
