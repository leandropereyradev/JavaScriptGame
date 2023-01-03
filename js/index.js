import { Game } from "./classes/game.js";
import { sounds } from "./utils/sounds.js";

// let context;
// window.onload = function () {
//   context = new AudioContext();
// };

const game = new Game();
let gameStarted = false;

document.querySelector("#start-button").onclick = () => {
  // context.resume().then(() => {
  //   console.log("Playback resumed successfully");
  // });

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

  gameStarted = true;

  sounds.backgoundSound.play();
  game.pauseGame();
};

document.addEventListener("keydown", (e) => {
  if (gameStarted) game.onKeyEvent(e);
});

document.addEventListener("keyup", (e) => {
  if (gameStarted) game.onKeyEvent(e);
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
