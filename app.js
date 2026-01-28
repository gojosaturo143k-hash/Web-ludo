const ws = new WebSocket("ws://10.117.14.150:8765");

const player = prompt("Enter your name");
const room = prompt("Room code");

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: "join",
    room,
    player
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "info") {
    alert(data.msg);
  }

  if (data.type === "chat") {
    console.log("Chat:", data.msg);
  }

  if (data.type === "dice") {
    document.getElementById("status").innerText =
      `${data.player} rolled ${data.dice}
Next turn: ${data.next}`;
  }
};

document.getElementById("roll").onclick = () => {
  ws.send(JSON.stringify({
    type: "roll",
    room,
    player
  }));
};
