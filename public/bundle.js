/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/lib/poke_royale.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/lib/board.js":
/*!*****************************!*\
  !*** ./public/lib/board.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player_pokemon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player_pokemon */ "./public/lib/player_pokemon.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ "./public/lib/ui.js");
/* harmony import */ var _spawn_sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./spawn_sidebar */ "./public/lib/spawn_sidebar.js");
// const fs = require("file-system");
// const randomFile = require("select-random-file");
const Util = __webpack_require__(/*! ./util */ "./public/lib/util.js");




class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.offsetX = 0;
    this.offsetY = 0;
    this.enemyPokemon = [];
    this.playerPokemon = [];
    this.selectorRectangle = null;
    this.previousLeftMouseClick = [];
    this.spawnSidebar = new _spawn_sidebar__WEBPACK_IMPORTED_MODULE_2__["default"](Board.SPAWN_SIDEBAR_COORDS);
  }

  add(object) {
    if (object instanceof _player_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      this.playerPokemon.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  addPlayerPokemon(pos) {
    const playerPokemon = new _player_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"]({
      pos: pos || this.randomPosition(),
    });

    this.add(playerPokemon);
    return playerPokemon;
  }

  randomPosition() {
    return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
  }

  allObjects() {
    if (this.selectorRectangle) {
      return [].concat(this.playerPokemon, this.enemyPokemon, [
        this.selectorRectangle
      ]);
    } else {
      return [].concat(this.playerPokemon, this.enemyPokemon);
    }
  }

  allPokemon() {
    return [].concat(this.playerPokemon, this.enemyPokemon);
  }




  moveObjects(timeDelta) {
    // Handle collisions
    Util.pairs(this.allPokemon()).filter(pair => 
      pair[0].isCollidedWith(pair[1])).
      forEach(collisionPair => {
        collisionPair[0].handleCollisionWith(collisionPair[1]);
        collisionPair[1].handleCollisionWith(collisionPair[0]);
        // let firstObj = collisionPair[0];
        // let secondObj = collisionPair[1];
        // if (firstObj.isMoving() && secondObj.isMoving()){
        //   console.log('collision!')
        //   let firstNewLocation = [firstObj.pos[0] - (2*firstObj.vel[0]), firstObj.pos[1] - (2*firstObj.vel[1])];
        //   let secondNewLocation = [secondObj.pos[0] - (2*secondObj.vel[0]), secondObj.pos[1] - (2*secondObj.vel[1])];
        //   firstObj.moveTo(firstNewLocation);
        //   secondObj.moveTo(secondNewLocation);
        // }
    });



    this.allPokemon().forEach(object => {
      if (object instanceof _player_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        object.move(timeDelta);
      }
    });
  }
  // TODO: integrate timeDelta (?) - this hasn't been needed thus far
  step(timeDelta) {
    this.moveObjects(timeDelta);
    this.checkDestinations();
    // this.checkCollisions();
  }

  checkDestinations() {
    this.allPokemon()
      .filter(obj => obj.destination)
      .forEach(obj => {
        if (Util.dist(obj.pos, obj.destination) <= 15) { //TODO: Check hardcoding of this 15
          obj.vel = [0, 0];
        }
      });
  }

  pokemonClicked(pokemon, clickPos) {
    if (Util.dist(pokemon.pos, clickPos) <= pokemon.radius + 3) {
      return true;
    } else {
      return false;
    }
  }

  // handleMouseClick(e) {
  //     e.preventDefault();
  //     if(e.button == 0) {
  //         this.handleLeftMouseClick(e)
  //     }
  //     if(e.button == 1) {
  //         // middle-mouse
  //     }
  //     if(e.button == 2) {
  //         this.handleLeftMouseClick(e)
  //     }

  // }
  selectOnePokemon(selectedPoke) {
    selectedPoke.selected = true;
    this.playerPokemon.forEach(poke => {
      if (poke != selectedPoke) {
        poke.selected = false;
      }
    });
    return selectedPoke;
  }
  // TODO: refactor this function with the above
  dragOnePokemon(draggedPoke) {
    draggedPoke.isDragging = true;
    this.spawnSidebar.pokemon.forEach(poke => {
      if (poke != draggedPoke) {
        poke.isDragging = false;
      }
    });
    return draggedPoke;
  }

  selectOnlyThesePokemon(selectedPokes) {
    selectedPokes.forEach(poke => {
      poke.selected = true;
    });

    this.playerPokemon.forEach(poke => {
      if (!selectedPokes.includes(poke)) {
        poke.selected = false;
      }
    });
    return selectedPokes;
  }

  handleLeftMouseClick(e) {
    this.previousLeftMouseClick = [e.x, e.y];
    this.playerPokemon.forEach(poke => {
      if (this.pokemonClicked(poke, [e.x, e.y])) {
        this.selectOnePokemon(poke);
      }
    });
    this.spawnSidebar.pokemon.forEach(poke => {
      if (this.pokemonClicked(poke, [e.x, e.y])) {
        // poke.isDragging = true;
        this.dragOnePokemon(poke);
        // this.selectorRectangle = null;
      }
    });
  }

  handleRightMouseClick(e) {
    // debugger
    e.preventDefault();
    let didDeselect = false;
    this.playerPokemon.forEach(poke => {
      if (this.pokemonClicked(poke, [e.x, e.y])) {
        poke.selected = false;
        didDeselect = true;
      }
    });
    if (!didDeselect) {
      this.playerPokemon.forEach(poke => {
        if (poke.selected) {
          poke.setMotionAndDestination([e.x, e.y]);
        }
      });
    }
  }

  handleMouseDownAndMouseMove(e) {
    if (!this.pokeBeingDragged()) {
      if (!this.selectorRectangle) {
        this.selectorRectangle = new _ui__WEBPACK_IMPORTED_MODULE_1__["SelectorRectangle"](
          this.previousLeftMouseClick,
          [e.x, e.y]
        );
      } else {
        // console.log([e.x, e.y]);
        this.selectorRectangle.updateRect([e.x, e.y]);
      }
    } else {
      this.spawnSidebar.updateDraggedPoke([e.x, e.y]);
    }
  }

  createPokemonFromSidebarPokemon(droppedPoke){
    // let id = droppedPoke.imgId;
    // axios.get(`/sprites/${id}`)
    //   .then((response) => {
    //     console.log(response);
    //     debugger;
    //     let newPoke = new PlayerPokemon({
    //       pos: droppedPoke.pos,
    //       imgSrc: response.imgSrc,
    //       imgId: droppedPoke.imgId
    //     });
    //     this.playerPokemon.push(newPoke);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    let newPoke = new _player_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"]({
      pos: droppedPoke.pos,
      imgSrc: `https://sprites.pokecheck.org/i/${droppedPoke.imgId}.gif`,
      imgSrcBack: `https://sprites.pokecheck.org/b/${droppedPoke.imgId}.gif`,
      imgId: droppedPoke.imgId
    });
    // debugger
    this.playerPokemon.push(newPoke);
    
  }

  handleMouseUp(e) {
    let droppedPoke = this.pokeBeingDragged();
    if (droppedPoke) {
      this.createPokemonFromSidebarPokemon(droppedPoke);
      this.spawnSidebar.resetAll();
    } else {
      this.groupSelect();
      this.selectorRectangle = null;
    }
  }

  pokeBeingDragged() {
    return this.spawnSidebar.pokemon.filter(poke => poke.isDragging)[0];
  }

  groupSelect() {
    if (!this.selectorRectangle) return;
    // debugger
    this.selectOnlyThesePokemon(
      this.playerPokemon.filter(poke =>
        this.selectorRectangle.inSelectRectangle(poke.pos)
      )
    );
  }

  setOffsets(offsetX, offsetY) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.spawnSidebar.translationOffset(offsetX, offsetY);
  }

  applyRandomBackground() {
    //TODO: finish
    let blueprint_background = new Image();
    const dir = '../assets/images/background'
    // debugger
    // randomFile(dir, (err, file) => {
    //   blueprint_background.src = file;
    // })
    blueprint_background.src = dir + `/Broag_Garden_Entrance_image.jpg`;

    blueprint_background.onload = function () {
      let pattern = ctx.createPattern(this, "repeat");
      ctx.fillStyle = pattern;
      ctx.fill();
    };
  }

  draw(ctx) {
    ctx.clearRect(this.offsetX, this.offsetY, 5000, 5000);
    // ctx.restore();
    // ctx.fillStyle = Board.BG_COLOR;
    // this.applyRandomBackground();
    // ctx.fillRect(this.offsetX, this.offsetY, 5000, 5000);

    // Order by lowest y location. Pokemon lower on the canvas are in front and thus drawn last
    this.allPokemon().sort((poke1, poke2) => (poke1.pos[1] + poke1.radius) - (poke2.pos[1] + poke2.radius)).forEach( poke => {
      poke.draw(ctx);
    });
    if (this.selectorRectangle) { this.selectorRectangle.draw(ctx); }


    // this.allObjects().forEach(object => {
    //   // console.log('draw object:' + object)
    //   if (object instanceof PlayerPokemon) {
    //     // console.log(object.selected)
    //   }
    //   object.draw(ctx);
    // });
    this.spawnSidebar.draw(ctx);
  }

  start() {
    this.lastTime = 0;
    // start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.step(timeDelta);
    this.draw(this.ctx);
    this.lastTime = time;

    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

Board.BG_COLOR = "#28ba32";
Board.DIM_X = 2000;
Board.DIM_Y = 1000;
Board.SPAWN_SIDEBAR_COORDS = [Board.DIM_X - 200 , 50];
Board.FPS = 32;
Board.MOVES = {
    w: [0, 2],
    a: [2, 0],
    s: [0, -2],
    d: [-2, 0],
    up: [0, 2],
    left: [2, 0],
    down: [0, -2],
    right: [-2, 0],
};

/* harmony default export */ __webpack_exports__["default"] = (Board);


// class GameView {
//   constructor(game, ctx) {
//     this.ctx = ctx;
//     this.game = game;
//     this.player_pokemon = this.game.addPlayerPokemon();
//   }



//   start() {
//     this.lastTime = 0;
//     // start the animation
//     requestAnimationFrame(this.animate.bind(this));
//   }

//   animate(time) {
//     const timeDelta = time - this.lastTime;

//     this.game.step(timeDelta);
//     this.game.draw(this.ctx);
//     this.lastTime = time;

//     // every call to animate requests causes another call to animate
//     requestAnimationFrame(this.animate.bind(this));
//   }
// }

// GameView.MOVES = {
//   w: [0, -1],
//   a: [-1, 0],
//   s: [0, 1],
//   d: [1, 0],
// };

// module.exports = GameView;

/***/ }),

/***/ "./public/lib/player_pokemon.js":
/*!**************************************!*\
  !*** ./public/lib/player_pokemon.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pokemon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pokemon */ "./public/lib/pokemon.js");

const Util = __webpack_require__(/*! ./util */ "./public/lib/util.js");

class PlayerPokemon extends _pokemon__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(options) {
    options.radius = PlayerPokemon.RADIUS;
    options.vel = [0, 0];
    options.color = options.color || Util.randomColor();
    let id = options.imgId;
    if(id.length === 1) { id = '00' + id}
    if (id.length === 2) { id = '0' + id }
    options.imgSrc = options.imgSrc.replace(options.imgId, id);
    options.imgId = id;

    super(options);
    this.selected = options.selected || false;
  }

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }
}

PlayerPokemon.RADIUS = 15;
/* harmony default export */ __webpack_exports__["default"] = (PlayerPokemon);


/***/ }),

/***/ "./public/lib/poke_royale.js":
/*!***********************************!*\
  !*** ./public/lib/poke_royale.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./public/lib/board.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ "./public/lib/ui.js");
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





document.addEventListener("DOMContentLoaded", () => {

  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 5000;
  canvasEl.height = 5000;

  const ctx = canvasEl.getContext("2d");

  ctx.translate(0,0)
  const board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
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
  Object.keys(_board__WEBPACK_IMPORTED_MODULE_0__["default"].MOVES).forEach(function(k) {
    key(k, () => { 
      const dirX = _board__WEBPACK_IMPORTED_MODULE_0__["default"].MOVES[k][0];
      const dirY = _board__WEBPACK_IMPORTED_MODULE_0__["default"].MOVES[k][1];
      this.offsetX -= dirX;
      this.offsetY -= dirY;
      // ctx.save();

      let map = document.getElementById("canvas-map");
      if (map.style.left === "") { map.style.left = 0 };
      if (map.style.top === "") { map.style.top = 0 };
      map.style.left = parseInt(map.style.left) + dirX;
      map.style.top = parseInt(map.style.top) + dirY;
      
      console.log(map.style.left)
      // ctx.translate(dirX, dirY); 
      board.setOffsets(this.offsetX, this.offsetY);
    });
  }, canvasEl);


  

  window.ctx = ctx;
  window.UI = _ui__WEBPACK_IMPORTED_MODULE_1__;
});




/***/ }),

/***/ "./public/lib/pokemon.js":
/*!*******************************!*\
  !*** ./public/lib/pokemon.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const Stream = __webpack_require__(/*! ../vendor/stream */ "./public/vendor/stream.js");
const Util = __webpack_require__(/*! ./util */ "./public/lib/util.js");

class Pokemon {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.destination = options.destination;
    this.selected = options.selected;
    this.imgSrc = options.imgSrc;
    this.imgSrcBack = options.imgSrcBack;
    this.imgId = options.imgId;
    if (this.imgSrc && !this.spritesheetCanvas && this.imgSrc.slice(this.imgSrc.length - 3, this.imgSrc.length) === 'gif') {
      let img = document.createElement("img");
      img.src = this.imgSrc;
      img.id = this.imgId; 
      img.setAttribute("rel:animated_src", this.imgSrc);
      img.crossOrigin = "use-credentials";
      let div = document.getElementById("spritesheets");
      div.appendChild(img);

      let superGif = new SuperGif({
        gif: document.getElementById(this.imgId),
        auto_play: false
      });
      const play = (res) => {
        superGif.play();
        for (let i = 1; i < superGif.get_length(); i++) {
          let offset = { x: 0, y: i * superGif.get_canvas().height };
          superGif.set_frame_offset(i, offset);
        }
        superGif.set_sizes(superGif.get_canvas().width, superGif.get_length() * superGif.get_canvas().height);
        superGif.get_canvas().id = this.imgId;
        this.spritesheetCanvas = superGif.get_canvas();
        this.num_frames = superGif.get_length();
        this.height = this.spritesheetCanvas.height / this.num_frames;
        this.width = this.spritesheetCanvas.width;
        this.radius = this.width > this.height ? this.width / 2 : this.height / 2;
      }
      superGif.load(play);

      // Make the back-facing gif
      let imgBack = document.createElement("img");
      imgBack.src = this.imgSrcBack;
      imgBack.id = this.imgId + 'b';
      imgBack.setAttribute("rel:animated_src", this.imgSrcBack);
      imgBack.crossOrigin = "use-credentials";
      div.appendChild(imgBack);

      let superGifBack = new SuperGif({
        gif: document.getElementById(imgBack.id),
        auto_play: false
      });
      const playBack = (res) => {
        superGifBack.play();
        for (let i = 1; i < superGifBack.get_length(); i++) {
          let offset = { x: 0, y: i * superGifBack.get_canvas().height };
          superGifBack.set_frame_offset(i, offset);
        }
        superGifBack.set_sizes(superGifBack.get_canvas().width, superGifBack.get_length() * superGifBack.get_canvas().height);
        superGifBack.get_canvas().id = this.imgBackId;
        this.spritesheetCanvasBack = superGifBack.get_canvas();
        this.num_frames_back = superGifBack.get_length();
        this.height_back = this.spritesheetCanvasBack.height / this.num_frames_back;
        this.width_back = this.spritesheetCanvasBack.width;
        this.radius_back = this.width_back > this.height_back ? this.width_back / 2 : this.height_back / 2;
      }
      superGifBack.load(playBack);

    }
    this.currentFrame = 0;   
    this.goingRound = false;
  }

  draw(ctx) {
    //TODO: delete if not needed
    if (false) { var h, img; } else if (false) {}


    const flipSpriteHorizontally = function (img, x, y, spriteX, spriteY, spriteW, spriteH) {
      // move to x + img's width
      // adding img.width is necessary because we're flipping from
      //     the right side of the img so after flipping it's still
      //     at [x,y]
      ctx.translate(x + spriteW, y);

      // scaleX by -1; this "trick" flips horizontally
      ctx.scale(-1, 1);

      // draw the img
      // no need for x,y since we've already translated
      ctx.drawImage(img,
        spriteX, spriteY, spriteW, spriteH, 0, 0, spriteW, spriteH
      );

      // always clean up -- reset transformations to default
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    if (this.spritesheetCanvas && this.vel[0] <= 0 && this.vel[1] >= 0) {
      ctx.drawImage(this.spritesheetCanvas, 0, this.currentFrame * this.height, this.width, this.height,
         this.pos[0] - this.width / 2, this.pos[1] - this.height / 2, this.width, this.height);
      this.currentFrame = (this.currentFrame + 1) % this.num_frames;
    } else if (this.spritesheetCanvasBack && this.vel[0] > 0 && this.vel[1] < 0) {
      ctx.drawImage(this.spritesheetCanvasBack, 0, this.currentFrame * this.height_back, this.width_back, this.height_back,
        this.pos[0] - this.width_back / 2, this.pos[1] - this.height_back / 2, this.width_back, this.height_back);
      this.currentFrame = (this.currentFrame + 1) % this.num_frames_back;
    } else if (this.spritesheetCanvas && this.vel[0] > 0 && this.vel[1] >= 0) { 
      flipSpriteHorizontally(this.spritesheetCanvas, this.pos[0] - this.width / 2, this.pos[1] - this.height / 2,
         0, this.currentFrame * this.height, this.width, this.height);
      this.currentFrame = (this.currentFrame + 1) % this.num_frames;
    } else if (this.spritesheetCanvasBack && this.vel[0] < 0 && this.vel[1] < 0) {
      flipSpriteHorizontally(this.spritesheetCanvasBack, this.pos[0] - this.width_back / 2, this.pos[1] - this.height_back / 2,
        0, this.currentFrame * this.height_back, this.width_back, this.height_back);
      this.currentFrame = (this.currentFrame + 1) % this.num_frames_back;
    } else {
      let img = new Image();
      img.src = this.imgSrc;
      img.id = this.imgId;
      ctx.drawImage(img, this.pos[0] - this.width / 2, this.pos[1] - this.height / 2);
      img.onload = function(e) {
        this.width = e.target.width;
        this.height = e.target.height;
      }.bind(this)
    }


    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.stroke();
    // ctx.fillStyle = this.color;
    // ctx.fill();

    // if (this.width && this.height) { 
    //   ctx.rect(this.pos[0] - this.width / 2, this.pos[1] - this.height / 2, this.width, this.height); 
    //   ctx.stroke();
    // } else {
    //   ctx.beginPath();
    //   ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    //   ctx.stroke();
    //   ctx.fillStyle = this.color;
    //   ctx.fill();
    // }
  }

  aheadOf(otherObj) {
    return Math.abs(this.pos[0]) > Math.abs(otherObj.pos[0]) && Math.abs(this.pos[1]) > Math.abs(otherObj.pos[1]);
  }

  hasSameDestination(otherObject) {
    return this.destination[0] === otherObject.destination[0] && this.destination[1] === otherObject.destination[1];
  }
 
  isMoving() {
    return this.vel[0] != 0 || this.vel[1] != 0;
  }

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    const oneBehindOther = this.pos[1] + this.radius < otherObject.pos[1] || otherObject.pos[1] + otherObject.radius < this.pos[1];
    return centerDist < (this.radius + otherObject.radius - 1) && !oneBehindOther;
  }

  handleCollisionWith(otherObject) {
    // otherVel = otherObject.vel;
    const awayFrom0 = otherObject.vel.filter(v => Math.abs(v) > 1).length === otherObject.vel.length &&
      this.vel.filter(v => Math.abs(v) > 1).length === this.vel.length;
    const pOtherV = otherObject.vel.map(v => (v) >= 0);
    const pV = this.vel.map(v => (v) >= 0);
    const allPos = pOtherV[0] && pOtherV[1] && pV[0] && pV[1];
    const allNeg = !pOtherV[0] && !pOtherV[1] && !pV[0] && !pV[1];
    const aheadWillBounce = awayFrom0 && ((!pOtherV[0] && pOtherV[1] && !pV[0] && pV[1]) || (pOtherV[0] && !pOtherV[1] && pV[0] && !pV[1]) || allNeg || allPos);
    const willGoRound = (pOtherV[0] && pOtherV[1] && !pV[0] && !pV[1]) ||
      (!pOtherV[0] && !pOtherV[1] && pV[0] && pV[1]) ||
      (pOtherV[0] && !pOtherV[1] && !pV[0] && pV[1]) ||
      (!pOtherV[0] && pOtherV[1] && pV[0] && !pV[1]); 
    const willBounce = (pOtherV.concat(pV).filter(p => p).length === 3 ||
      pOtherV.concat(pV).filter(p => p).length === 1)
    // 3 possible outcomes if both moving
    // 1) +y+x +y+x, -y-x -y-x, +y-x +y-x, -y+x -y+x = ahead one bounces forward, behind one destination updated if same destination
    // 2) +y+x -y-x, -y-x +y+x, +y-x -y+x, -y+x +y-x = teleport through each other
    // 3) +y+x +y-x, -y+x +y+x, +y-x +y+x, +y+x -y+x, -y-x -y+x, +y-x -y-x, -y+x -y-x, -y-x +y-x  = Bounce off normal, one furthest to destination has destination updated if same destination
    if (this.isMoving() && otherObject.isMoving()) {
      // console.log(this.goingRound);

      if (aheadWillBounce && !this.goingRound) {
        console.log("aheadWillBounce");
        // debugger
        if (this.aheadOf(otherObject)) {
          console.log("Ahead BOUNCE");
          // debugger
          // console.log(this.imgSrc + ": " + this.destination);
          // console.log(otherObject.destination);
          // console.log(this.imgSrc);
          this.move();
          this.move();
        } 
        // else if (this.hasSameDestination(otherObject)) {
        //   console.log("UPDATE DEST")
        //   this.destination = [this.destination[0] - (this.vel[0] * otherObject.radius * 2), this.destination[1] - (this.vel[1] * otherObject.radius * 2)]
        // }
      } else if (willGoRound && !this.goingRound) {
        console.log("willGoRound");
        const previousDestination = this.destination.slice();
        const leftSideOld = [
          otherObject.pos[0] - (otherObject.radius + this.radius),
          otherObject.pos[1]
        ];
        const rightSideOld = [
          otherObject.pos[0] + (otherObject.radius + this.radius),
          otherObject.pos[1]
        ];
        this.moveRound(otherObject)
      } else if (willBounce && !this.goingRound) {
        console.log("willBounce");
        console.log("this.vel: " + this.vel)
        console.log("otherObj.vel: " + otherObject.vel)
        // debugger
        const beforeDest = this.destination.slice();
        this.vel = Util.direction(otherObject.pos, this.pos);
        this.move();
        this.move();
        this.setMotionAndDestination(beforeDest);
        // this.destination = [this.destination[0] - this.vel[0] * otherObject.radius * 2, this.destination[1] - this.vel[1] * otherObject.radius * 2]
    }
    } else if (!this.goingRound && this.isMoving() && Util.dist(this.pos, this.destination) <= otherObject.radius + this.radius) {
      console.log("Early Arrival")
      this.destination = this.pos;
    } else if (this.isMoving()) {
      // TODO: A* Pathing
      // Go round if pokemon's feet is "inside" the colliding object
      if(!this.goingRound) {
        this.moveRound(otherObject);
      }
    } else {
      this.vel = Util.direction(otherObject.pos, this.pos);
      this.move();
      this.move();
      this.setMotionAndDestination(this.pos);
    }
  }

  moveRound(otherObject) {
    const previousDestination = this.destination.slice();
    let leftSide = Util.findThirdPointInRightTriangle(
      otherObject.pos,
      this.pos,
      // otherObject.radius > this.radius ? otherObject.radius : this.radius,
      otherObject.radius + this.radius,
      1
    );
    let rightSide = Util.findThirdPointInRightTriangle(
      otherObject.pos,
      this.pos,
      // otherObject.radius > this.radius ? otherObject.radius : this.radius,
      otherObject.radius + this.radius,
      -1
    );
    if (Util.dist(this.pos, leftSide) <= Util.dist(this.pos, rightSide)) {
      this.setMotionAndDestination(leftSide);
    } else {
      this.setMotionAndDestination(rightSide);
    }
    this.goingRound = true;
    setTimeout(function() {
        this.setMotionAndDestination(previousDestination);
        setTimeout(function () { this.goingRound = false; }.bind(this), 10 * parseInt(Util.dist(this.pos, this.destination) / Util.speed(this.vel)));   
        console.log("time to go round:" + 10 * Util.dist(this.pos, this.destination) / Util.speed(this.vel));
      }.bind(this), 10*parseInt(Util.dist(this.pos, this.destination) / Util.speed(this.vel)));
  }

  move() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  moveTo(location) {
    this.pos[0] = location[0];
    this.pos[1] = location[1];
  }

  setMotionAndDestination(destination) {
    this.vel = Util.direction(this.pos, destination);
    this.destination = destination;
  }


}

/* harmony default export */ __webpack_exports__["default"] = (Pokemon);
 


// class MovingObject {
//   constructor(options) {
//     this.pos = options.pos;
//     this.vel = options.vel;
//     this.radius = options.radius;
//     this.color = options.color;
//     this.game = options.game;
//     this.isWrappable = true;
//   }

//   collideWith(otherObject) {
//     // default do nothing
//   }

//   draw(ctx) {
//     ctx.fillStyle = this.color;

//     ctx.beginPath();
//     ctx.arc(
//       this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
//     );
//     ctx.fill();
//   }

//   isCollidedWith(otherObject) {
//     const centerDist = Util.dist(this.pos, otherObject.pos);
//     return centerDist < (this.radius + otherObject.radius);
//   }

//   move(timeDelta) {
//     // timeDelta is number of milliseconds since last move
//     // if the computer is busy the time delta will be larger
//     // in this case the MovingObject should move farther in this frame
//     // velocity of object is how far it should move in 1/60th of a second
//       this.pos[0] += this.vel[0];
//       this.pos[1] += this.vel[1];
    
//     // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
//     //     offsetX = this.vel[0] * velocityScale,
//     //     offsetY = this.vel[1] * velocityScale;

//     // this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

//     // if (this.game.isOutOfBounds(this.pos)) {
//     //   if (this.isWrappable) {
//     //     this.pos = this.game.wrap(this.pos);
//     //   } else {
//     //     this.remove();
//     //   }
//     // }
//   }

//   remove() {
//     this.game.remove(this);
//   }
// }

// const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

// module.exports = MovingObject;


/***/ }),

/***/ "./public/lib/sidebar_pokemon.js":
/*!***************************************!*\
  !*** ./public/lib/sidebar_pokemon.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pokemon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pokemon */ "./public/lib/pokemon.js");
const Util = __webpack_require__(/*! ./util */ "./public/lib/util.js");


class SidebarPokemon extends _pokemon__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(options) {
    options.radius = SidebarPokemon.RADIUS;
    options.vel = [0, 0];
    options.color = options.color || Util.randomColor();
    super(options)
    this.offsets = [0,0];
    this.starting_pos = options.pos.slice(0);
    this.isDragging = false;
  }

  translationOffset(offsetX, offsetY) {
    this.offsets = [offsetX, offsetY];
    this.pos[0] = this.starting_pos[0] + offsetX;
    this.pos[1] = this.starting_pos[1] + offsetY;
    console.log(this.pos[0]);
  }

}

SidebarPokemon.RADIUS = 15;
/* harmony default export */ __webpack_exports__["default"] = (SidebarPokemon);

/***/ }),

/***/ "./public/lib/spawn_sidebar.js":
/*!*************************************!*\
  !*** ./public/lib/spawn_sidebar.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar_pokemon */ "./public/lib/sidebar_pokemon.js");

const Util = __webpack_require__(/*! ./util */ "./public/lib/util.js");

class SpawnSidebar {
    constructor(topLeftCoords) {
        this.untranslatedTopLeftCoords = topLeftCoords.slice(0);
        this.topLeftCoords = topLeftCoords;
        this.width = _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS * 4;
        this.pokeX = topLeftCoords[0] + (this.width / 2);
        this.ySpacing = _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS * 3;
        this.firstPokeYPosition = topLeftCoords[1] + this.ySpacing;
        this.pokemon = [];
        this.offsets = [0, 0];
        this.generateRandomPokemon();
        this.height = SpawnSidebar.NUM_POKEMON * _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS * 3;
        setInterval(this.generateRandomPokemon.bind(this), 7500);
    }

    generateRandomPokemon() {
        const randomIds = []
        for(let i = 0; i < 5; i++){
            let pokeId = (Math.floor(Math.random() * 649) + 1).toString();
            // let pokeId = '4';
            randomIds.push(pokeId);
        }

        for (let i = 0; i < SpawnSidebar.NUM_POKEMON; i++) {
            let newPoke = new _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"]({
                pos: [this.pokeX, this.firstPokeYPosition + (i * this.ySpacing)],
                imgSrc: `https://sprites.pokecheck.org/icon/${randomIds[i]}.png`,
                imgId: randomIds[i]
            });
            newPoke.translationOffset(this.offsets[0], this.offsets[1]);
            if (this.pokemon.length != SpawnSidebar.NUM_POKEMON) {
                this.pokemon.push(newPoke);
            } else if(!this.pokemon[i].isDragging) {
                this.pokemon[i] = newPoke;
            }
        }
    }

    draw(ctx) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.5;
        ctx.fillStyle = 'white';
        ctx.fillRect(this.topLeftCoords[0], this.topLeftCoords[1], this.width, this.height);

        this.pokemon.forEach(poke => {
            poke.draw(ctx);
        });

    }

    translationOffset(offsetX, offsetY) {
        this.offsets = [offsetX, offsetY];
        this.topLeftCoords[0] = this.untranslatedTopLeftCoords[0] + offsetX;
        this.topLeftCoords[1] = this.untranslatedTopLeftCoords[1] + offsetY;
        this.pokemon.forEach(poke => {
            poke.translationOffset(offsetX, offsetY);
        });
    }

    updateDraggedPoke(pos) {
        this.pokemon.filter(poke => poke.isDragging)[0].pos = pos;
    }

    resetAll() {
        this.pokemon.forEach(poke => {
            poke.isDragging = false;
        });
        this.generateRandomPokemon();
    }

}
SpawnSidebar.NUM_POKEMON = 3;
/* harmony default export */ __webpack_exports__["default"] = (SpawnSidebar);

/***/ }),

/***/ "./public/lib/ui.js":
/*!**************************!*\
  !*** ./public/lib/ui.js ***!
  \**************************/
/*! exports provided: SelectorRectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectorRectangle", function() { return SelectorRectangle; });
const Util = __webpack_require__(/*! ./util */ "./public/lib/util.js"); 

class SelectorRectangle {
    constructor(startCoords, endCoords) {
        this.startCoords = startCoords; 
        this.updateRect(endCoords);
    }

    updateRect(endCoords) {
        this.endCoords = endCoords;
        this.thirdCoord = [this.startCoords[0], this.endCoords[1]]
        this.defineRect = [
            this.startCoords[0],
            this.startCoords[1],
            this.endCoords[0],
            this.endCoords[1],
            this.thirdCoord[0],
            this.thirdCoord[1]];
    }

    inSelectRectangle(coords) {
        // debugger
        return Util.inRect(coords, this.defineRect);
    }

    draw(ctx) {
        // ctx.fillStyle = 'black';
        // ctx.fillRect(100,100,200,200);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.5;
        const x = this.endCoords[0] - this.startCoords[0];
        const y = this.endCoords[1] - this.startCoords[1];
        ctx.strokeRect(this.startCoords[0],this.startCoords[1],x,y);

        // ctx.rect(this.topleft[0],this.topleft[1],this.bottomRight[0],this.bottomRight[1]);
        // ctx.stroke();
    }


}



/***/ }),

/***/ "./public/lib/util.js":
/*!****************************!*\
  !*** ./public/lib/util.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {


const Util = {
  // Find distance between two points.
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  speed(vel) {
    return Math.sqrt(Math.pow(vel[0], 2) + Math.pow(vel[1], 2));
  },
  // Direction vector between two points.
  direction(pos1, pos2) {
    if(Util.dist(pos1, pos2) === 0) { return [0, 0] }
    return [
      (pos2[0] - pos1[0]) / Util.dist(pos1, pos2),
      (pos2[1] - pos1[1]) / Util.dist(pos1, pos2)
    ];
  },
  // Note we need 3 points for the rect in case the rectangle is tilted
  // Corners in ax,ay,bx,by,dx,dy
  // Point in x, y
  // Source: https://stackoverflow.com/a/2752754/2734863
  inRect(point, rect) {
    [x, y] = point;
    [ax, ay, bx, by, dx, dy] = rect;
    const bax = bx - ax;
    const bay = by - ay;
    const dax = dx - ax;
    const day = dy - ay;

    if ((x - ax) * bax + (y - ay) * bay < 0.0) {
      return false;
    }
    if ((x - bx) * bax + (y - by) * bay > 0.0) {
      return false;
    }
    if ((x - ax) * dax + (y - ay) * day < 0.0) {
      return false;
    }
    if ((x - dx) * dax + (y - dy) * day > 0.0) {
      return false;
    }

    return true;
  },
  randomColor() {
    const hexDigits = "0123456789ABCDEF";

    let color = "#";
    for (let i = 0; i < 3; i++) {
      color += hexDigits[Math.floor(Math.random() * 16)];
    }

    return color;
  },
  pairs(arr) {
    let res = [],
      l = arr.length;
    for (var i = 0; i < l; ++i)
      for (var j = i + 1; j < l; ++j) res.push([arr[i], arr[j]]);
    return res;
  },
  // r = distance from right-angle point to unknown
  // C = right-angle point
  // B = other point
  findThirdPointInRightTriangle(C, B, r, left = 1) {// if left = 1 the D is left of the line AB. Run with -1 to get other side
    // Want other part of midpoint.
    // C = A + B / 2
    let A = [0,0];
    A[0] = 2*C[0] - B[0];
    A[1] = 2*C[1] - B[1];

    const nx = B[0] - A[0];
    const ny = B[1] - A[1];
    r /= Math.sqrt(nx * nx + ny * ny) * left;
    return [
      A[0] + nx / 2 - ny * r,
      A[1] + ny / 2 + nx * r
    ];
  },

  // The actual parsing; returns an object with properties.
  parseGIF(st, handler) {
    // Generic functions
    var bitsToNum = function(ba) {
      return ba.reduce(function(s, n) {
        return s * 2 + n;
      }, 0);
    };

    var byteToBitArr = function(bite) {
      var a = [];
      for (var i = 7; i >= 0; i--) {
        a.push(!!(bite & (1 << i)));
      }
      return a;
    };

    handler || (handler = {});

    // LZW (GIF-specific)
    var parseCT = function(entries) {
      // Each entry is 3 bytes, for RGB.
      var ct = [];
      for (var i = 0; i < entries; i++) {
        ct.push(st.readBytes(3));
      }
      return ct;
    };

    var readSubBlocks = function() {
      var size, data;
      data = "";
      do {
        size = st.readByte();
        data += st.read(size);
      } while (size !== 0);
      return data;
    };

    var parseHeader = function() {
      var hdr = {};
      hdr.sig = st.read(3);
      hdr.ver = st.read(3);
      if (hdr.sig !== "GIF") throw new Error("Not a GIF file."); // XXX: This should probably be handled more nicely.
      hdr.width = st.readUnsigned();
      hdr.height = st.readUnsigned();

      var bits = byteToBitArr(st.readByte());
      hdr.gctFlag = bits.shift();
      hdr.colorRes = bitsToNum(bits.splice(0, 3));
      hdr.sorted = bits.shift();
      hdr.gctSize = bitsToNum(bits.splice(0, 3));

      hdr.bgColor = st.readByte();
      hdr.pixelAspectRatio = st.readByte(); // if not 0, aspectRatio = (pixelAspectRatio + 15) / 64
      if (hdr.gctFlag) {
        hdr.gct = parseCT(1 << (hdr.gctSize + 1));
      }
      handler.hdr && handler.hdr(hdr);
    };

    var parseExt = function(block) {
      var parseGCExt = function(block) {
        var blockSize = st.readByte(); // Always 4
        var bits = byteToBitArr(st.readByte());
        block.reserved = bits.splice(0, 3); // Reserved; should be 000.
        block.disposalMethod = bitsToNum(bits.splice(0, 3));
        block.userInput = bits.shift();
        block.transparencyGiven = bits.shift();

        block.delayTime = st.readUnsigned();

        block.transparencyIndex = st.readByte();

        block.terminator = st.readByte();

        handler.gce && handler.gce(block);
      };

      var parseComExt = function(block) {
        block.comment = readSubBlocks();
        handler.com && handler.com(block);
      };

      var parsePTExt = function(block) {
        // No one *ever* uses this. If you use it, deal with parsing it yourself.
        var blockSize = st.readByte(); // Always 12
        block.ptHeader = st.readBytes(12);
        block.ptData = readSubBlocks();
        handler.pte && handler.pte(block);
      };

      var parseAppExt = function(block) {
        var parseNetscapeExt = function(block) {
          var blockSize = st.readByte(); // Always 3
          block.unknown = st.readByte(); // ??? Always 1? What is this?
          block.iterations = st.readUnsigned();
          block.terminator = st.readByte();
          handler.app && handler.app.NETSCAPE && handler.app.NETSCAPE(block);
        };

        var parseUnknownAppExt = function(block) {
          block.appData = readSubBlocks();
          // FIXME: This won't work if a handler wants to match on any identifier.
          handler.app &&
            handler.app[block.identifier] &&
            handler.app[block.identifier](block);
        };

        var blockSize = st.readByte(); // Always 11
        block.identifier = st.read(8);
        block.authCode = st.read(3);
        switch (block.identifier) {
          case "NETSCAPE":
            parseNetscapeExt(block);
            break;
          default:
            parseUnknownAppExt(block);
            break;
        }
      };

      var parseUnknownExt = function(block) {
        block.data = readSubBlocks();
        handler.unknown && handler.unknown(block);
      };

      block.label = st.readByte();
      switch (block.label) {
        case 0xf9:
          block.extType = "gce";
          parseGCExt(block);
          break;
        case 0xfe:
          block.extType = "com";
          parseComExt(block);
          break;
        case 0x01:
          block.extType = "pte";
          parsePTExt(block);
          break;
        case 0xff:
          block.extType = "app";
          parseAppExt(block);
          break;
        default:
          block.extType = "unknown";
          parseUnknownExt(block);
          break;
      }
    };

    var parseImg = function(img) {
      var deinterlace = function(pixels, width) {
        // Of course this defeats the purpose of interlacing. And it's *probably*
        // the least efficient way it's ever been implemented. But nevertheless...
        var newPixels = new Array(pixels.length);
        var rows = pixels.length / width;
        var cpRow = function(toRow, fromRow) {
          var fromPixels = pixels.slice(fromRow * width, (fromRow + 1) * width);
          newPixels.splice.apply(
            newPixels,
            [toRow * width, width].concat(fromPixels)
          );
        };

        // See appendix E.
        var offsets = [0, 4, 2, 1];
        var steps = [8, 8, 4, 2];

        var fromRow = 0;
        for (var pass = 0; pass < 4; pass++) {
          for (var toRow = offsets[pass]; toRow < rows; toRow += steps[pass]) {
            cpRow(toRow, fromRow);
            fromRow++;
          }
        }

        return newPixels;
      };

      img.leftPos = st.readUnsigned();
      img.topPos = st.readUnsigned();
      img.width = st.readUnsigned();
      img.height = st.readUnsigned();

      var bits = byteToBitArr(st.readByte());
      img.lctFlag = bits.shift();
      img.interlaced = bits.shift();
      img.sorted = bits.shift();
      img.reserved = bits.splice(0, 2);
      img.lctSize = bitsToNum(bits.splice(0, 3));

      if (img.lctFlag) {
        img.lct = parseCT(1 << (img.lctSize + 1));
      }

      img.lzwMinCodeSize = st.readByte();

      var lzwData = readSubBlocks();

      img.pixels = lzwDecode(img.lzwMinCodeSize, lzwData);

      if (img.interlaced) {
        // Move
        img.pixels = deinterlace(img.pixels, img.width);
      }

      handler.img && handler.img(img);
    };

    var parseBlock = function() {
      var block = {};
      block.sentinel = st.readByte();

      switch (
        String.fromCharCode(block.sentinel) // For ease of matching
      ) {
        case "!":
          block.type = "ext";
          parseExt(block);
          break;
        case ",":
          block.type = "img";
          parseImg(block);
          break;
        case ";":
          block.type = "eof";
          handler.eof && handler.eof(block);
          break;
        default:
          throw new Error("Unknown block: 0x" + block.sentinel.toString(16)); // TODO: Pad this with a 0.
      }

      if (block.type !== "eof") setTimeout(parseBlock, 0);
    };

    var parse = function() {
      parseHeader();
      setTimeout(parseBlock, 0);
    };

    parse();
  }

  // randomVec(length) {
  //  const deg = 2 * Math.PI * Math.random();
  //  return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  // },
  // scale(vec, m) {
  //   return [vec[0] * m, vec[1] * m];
  // },
  // inherits(childClass, parentClass) {
  //   function Surrogate() {}
  //   Surrogate.prototype = parentClass.prototype;
  //   surrogate = new Surrogate();
  //   childClass.prototype = surrogate;
  //   childClass.prototype.constructor = childClass;
  // }
};

module.exports = Util;

/***/ }),

/***/ "./public/vendor/stream.js":
/*!*********************************!*\
  !*** ./public/vendor/stream.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Stream
/**
 * @constructor
 */
// Make compiler happy.
var Stream = function (data) {
    this.data = data;
    this.len = this.data.length;
    this.pos = 0;

    this.readByte = function () {
        if (this.pos >= this.data.length) {
            throw new Error('Attempted to read past end of stream.');
        }
        if (data instanceof Uint8Array)
            return data[this.pos++];
        else
            return data.charCodeAt(this.pos++) & 0xFF;
    };

    this.readBytes = function (n) {
        var bytes = [];
        for (var i = 0; i < n; i++) {
            bytes.push(this.readByte());
        }
        return bytes;
    };

    this.read = function (n) {
        var s = '';
        for (var i = 0; i < n; i++) {
            s += String.fromCharCode(this.readByte());
        }
        return s;
    };

    this.readUnsigned = function () { // Little-endian.
        var a = this.readBytes(2);
        return (a[1] << 8) + a[0];
    };
};

module.exports = Stream;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map