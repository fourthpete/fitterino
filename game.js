// initialization
var socket = new WebSocket("wss://node2.wsninja.io"), space;

socket.onopen = event => {
    // Connection opened, send client GUID to autenticate with wsninja server.
    socket.send(JSON.stringify({ guid: "947bb5ca-125b-45cd-952d-be8c693cde71" }));
};

// Listen for websocket messages.
socket.addEventListener('message', function(event) {
    var message = JSON.parse(event.data);
    if (message.accepted === true) {
      //TODO some join code
    } else {
        HandleRecieve(message);
    }
});

window.onload = loadEvent => {
  space = document.querySelector('.game');
}

//
function HandleRecieve(data) {
  console.log(data);
}

// wrap for sending
function Send(obj) {
  socket.send(JSON.stringify(obj));
}
