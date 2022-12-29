import { CANVAS_HEIGHT, CANVAS_WIDTH, CTX } from "../utils/constants.js";
import { Info } from "./info.js";

export class DisplayInfo {
  constructor() {
    this.bats_Freed = 0;
    this.monsters_Killed = 0;
    this.name = "";

    this.bats = new Info(15, 30);
    this.monster_killed = new Info(15, 90);
    this.spider_Web = new Info(770, 395);
    this.ghost_dead = new Info();
    this.ghost_dead_keys = new Info();
    this.ghost_won = new Info();

    this.paused = new Info();
    this.paused_keys = new Info();

    this.customFont = new FontFace("ghost", "url(src/fonts/ghost_Nest.ttf)");
    this.customFont.load().then(function (font) {
      document.fonts.add(font);
    });
  }
  displaying() {
    CTX.fillStyle = "white";
    CTX.font = "60px ghost";

    this.batsFreed();
    this.monstersKilled();
    this.spiderWeb();
  }

  batsFreed() {
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
      xPosition: CANVAS_WIDTH / 2 - this.ghost_dead.widthImg / 2,
      yPosition: CANVAS_HEIGHT / 2 - this.ghost_dead.heightImg / 2,
    };
    this.ghost_dead.draw();

    this.ghost_dead_keys.switchSprite("GhostDeadKeys");
    this.ghost_dead_keys.position = {
      xPosition: CANVAS_WIDTH / 2 - this.ghost_dead_keys.widthImg / 2,
      yPosition: CANVAS_HEIGHT / 2 - this.ghost_dead_keys.heightImg / 2,
    };
    this.ghost_dead_keys.draw();
  }

  ghostWon() {
    CTX.fillStyle = "rgba(0, 0, 0, 0.5)";
    CTX.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.ghost_won.switchSprite("GhostWon");
    this.ghost_won.position = {
      xPosition: CANVAS_WIDTH / 2 - this.ghost_won.widthImg / 2,
      yPosition: CANVAS_HEIGHT / 2 - this.ghost_won.heightImg / 2,
    };
    this.ghost_won.draw();

    CTX.fillStyle = "white";
    CTX.fillText(`${this.name}!`, 650, 260);
    CTX.fillText(this.bats_Freed, 165, 398);
    CTX.fillText(this.monsters_Killed, 165, 450);
  }

  gamePaused() {
    CTX.fillStyle = "rgba(0, 0, 0, 0.5)";
    CTX.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.paused.switchSprite("GamePaused");
    this.paused.position = {
      xPosition: CANVAS_WIDTH / 2 - this.paused.widthImg / 2,
      yPosition: CANVAS_HEIGHT / 2 - this.paused.heightImg / 2,
    };
    this.paused.draw();

    this.paused_keys.switchSprite("GamePausedKeys");
    this.paused_keys.position = {
      xPosition: CANVAS_WIDTH / 2 - this.paused_keys.widthImg / 2,
      yPosition: CANVAS_HEIGHT / 2 - this.paused_keys.heightImg / 2,
    };
    this.paused_keys.draw();
  }
}
