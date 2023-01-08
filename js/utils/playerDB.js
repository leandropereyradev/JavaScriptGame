const PLAYERDBR = {
  Idle: {
    image: "../../src/img/player/player_idle_right.png",
    totalFrames: 6,
    frameBuffer: 9,
    scale: 1.2,
  },
  Run: {
    image: "../../src/img/player/player_run_right.png",
    totalFrames: 6,
    frameBuffer: 7,
    scale: 1.4,
  },
  Attack: {
    image: "../../src/img/player/player_attack_right.png",
    scale: 1.2,
    totalFrames: 11,
    frameBuffer: 6,
  },
  Bomb: {
    image: "../../src/img/player/player_bomb.png",
    scale: 1.2,
    totalFrames: 7,
    frameBuffer: 6,
  },
  TakeHits: {
    image: "../../src/img/player/player_takeHits_right.png",
    scale: 1.2,
    totalFrames: 7,
    frameBuffer: 5,
  },
  Fire: {
    image: "../../src/img/player/player_fire.png",
    scale: 1.2,
    totalFrames: 12,
    frameBuffer: 8,
  },
  Heart: {
    image: "../../src/img/player/hearts.png",
    scale: 1,
    totalFrames: 1,
    frameBuffer: 1,
    loop: false,
  },
};

const PLAYERDBL = {
  Idle: {
    image: "../../src/img/player/player_idle_left.png",
    totalFrames: 6,
    frameBuffer: 9,
    scale: 1.2,
  },
  Run: {
    image: "../../src/img/player/player_run_left.png",
    totalFrames: 6,
    frameBuffer: 7,
    scale: 1.4,
  },
  Attack: {
    image: "../../src/img/player/player_attack_left.png",
    scale: 1.2,
    totalFrames: 11,
    frameBuffer: 6,
  },
  Bomb: {
    image: "../../src/img/player/player_bomb.png",
    scale: 1.2,
    totalFrames: 7,
    frameBuffer: 6,
  },
  TakeHits: {
    image: "../../src/img/player/player_takeHits_left.png",
    scale: 1.2,
    totalFrames: 7,
    frameBuffer: 5,
  },
  Fire: {
    image: "../../src/img/player/player_fire.png",
    scale: 1.2,
    totalFrames: 12,
    frameBuffer: 8,
  },
  Heart: {
    image: "../../src/img/player/hearts.png",
    scale: 1,
    totalFrames: 1,
    frameBuffer: 1,
    loop: false,
  },
};

export { PLAYERDBR, PLAYERDBL };
