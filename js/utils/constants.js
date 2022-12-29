const canvas = document.getElementById("canvas");
const CTX = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 1024);
const CANVAS_HEIGHT = (canvas.height = 576);

const selectBats = () => {
  const bats = ["BlackBat", "RedBat", "BlueBat"];
  const selectBat = () => {
    let number = Math.floor(Math.random() * bats.length);
    return number;
  };
  let position = selectBat();
  let type = bats[position];
  return type;
};

export { CTX, CANVAS_WIDTH, CANVAS_HEIGHT, selectBats };
