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
  canvasEl.width = 5000;
  canvasEl.height = 4300;

  const ctx = canvasEl.getContext("2d");

  ctx.translate(0,0)
  const board = new Board(ctx);
  board.start();

  // TODO: Needs to be deleted later as User chooses either fire/water/grass at start
  // board.addPlayerPokemon([100,100]);
  // board.addPlayerPokemon([200,200]);

  canvasEl.offsetX = 0;
  canvasEl.offsetY = 0;
  function EventWrapper(e, canvas) {
    this.x = e.x + canvas.offsetX || e.x;
    this.y = e.y + canvas.offsetY || e.y;
    this.preventDefault = e.preventDefault.bind(e);
    // console.log("offsetX " + canvas.offsetX);
    // console.log("offsetY " + canvas.offsetY);
  }

  canvasEl.addEventListener("mousedown", function(e){
    let wrapper = new EventWrapper(e, this)
    board.handleLeftMouseClick.bind(board)(wrapper);
    this.onmousemove = function (e) {
      let wrapper = new EventWrapper(e, this);
      // console.log('x: ' + wrapper.x);
      // console.log(("y: " + wrapper.x));
      board.handleMouseDownAndMouseMove.bind(board)(wrapper);
     }
    // this.addEventListener("mousemove", board.handleMouseDownAndMouseMove.bind(board));
  });
  canvasEl.addEventListener("mouseup", function(e){
    let wrapper = new EventWrapper(e, this);
    board.handleMouseUp.bind(board)(wrapper);
    this.onmousemove = null;
    // this.removeEventListener("mousemove", board.handleMouseDownAndMouseMove);
  });
  canvasEl.addEventListener('click', function(e){
    let wrapper = new EventWrapper(e, this);
    this.onmousemove = null;
    board.handleLeftMouseClick.bind(board)(wrapper);},
    false);
  canvasEl.addEventListener('contextmenu', function(e){
    let wrapper = new EventWrapper(e, this);
    this.onmousemove = null;
    board.handleRightMouseClick.bind(board)(wrapper);
  }, false);

  // canvasEl.addEventListener("mouseover", function(e){
  //   console.log(e);
  // }, false);

  // TODO use 4 rectangles as a border around viewport and mouseover on each
  canvasEl.addEventListener("mousemove", function(e) {
      if (e.x >= canvasEl.width - 5) {
        this.offsetX += e.x + 5 - canvasEl.width;
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
  canvasEl.addEventListener("wheel", function (e) {
    const dirX = 0;
    const dirY = e.deltaY*-1;
    this.offsetX -= dirX;
    this.offsetY -= dirY;

    let map = document.getElementById("canvas-map");
    if (map.style.top === "") { map.style.top = 0 };
    if (parseInt(map.style.top) + dirY < 0 && parseInt(map.style.top) + dirY > map.offsetHeight * -1 + viewport.offsetHeight) {
      map.style.top = parseInt(map.style.top) + dirY;
    } else {
      this.offsetY += dirY;
    } 
    board.setOffsets(this.offsetX, this.offsetY); 
  }, false);
  Object.keys(Board.MOVES).forEach(function(k) {
    key(k, () => { 
      const dirX = Board.MOVES[k][0];
      const dirY = Board.MOVES[k][1];
      this.offsetX -= dirX;
      this.offsetY -= dirY;
      // ctx.save();

      let map = document.getElementById("canvas-map");
      let viewport = document.getElementById("viewport");
      if (map.style.left === "") { map.style.left = 0 };
      if (map.style.top === "") { map.style.top = 0 };
      if (parseInt(map.style.left) + dirX < 0 && parseInt(map.style.left) + dirX > map.offsetWidth * -1 + viewport.offsetWidth) {
        map.style.left = parseInt(map.style.left) + dirX;
      } else {
        this.offsetX += dirX;
      }
      if (parseInt(map.style.top) + dirY < 0 && parseInt(map.style.top) + dirY > map.offsetHeight * -1 + viewport.offsetHeight) {
        map.style.top = parseInt(map.style.top) + dirY;
      } else {
        this.offsetY += dirY;
      }
      
      console.log(map.style.left)
      // ctx.translate(dirX, dirY); 
      board.setOffsets(this.offsetX, this.offsetY);
    });
  }, canvasEl);


  

  window.ctx = ctx;
  window.UI = UI;
});


