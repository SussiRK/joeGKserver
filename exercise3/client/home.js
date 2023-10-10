const socket = io();
input = document.getElementById("input")
messages = document.getElementById("messages")

let username = "Anonymous"
if(localStorage.getItem("username") != null) { //hvis de allerede har et username
    username = localStorage.getItem("username");
};

socket.emit("user joined", username);

function changeUsername(){
    username = getElementById("username").value;
    socket.emit("user joined", username);
};

function sendChat(){
    if(input.value){
        socket.emit("chat message", username + ": " + input.value)
    }
    input.value = "";
};

socket.on("chat message", (msg) => {
    const item = document.createElement("li")
    item.textContent = msg
    messages.appendChild(item)
})