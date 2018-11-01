// const MovingObject = require("./moving_object.js");
// const Util = require("./util.js");
// const Game = require("./game.js");
// window.Game = Game;
// window.MovingObject = MovingObject;
// window.ctx = document.getElementById("game-canvas").getContext("2d");

// console.log("Webpack is working!");
// console.log("test!");

// function PokeRoyale(options) {
//   PokeRoyale.prototype.COLOR = 'pink';
//   PokeRoyale.prototype.RADIUS = 69; 
//   MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: Util.randomVec(this.RADIUS)});
//   // const mo = new MovingObject({color: this.COLOR, radius: this.RADIUS, vel: Util.randomVec(this.RADIUS)});
// }
// // Asteroid.prototype.COLOR = 'pink';
// // Asteroid.prototype.RADIUS = 69; 

// Util.inherits(Asteroid, MovingObject);
// window.PokeRoyale = PokeRoyale;


import Board from "./board";
import * as UI from "./ui"

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Board.DIM_X;
  canvasEl.height = Board.DIM_Y;

  const ctx = canvasEl.getContext("2d");

  ctx.translate(0,0)
  const board = new Board(ctx);
  board.start();

  // TODO: Needs to be deleted later as User chooses either fire/water/grass at start
  board.addPlayerPokemon([100,100]);
  board.addPlayerPokemon([200,200]);

  canvasEl.offsetX = 0;
  function EventWrapper(e, canvas) {
    this.x = e.x + canvas.offsetX || e.x;
    this.y = e.y + canvas.offsetY || e.y;
    // this.y = e.pageY - 20;
    this.preventDefault = e.preventDefault;
  }

  canvasEl.addEventListener("mousedown", function(e){
    let wrapper = new EventWrapper(e, this)
    let evt = { x: e.x, y: e.y };
    evt.x -= -200;
    evt.y -= -20;
    board.handleLeftMouseClick.bind(board)(wrapper);
    this.onmousemove = function (e) {
      let wrapper = new EventWrapper(e, this);
      console.log("e.x: " + e.x)
      console.log("wrapper.x: " + wrapper.x);
      board.handleMouseDownAndMouseMove.bind(board)(wrapper);
     }
    // this.addEventListener("mousemove", board.handleMouseDownAndMouseMove.bind(board));
  });
  canvasEl.addEventListener("mouseup", function(e){
    let evt = { x: e.x, y: e.y }
    evt.x -= -200;
    evt.y -= -20;
    board.handleMouseUp.bind(board)(evt);
    this.onmousemove = null;
    // this.removeEventListener("mousemove", board.handleMouseDownAndMouseMove);
  });
  canvasEl.addEventListener('click', function(e){
    let evt = { x: e.x, y: e.y }
    evt.x -= -200;
    evt.y -= -20;
    this.onmousemove = null;
    board.handleLeftMouseClick.bind(board)(evt);},
    false);
  canvasEl.addEventListener('contextmenu', function(e){
    let evt = { x: e.x, y: e.y }
    evt.x -= -200;
    evt.y -= -20;
    this.onmousemove = null;
    board.handleRightMouseClick.bind(board)(evt);
  }, false);
  // TODO use 4 rectangles as a border around viewport and mouseover on each
  canvasEl.addEventListener('mousemove', function(e) {
    if (e.x >= (canvasEl.width - 5)) {
      this.offsetX += e.x + 5 - canvasEl.width;
      console.log("this.offsetX: " + this.offsetX);
      ctx.translate(-(e.x + 5 - canvasEl.width), 0);
    }
    // if (e.x > canvasEl.length) {
    //   ctx.translate(e.x - canvasEl.width)
    // }
    // if (e.y < 0) {
    //   ctx.translate(e.x - canvasEl.width);
    // }
    // if (e.y > canvasEl.height) {
    //   ctx.translate(e.x - canvasEl.width)
    // }
  }, false);

  window.ctx = ctx;
  window.UI = UI;
});


