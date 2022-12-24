import { Game } from "./classes/game.js";

const game = new Game();

game.start();

document.addEventListener("keydown", (e) => {
  game.onKeyEvent(e);
});

document.addEventListener("keyup", (e) => {
  game.onKeyEvent(e);
});
