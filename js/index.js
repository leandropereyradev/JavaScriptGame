import { Game } from "./classes/game.js";

const game = new Game();

document.querySelector("#start-button").onclick = () => {
  document.querySelector(".info-container").style.display = "none";
  document.querySelector(".canvas-container").style.display = "flex";

  game.pauseGame();
};

document.addEventListener("keydown", (e) => {
  game.onKeyEvent(e);
});

document.addEventListener("keyup", (e) => {
  game.onKeyEvent(e);
});
