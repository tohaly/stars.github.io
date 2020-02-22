const data = {
  x: [100, 500, 300, 100, 500],
  y: [100, 100, 300, 500, 500],
  colors: ["red", "green", "yellow", "blue", "black"],
  largeDiameter: 150
};

const starsCnvs = document.querySelector(".stars");
const ctx = starsCnvs.getContext("2d");
const colorFillCanvans = document.querySelector(".fill__color");

class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
  }
  renderStar(x, y, d, color) {
    this.context.save();
    this.context.beginPath();
    this.context.translate(x, y);
    this.context.moveTo(0, 0 - d / 2);
    for (let i = 0; i < 5; i++) {
      this.context.rotate(Math.PI / 5);
      this.context.lineTo(0, 0 - d / 4);
      this.context.rotate(Math.PI / 5);
      this.context.lineTo(0, 0 - d / 2);
    }
    this.context.closePath();
    this.context.fillStyle = color;
    this.context.fill();
    this.context.restore();
  }
  getStarColor() {
    const x = event.offsetX;
    const y = event.offsetY;
    const imgData = ctx.getImageData(x, y, 1, 1);
    colorFillCanvans.style.backgroundColor = `rgba(${imgData.data.join(",")})`;
  }
  listeners() {
    this.canvas.addEventListener("click", event => {
      this.getStarColor(event);
    });
  }
}

game = new Game(starsCnvs, ctx);
game.listeners();

for (let i = 0; i < 5; i++) {
  game.renderStar(data.x[i], data.y[i], data.largeDiameter, data.colors[i]);
}
