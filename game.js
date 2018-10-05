// initialization
var socket = new WebSocket("wss://node2.wsninja.io"), space, me, qs = document.querySelector.bind(document), players;

socket.onopen = event => {
    // Connection opened, send client GUID to autenticate with wsninja server.
    socket.send(JSON.stringify({ guid: "947bb5ca-125b-45cd-952d-be8c693cde71" }));
};

// Listen for websocket messages.
socket.addEventListener('message', function(event) {
    var message = JSON.parse(event.data);
    if (message.accepted === true) {
        players = [];
    } else {
        HandleRecieve(message);
    }
});

window.onload = loadEvent => {
  space = qs('.game');
  qs('#join-btn').onclick = Join;
}

//
function HandleRecieve(data) {
  console.log(data);
}

// wrap for sending
function Send(obj) {
  socket.send(JSON.stringify(obj));
}

function Join(e) {
  Send({join: qs('#namein').value});
  qs('.pop').style.display = 'none';
  document.documentElement.webkitRequestFullscreen();
}

function Update() {

}

class Player {
  constructor(name, id) {
    this.name = name;
    this.pos = [0,0];
    this.El = document.createElement('DIV');
    this.El.innerHTML = name;
    this.El.setAttribute('id', id);
    this.El.setAttribute('class', 'player');
    space.append(this.El);
  }

  Update(vec) {
    this.pos = vec[0];

    this.El.style.left = this.pos[0] + 'px';
    this.El.style.right = this.pos[1] + 'px';
  }
}
