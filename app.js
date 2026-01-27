const room = prompt("Enter room code");
const ws = new WebSocket("ws://YOUR_SERVER_IP:8765");

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: "join",
    room: room
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "info") {
    alert(data.msg);
  }

  if (data.type === "chat") {
    console.log("MSG:", data.msg);
  }
};

document.getElementById("roll").onclick = () => {
  ws.send(JSON.stringify({
    type: "message",
    msg: "Dice rolled 🎲"
  }));
};
