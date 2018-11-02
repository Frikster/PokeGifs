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
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/poke_royale.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "./lib/ui.js");
/* harmony import */ var _spawn_sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./spawn_sidebar */ "./lib/spawn_sidebar.js");
const Util = __webpack_require__(/*! ./util */ "./lib/util.js");
const PlayerPokemon = __webpack_require__(/*! ./player_pokemon */ "./lib/player_pokemon.js");



class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.offsetX = 0;
    this.offsetY = 0;
    this.enemyPokemon = [];
    this.playerPokemon = [];
    this.selectorRectangle = null;
    this.previousLeftMouseClick = [];
    this.spawnSidebar = new _spawn_sidebar__WEBPACK_IMPORTED_MODULE_1__["default"](Board.SPAWN_SIDEBAR_COORDS);
  }

  add(object) {
    if (object instanceof PlayerPokemon) {
      this.playerPokemon.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  addPlayerPokemon(pos) {
    const playerPokemon = new PlayerPokemon({
      pos: pos || this.randomPosition()
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

  moveObjects(delta) {
    this.allPokemon().forEach(object => {
      if (object instanceof PlayerPokemon) {
        object.move(delta);
      }
    });
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkDestinations();
    // this.checkCollisions();
  }

  checkDestinations() {
    this.allPokemon()
      .filter(obj => obj.destination)
      .forEach(obj => {
        if (Util.dist(obj.pos, obj.destination) <= obj.radius / 2) {
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
          poke.vel = Util.direction(poke.pos, [e.x, e.y]);
          poke.destination = [e.x, e.y];
        }
      });
    }
  }

  handleMouseDownAndMouseMove(e) {
    if (!this.pokeBeingDragged()) {
      if (!this.selectorRectangle) {
        this.selectorRectangle = new _ui__WEBPACK_IMPORTED_MODULE_0__["SelectorRectangle"](
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

  handleMouseUp(e) {
    this.groupSelect();
    this.selectorRectangle = null;
  }

  pokeBeingDragged() {
    return this.spawnSidebar.pokemon.filter(poke => poke.isDragging).length > 0;
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
    // this.spawnSidebar.offsetSidebar(offsetX, offsetY);
  }

  draw(ctx) {
    ctx.clearRect(this.offsetX, this.offsetY, 5000, 5000);
    // ctx.restore();
    ctx.fillStyle = Board.BG_COLOR;
    ctx.fillRect(this.offsetX, this.offsetY, 5000, 5000);

    this.allObjects().forEach(object => {
      // console.log('draw object:' + object)
      if (object instanceof PlayerPokemon) {
        // console.log(object.selected)
      }
      object.draw(ctx);
    });
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
Board.DIM_X = 1000;
Board.DIM_Y = 300;
Board.SPAWN_SIDEBAR_COORDS = [800, 50]
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

/***/ "./lib/player_pokemon.js":
/*!*******************************!*\
  !*** ./lib/player_pokemon.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Pokemon = __webpack_require__(/*! ./pokemon */ "./lib/pokemon.js");
const Util = __webpack_require__(/*! ./util */ "./lib/util.js");

class PlayerPokemon extends Pokemon {
  constructor(options) {
    options.radius = PlayerPokemon.RADIUS;
    options.vel = [0, 0];
    options.color = options.color || Util.randomColor();
    super(options);
    this.selected = false;
  }

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }
}

PlayerPokemon.RADIUS = 15;
module.exports = PlayerPokemon;


/***/ }),

/***/ "./lib/poke_royale.js":
/*!****************************!*\
  !*** ./lib/poke_royale.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./lib/board.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ "./lib/ui.js");
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
  board.addPlayerPokemon([100,100]);
  board.addPlayerPokemon([200,200]);

  canvasEl.offsetX = 0;
  canvasEl.offsetY = 0;
  function EventWrapper(e, canvas) {
    this.x = e.x + canvas.offsetX || e.x;
    this.y = e.y + canvas.offsetY || e.y;
    this.preventDefault = e.preventDefault.bind(e);
    console.log("offsetX " + canvas.offsetX);
    console.log("offsetY " + canvas.offsetY);
  }

  canvasEl.addEventListener("mousedown", function(e){
    let wrapper = new EventWrapper(e, this)
    board.handleLeftMouseClick.bind(board)(wrapper);
    this.onmousemove = function (e) {
      let wrapper = new EventWrapper(e, this);
      console.log('x: ' + wrapper.x);
      console.log(("y: " + wrapper.x));
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
      ctx.translate(dirX, dirY); 
      board.setOffsets(this.offsetX, this.offsetY);
    });
  }, canvasEl);


  

  window.ctx = ctx;
  window.UI = _ui__WEBPACK_IMPORTED_MODULE_1__;
});




/***/ }),

/***/ "./lib/pokemon.js":
/*!************************!*\
  !*** ./lib/pokemon.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./util */ "./lib/util.js");

class Pokemon {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.destination = options.destination;
    this.selected = options.selected;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, true);
    // ctx.strokeStyle = "green";
    // ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();

    // ctx.fillStyle = this.color;

    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    // );
    // ctx.fill();
  }

  move() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  moveTo(location) {

  }
}

module.exports = Pokemon;
 


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

/***/ "./lib/sidebar_pokemon.js":
/*!********************************!*\
  !*** ./lib/sidebar_pokemon.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const Util = __webpack_require__(/*! ./util */ "./lib/util.js");
const Pokemon = __webpack_require__(/*! ./pokemon */ "./lib/pokemon.js");

class SidebarPokemon extends Pokemon {
  constructor(options) {
    options.radius = SidebarPokemon.RADIUS;
    options.vel = [0, 0];
    options.color = options.color || Util.randomColor();
    super(options)
    this.isDragging = false;
  }

  

}

SidebarPokemon.RADIUS = 15;
/* harmony default export */ __webpack_exports__["default"] = (SidebarPokemon);

/***/ }),

/***/ "./lib/spawn_sidebar.js":
/*!******************************!*\
  !*** ./lib/spawn_sidebar.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar_pokemon */ "./lib/sidebar_pokemon.js");

const Util = __webpack_require__(/*! ./util */ "./lib/util.js");

class SpawnSidebar {
    constructor(topLeftCoords) {
        this.topLeftCoords = topLeftCoords;
        this.width = _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS * 4;

        this.pokeX = topLeftCoords[0] + (this.width / 2);
        this.ySpacing = _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS * 3;
        this.firstPokeYPosition = topLeftCoords[1] + this.ySpacing;

        this.pokemon = [new _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"]({
            pos: [this.pokeX, this.firstPokeYPosition]
          }), new _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"]({
            pos: [this.pokeX, this.firstPokeYPosition + this.ySpacing]
          }), new _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"]({
                pos: [this.pokeX, this.firstPokeYPosition + (2*this.ySpacing)]
          }), new _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"]({
                pos: [this.pokeX, this.firstPokeYPosition + (3*this.ySpacing)]
          }), new _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"]({ pos: [] })];
        this.height = this.pokemon.length * _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS * 3;
    }

    draw(ctx) {
        // ctx.restore();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.5;
        ctx.fillStyle = 'white';
        ctx.fillRect(this.topLeftCoords[0], this.topLeftCoords[1], this.width, this.height);

        this.pokemon.forEach(poke => {
            poke.draw(ctx);
        });
        // ctx.save();
    }

    offsetSidebar(offsetX, offsetY) {
        this.topLeftCoords[0] += offsetX;
        this.topLeftCoords[1] += offsetY;
    }

    updateDraggedPoke(pos) {
        this.pokemon.filter(poke => poke.isDragging)[0].pos = pos;
    }

}

/* harmony default export */ __webpack_exports__["default"] = (SpawnSidebar);

/***/ }),

/***/ "./lib/ui.js":
/*!*******************!*\
  !*** ./lib/ui.js ***!
  \*******************/
/*! exports provided: SelectorRectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectorRectangle", function() { return SelectorRectangle; });
const Util = __webpack_require__(/*! ./util */ "./lib/util.js"); 

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

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {


const Util = {
  // Find distance between two points.
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  // Direction vector between two points.
  direction(pos1, pos2) {
    return [
      (pos2[0] - pos1[0]) / Util.dist(pos1, pos2),
      (pos2[1] - pos1[1]) / Util.dist(pos1, pos2)]
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

    if ((x - ax) * bax + (y - ay) * bay < 0.0) {return false}
    if ((x - bx) * bax + (y - by) * bay > 0.0) {return false}
    if ((x - ax) * dax + (y - ay) * day < 0.0) {return false}
    if ((x - dx) * dax + (y - dy) * day > 0.0) {return false}

    return true
  },
  randomColor() {
    const hexDigits = "0123456789ABCDEF";

    let color = "#";
    for (let i = 0; i < 3; i++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map