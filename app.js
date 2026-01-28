const ws = new WebSocket("wss://ido.onrender.com");

const player = prompt("Enter your name");
const room = prompt("Room code");

let lastDice = null; // 🎲 last dice from server

const statusEl = document.getElementById("status");
const board = document.getElementById("board");

/* 🧱 CREATE BOARD (0–57 cells) */
for (let i = 0; i <= 57; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.id = `cell-${i}`;
  board.appendChild(cell);
}

/* 🎨 RENDER TOKENS (SINGLE TOKEN PER PLAYER) */
function render(positions) {
  // clear old tokens
  document.querySelectorAll(".token").forEach(t => t.remove());

  for (const p in positions) {
    const pos = positions[p];
    if (pos < 0) continue;

    const cell = document.getElementById(`cell-${pos}`);
    if (!cell) continue;

    const token = document.createElement("div");
    token.className = "token";
    token.title = p; // hover name
    cell.appendChild(token);
  }
}

/* 🟢 JOIN ROOM */
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: "join",
    room,
    player
  }));
};

/* 🟣 RECEIVE FROM SERVER */
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "info") {
    statusEl.innerText = data.msg;
  }

  if (data.type === "dice") {
    lastDice = data.dice;

    statusEl.innerText =
      `${data.player} rolled ${data.dice}\nNext turn: ${data.next}`;

    render(data.positions); // 👈 BOARD UPDATE
  }

  if (data.type === "win") {
    alert(`🏆 ${data.player} WON THE GAME!`);
  }
};

/* 🎲 ROLL BUTTON */
document.getElementById("roll").onclick = () => {
  ws.send(JSON.stringify({
    type: "roll",
    room,
    player
  }));
};
