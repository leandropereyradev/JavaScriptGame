import { Game } from "./classes/game.js";
import { sounds } from "./utils/sounds.js";

window.onload = () => {
  const game = new Game();

  document.querySelector("#start-button").onclick = () => {
    const name = prompt("Please enter your name");
    const nameFixed = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);

    if (nameFixed != "") {
      game.namePlayer = nameFixed;
    } else {
      game.namePlayer = "Stranger";
    }

    document.querySelector(".info-container").style.display = "none";
    document.querySelector(".canvas-container").style.display = "Flex";
    document.querySelector(".footer").style.position = "absolute";

    sounds.backgoundSound.play();
    game.pauseGame();
  };

  const scoreElement = document.getElementById("score");

  const scoreStoraged = JSON.parse(localStorage.getItem("score"));

  let number = 0;

  if (scoreStoraged !== null) {
    scoreStoraged
      .sort((a, b) => b.score - a.score)
      .forEach((store) => {
        const newDiv = document.createElement("div");

        newDiv.className = "table-storage";

        newDiv.innerHTML = `
    <div><p>${(number += 1)}</p></div>
    <div><p>${store.name}</p></div>
    <div><p>${store.bats}</p></div>
    <div><p>${store.zombies}</p></div>
    <div><p>${store.score}</p></div>`;

        scoreElement.appendChild(newDiv);
      });
  }
};
