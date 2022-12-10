const ctx = document.getElementById("canvas");

const game = new Game(ctx);

game.start();

document.addEventListener("keydown", (e) => {
  game.player.onKeyEvent(e);
});

document.addEventListener("keyup", (e) => {
  game.player.onKeyEvent(e);
});
