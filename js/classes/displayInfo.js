import { CANVAS_HEIGHT, CANVAS_WIDTH, CTX } from "../utils/constants.js";
import { Info } from "./info.js";

export class DisplayInfo {
  constructor() {
    this.bats_Freed = 0;
    this.monsters_Killed = 0;
    this.score = 0;
    this.name = "";
    this.centerText = CANVAS_WIDTH / 2;

    this.bats = new Info(15, 30);
    this.monster_killed = new Info(15, 90);
    this.spider_Web = new Info(770, 395);
    this.ghost_dead = new Info();
    this.ghost_dead_keys = new Info();
    this.ghost_won = new Info();

    this.paused = new Info();
    this.paused_keys = new Info();

    this.customFont = new FontFace("ghost", "url(src/fonts/ghost_Nest.ttf)");
    this.customFont.load().then((font) => {
      document.fonts.add(font);
    });
  }
  displaying() {
    CTX.fillStyle = "white";
    CTX.font = "40px ghost";
    this.scorePoints();

    CTX.font = "60px ghost";
    this.batsFreed();
    this.monstersKilled();
    this.spiderWeb();
  }

  scorePoints() {
    CTX.textAlign = "center";
    CTX.fillText(`Ghostcores: ${this.score}`, this.centerText, 40);
  }

  batsFreed() {
    CTX.textAlign = "start";

    this.bats.switchSprite("Bats");
    this.bats.draw();
    CTX.fillText(this.bats_Freed, 70, 60);
  }

  monstersKilled() {
    this.monster_killed.switchSprite("Monsters");
    this.monster_killed.draw();
    CTX.fillText(this.monsters_Killed, 70, 120);
  }

  spiderWeb() {
    this.spider_Web.switchSprite("SpiderWeb");
    this.spider_Web.draw();
  }

  ghostIsDead() {
    CTX.fillStyle = "rgba(0, 0, 0, 0.5)";
    CTX.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.ghost_dead.switchSprite("GhostDead");
    this.ghost_dead.position = {
      xPosition: this.centerText - this.ghost_dead.widthImg / 2,
      yPosition: CANVAS_HEIGHT / 2 - this.ghost_dead.heightImg / 2,
    };
    this.ghost_dead.draw();

    this.ghost_dead_keys.switchSprite("GhostDeadKeys");
    this.ghost_dead_keys.position = {
      xPosition: this.centerText - this.ghost_dead_keys.widthImg / 2,
      yPosition: CANVAS_HEIGHT / 2 - this.ghost_dead_keys.heightImg / 2,
    };
    this.ghost_dead_keys.draw();
  }

  ghostWon() {
    CTX.fillStyle = "rgba(0, 0, 0, 0.5)";
    CTX.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    CTX.fillStyle = "white";
    CTX.textAlign = "center";
    CTX.font = "120px ghost";
    CTX.fillText("Wonder Ghost has won!", this.centerText, 100);

    CTX.font = "80px ghost";
    CTX.fillText(`Thanks for your help, ${this.name}!`, this.centerText, 190);

    CTX.font = "70px ghost";
    CTX.fillText("Julius Motauski has been defeated!", this.centerText, 280);

    CTX.font = "60px ghost";
    CTX.fillText(`Ghostcores: ${this.score}`, this.centerText, 360);
    CTX.fillText(`Bats released: ${this.bats_Freed}`, this.centerText, 420);
    CTX.fillText(`Rockstars zombies: ${this.monsters_Killed}`, this.centerText, 480);

    CTX.font = "80px ghost";
    CTX.fillText(`Don't buy bats! Adopt them!`, this.centerText, 560);
  }

  gamePaused() {
    CTX.fillStyle = "rgba(0, 0, 0, 0.5)";
    CTX.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.paused.switchSprite("GamePaused");
    this.paused.position = {
      xPosition: this.centerText - this.paused.widthImg / 2,
      yPosition: CANVAS_HEIGHT / 2 - this.paused.heightImg / 2,
    };
    this.paused.draw();

    this.paused_keys.switchSprite("GamePausedKeys");
    this.paused_keys.position = {
      xPosition: this.centerText - this.paused_keys.widthImg / 2,
      yPosition: CANVAS_HEIGHT / 2 - this.paused_keys.heightImg / 2,
    };
    this.paused_keys.draw();
  }

  bossAppears() {
    CTX.fillStyle = "rgba(0, 0, 0, 0.5)";
    CTX.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    CTX.fillStyle = "white";
    CTX.textAlign = "center";
    CTX.font = "80px ghost";
    CTX.fillText(`${this.name}! Be careful, please!`, this.centerText, 110);

    CTX.font = "120px ghost";
    CTX.fillText("Julius Motauski", this.centerText, 230);

    CTX.font = "80px ghost";
    CTX.fillText("has appears!", this.centerText, 300);

    CTX.font = "60px ghost";
    CTX.fillText(`But don't worry, ${this.name}!`, this.centerText, 390);
    CTX.fillText("The strength of the spirits and", this.centerText, 480);
    CTX.fillText("and the agility of the bats are with us!", this.centerText, 540);
  }
}
