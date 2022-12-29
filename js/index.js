import { Game } from "./classes/game.js";

const game = new Game();

document.querySelector("#start-button").onclick = () => {
  const name = prompt("Please enter your name");
  const nameFixed = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);

  if (nameFixed != "") {
    game.namePlayer = nameFixed;
  } else {
    game.namePlayer = "Stranger";
  }

  document.querySelector(".info-container").style.display = "none";
  document.querySelector(".canvas-container").style.display = "Flex";
  document.querySelector(".footer").style.position = "absolute";

  game.pauseGame();
};

document.addEventListener("keydown", (e) => {
  game.onKeyEvent(e);
});

document.addEventListener("keyup", (e) => {
  game.onKeyEvent(e);
});

const scoreElement = document.getElementById("score");

const scoreStoraged = JSON.parse(localStorage.getItem("score"));

let number = 0;

scoreStoraged.forEach((store) => {
  const newDiv = document.createElement("div");
  newDiv.className = "table-storage";
  newDiv.innerHTML = `
    <div><p>${(number += 1)}</p></div>
    <div><p>${store.name}</p></div>
    <div><p>${store.bats}</p></div>
    <div><p>${store.zombies}</p></div>`;

  scoreElement.appendChild(newDiv);
});
