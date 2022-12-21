import { Chars } from "./chars.js";
import { Background } from "./background.js";
import { SpiritBombs } from "./spiritBombs.js";
import { Monsters } from "./monsters.js";
import { Bats } from "./bats.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../utils/constants.js";
import { Cages } from "./cages.js";
import { Hearts } from "./hearts.js";
import { Boss } from "./boss.js";

export class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.interval = null;

    this.player = new Chars(ctx);
    this.spiritBombs = [];
    this.hearts = new Hearts(this.ctx);
    this.liveAccumulator = 0;
    this.isFinal = false;

    this.boss = new Boss(this.ctx);
    this.monsters = [];
    this.monstersKilled = 0;
    this.tickMonster = Math.floor(Math.random() * 500) + 100;

    this.bats = [];
    this.cagesFront = [];
    this.cagesBack = [];
    this.woodsChain = [];
    this.batFreed = 0;
    this.tickBat = 60;

    //Background
    this.imgBackground = new Image();
    this.imgBackground.src = "../../src/img/background/sky.png";
    this.sizeBg = 1865;
    this.sizeMoon = 300;
    this.bgSpeed = 1;
    this.bgSpeedControlled = 1;

    this.imgSrc1 = "../../src/img/background/moon.png";
    this.moon = new Background(ctx, CANVAS_WIDTH, 0, this.imgSrc1, this.bgSpeed * 0.07, null, this.sizeMoon, false);

    this.imgSrc2 = "../../src/img/background/background3.png";
    this.bg1 = new Background(ctx, 0, 30, this.imgSrc2, this.bgSpeedControlled * 0.1, this.sizeBg, this.sizeBg, true, false, true);

    this.imgSrc3 = "../../src/img/background/background2.png";
    this.bg2 = new Background(ctx, 0, 40, this.imgSrc3, this.bgSpeedControlled * 0.3, this.sizeBg, this.sizeBg, true, false, true);

    this.imgSrc4 = "../../src/img/background/clouds.png";
    this.clouds = new Background(ctx, 0, 60, this.imgSrc4, this.bgSpeed * 0.8, this.sizeBg, this.sizeBg, true);

    this.imgSrc4b = "../../src/img/background/clouds.png";
    this.clouds2 = new Background(ctx, 400, 250, this.imgSrc4b, this.bgSpeed * 0.1, this.sizeBg, this.sizeBg, true, true);

    this.imgSrc5 = "../../src/img/background/background1.png";
    this.bg3 = new Background(ctx, 0, 56, this.imgSrc5, this.bgSpeedControlled * 0.5, this.sizeBg, this.sizeBg, true, false, true);

    this.imgSrc6 = "../../src/img/background/floor.png";
    this.floor = new Background(
      ctx,
      0,
      CANVAS_HEIGHT - 100,
      this.imgSrc6,
      this.bgSpeedControlled * 0.8,
      this.sizeBg,
      this.sizeBg,
      true,
      false,
      true
    );

    this.decorations = [this.moon, this.bg1, this.clouds, this.bg2, this.clouds2, this.bg3, this.floor];
  }

  start() {
    this.interval = setInterval(() => {
      this.clear();

      this.draw();

      this.checkBombAndMonster();

      this.woodsChain.forEach((woodChain) => {
        woodChain.draw();
        woodChain.movement();
      });

      this.cagesBack.forEach((cage) => {
        cage.draw();
        cage.movement();
      });

      this.bats.forEach((bat) => {
        bat.draw();
        bat.animateFrames();
        bat.movement();
      });

      this.cagesFront.forEach((cage) => {
        cage.draw();
        cage.movement();
      });

      this.monstersAppears();

      this.monsters.forEach((monster) => {
        monster.draw();
        monster.animateFrames();
        monster.movement();
      });

      this.spiritBombs.forEach((bomb) => {
        bomb.draw();
        bomb.animateFrames();
        bomb.move();
      });

      this.checkCollisionsMonsters();

      this.batsAppears();
      this.checkBombAndCage();

      this.bossAppear();

      this.spiritBombs = this.spiritBombs.filter((bomb) => !bomb.isSpiritBombCollided);

      this.player.charAnimations();
    }, 1000 / 60);
  }

  draw() {
    this.ctx.drawImage(this.imgBackground, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.decorations.forEach((decoration) => {
      decoration.draw();
      decoration.animate();
    });

    if (this.isFinal) {
      this.boss.draw();
      if (this.boss.isBossAppear) {
        this.boss.animateFrames();
        this.boss.movement();
      }
    }

    this.hearts.draw(this.player.lives);

    this.displayStatus();
  }

  clear() {
    this.ctx.clearRect(this.x, this.y, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  pause() {
    clearInterval(this.interval);
  }

  playerAttack() {
    const x = this.player.xPosition + 50;
    const y = this.player.yPosition - 20;
    const spiritBomb = new SpiritBombs(this.ctx, x, y);
    this.spiritBombs.push(spiritBomb);
  }

  monstersAppears() {
    this.tickMonster--;

    if (this.tickMonster <= 0) {
      this.tickMonster = Math.floor(Math.random() * 1000) + 700;
      const randomStop = Math.floor(Math.random() * (1200 - 100) + 100);
      if (!this.isFinal) {
        const monster = new Monsters(this.ctx, randomStop);
        this.monsters.push(monster);
      }
    }

    this.monsters = this.monsters.filter((monster) => !monster.isMonsterOut);
  }

  batsAppears() {
    this.tickBat--;

    if (this.tickBat <= 0) {
      this.tickBat = Math.floor(Math.random() * 800) + 300;

      const bats = [3, 4, 5];
      const selectBat = () => {
        let number = Math.floor(Math.random() * bats.length);
        return number;
      };
      let position = selectBat();
      let number = bats[position];

      if (!this.isFinal) {
        const bat = new Bats(this.ctx, number, crypto.randomUUID());
        this.bats.push(bat);

        const cageFront = new Cages(this.ctx, 1, 994, 260);
        this.cagesFront.push(cageFront);

        const cageBack = new Cages(this.ctx, 0, 994, 260);
        this.cagesBack.push(cageBack);

        const woodChain = new Cages(this.ctx, 6, 1007, 115);
        this.woodsChain.push(woodChain);
      }
    }

    this.bats = this.bats.filter((bat) => !bat.isBatOut);

    this.cagesFront = this.cagesFront.filter((cage) => !cage.isCageOut);

    this.cagesBack = this.cagesBack.filter((cage) => !cage.isCageOut);

    this.woodsChain = this.woodsChain.filter((woodChain) => !woodChain.isCageOut);
  }

  bossAppear() {
    if (this.batFreed >= 1) {
      this.isFinal = true;
      if (!this.monsters.length && !this.cagesFront.length) {
        this.boss.isBossAppear = true;
        setTimeout(() => {
          this.decorations.forEach((bg) => {
            if (bg.controled) bg.backgroundSpeed = 0;
          });
        }, 4000);
        if (this.boss.xPosition <= 750) {
          this.boss.initialState = 2;
          this.boss.speed = 0;
        }
      }
    }
  }

  checkCollisionsMonsters() {
    if (!this.player.isDone) {
      this.monsters.forEach((monster) => {
        if (!monster.isNotAttacking) {
          const dx = monster.xPosition - this.player.xPosition - 5;
          const dy = monster.yPosition() - this.player.yPosition;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < monster.width / 2 + this.player.width / 2) {
            if (!this.player.isDead && this.player.lives > 0) {
              monster.initialState = 1;
              monster.distanceFloor = 190;
              monster.speed = 1.3;
              this.player.xPosition -= 200;
              this.player.takedHit = true;

              setTimeout(() => {
                monster.initialState = 0;
                monster.distanceFloor = 175;
              }, 300);

              this.player.lives -= 1;

              if (this.player.lives === 0) {
                this.player.isDead = true;
                this.player.initialState = 6;
              }
            }
          }
        }
      });
    }
  }

  checkBombAndMonster() {
    this.monsters.forEach((monster) => {
      if (!monster.isMonsterKilled) {
        this.spiritBombs.forEach((bomb) => {
          if (monster.xPosition <= bomb.xPosition + 50 && monster.xPosition + monster.width >= bomb.xPosition) {
            bomb.isSpiritBombCollided = true;
            monster.lives -= 1;
          }
        });
        if (monster.lives === 0) {
          monster.initialState = 2;
          monster.distanceFloor = 175;
          monster.speed = 0;
          monster.isNotAttacking = true;
          this.monstersKilled += 1;
          monster.isMonsterKilled = true;
          setTimeout(() => {
            this.monsters = this.monsters.filter((monster) => !monster.isMonsterKilled);
          }, 1000);
        }
      }
    });
  }

  checkBombAndCage() {
    this.spiritBombs.forEach((bomb) => {
      this.cagesFront.forEach((cage) => {
        this.bats.forEach((bat) => {
          if (!cage.isCageOpen) {
            const colX = cage.xPosition + 50 < bomb.xPosition + bomb.width && cage.xPosition + 50 + cage.width > bomb.xPosition;

            const colY = cage.yPosition < bomb.yPosition + bomb.height && cage.yPosition + cage.height - 80 > bomb.yPosition;

            if (colX && colY) {
              cage.hard -= 1;
              bomb.isSpiritBombCollided = true;

              if (cage.hard === 0) {
                cage.isCageOpen = true;
                bat.speed = 2;
                bat.isBatFreed = true;
                this.batFreed += 1;

                if (this.player.lives < 10) this.liveAccumulator += 1;

                if (this.liveAccumulator >= 5 && this.player.lives <= 9) {
                  this.player.lives += 1;
                  this.liveAccumulator = 0;
                }
              }
            }
          }
        });
      });
    });
  }

  displayStatus() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Helvetica";
    this.ctx.fillText("Monsters Killed: " + this.monstersKilled, 20, 50);
    this.ctx.fillText("Bats Freed: " + this.batFreed, 20, 80);
  }

  gameOver() {}

  onKeyEvent(event) {
    if (event) {
      switch (event.type) {
        case "keydown":
          switch (event.key) {
            case "ArrowLeft":
              this.player.key = event.key;
              // this.bgSpeedControlled = 0
              break;
            case "ArrowRight":
              this.player.key = event.key;
              break;
            case "Control":
              this.player.key = event.key;
              break;
            case "r":
              if (this.player.isDone) this.player.key = event.key;
              break;
            case " ":
              this.player.key = event.key;
              break;
            case "p":
              this.pause();
              break;
            case "c":
              this.start();
              break;
            case "s":
              location.reload();
              break;
          }
          break;
        case "keyup":
          switch (event.key) {
            case " ":
            case "p":
            case "c":
            case "s":
            case "ArrowLeft":
            case "ArrowRight":
              this.player.key = "";
              this.bgSpeedControlled = 0;
              break;
            case "Control":
              if (!this.player.isDone) this.playerAttack();
          }
          break;
      }
    }
  }
}
