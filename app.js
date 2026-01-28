const ws = new WebSocket("ws://10.117.14.150:8765");

const player = prompt("Enter your name");
const room = prompt("Room code");

let lastDice = null; // 🎲 server se aaya last dice

// 🟢 JOIN
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: "join",
    room,
    player
  }));
};

// 🟣 RECEIVE
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "info") {
    document.getElementById("status").innerText = data.msg;
  }

  if (data.type === "dice") {
    lastDice = data.dice;

    document.getElementById("status").innerText =
      `${data.player} rolled ${data.dice}
Next turn: ${data.next}`;

    // optional: show positions
    console.log("Positions:", data.positions);
  }
};

// 🎲 ROLL BUTTON
document.getElementById("roll").onclick = () => {
  ws.send(JSON.stringify({
    type: "roll",
    room,
    player
  }));
};

// 🎯 TOKEN SELECT (PART B)
function moveToken(tokenIndex) {
  if (lastDice === null) {
    alert("Roll dice first!");
    return;
  }

  ws.send(JSON.stringify({
    type: "move",
    room,
    player,
    token: tokenIndex
  }));
    }
