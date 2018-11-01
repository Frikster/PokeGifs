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

  ctx.translate(-200,-20)
  const board = new Board(ctx);
  board.start();

  // TODO: Needs to be deleted later as User chooses either fire/water/grass at start
  board.addPlayerPokemon([100,100])
  board.addPlayerPokemon([200,200])

  canvasEl.addEventListener("mousedown", function(e){
    let evt = {x: e.x, y: e.y}
    evt.x -= -200;
    evt.y -= -20;
    board.handleLeftMouseClick.bind(board)(evt)
    this.onmousemove = function(evt) {
        board.handleMouseDownAndMouseMove.bind(board)(evt);
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

  window.ctx = ctx;
  window.UI = UI;
});


