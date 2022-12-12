window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const game = new Game(ctx);

  game.start();

  document.addEventListener("keydown", (e) => {
    game.player.onKeyEvent(e);
  });

  document.addEventListener("keyup", (e) => {
    game.player.onKeyEvent(e);
  });
});
