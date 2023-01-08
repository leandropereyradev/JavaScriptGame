export class KeyHandler {
  constructor(game) {
    this.game = game;

    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowLeft" ||
          e.key === "ArrowRight" ||
          e.key === "Control" ||
          e.key === "r" ||
          e.key === " " ||
          e.key === "p" ||
          e.key === "c" ||
          e.key === "s") &&
        !this.game.keys.includes(e.key)
      ) {
        this.game.keys.push(e.key);

        if (this.game.keys.includes("Control")) {
          if (!this.game.player.isDead && !this.game.player.isWinner && !this.game.player.pause) {
            this.game.player.playerAttack();
          }
        } else if (this.game.keys.includes("c")) {
          this.game.start();

          this.game.pause = false;
        } else if (this.game.keys.includes("p")) {
          if (!this.game.pause) this.game.pauseGame();
        } else if (this.game.keys.includes("s")) location.reload();
      }
    });

    window.addEventListener("keyup", (e) => {
      if (this.game.keys.includes(e.key)) {
        this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
      }
    });
  }
}
