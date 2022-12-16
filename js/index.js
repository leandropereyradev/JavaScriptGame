import { Game } from "./classes/game.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const game = new Game(ctx);

  game.start();

  document.addEventListener("keydown", (e) => {
    game.onKeyEvent(e);
  });

  document.addEventListener("keyup", (e) => {
    game.onKeyEvent(e);
  });
});
