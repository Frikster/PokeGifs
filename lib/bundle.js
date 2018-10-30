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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./lib/util.js\");\nconst PlayerPokemon = __webpack_require__(/*! ./player_pokemon */ \"./lib/player_pokemon.js\");\n\nclass Board {\n    constructor(ctx) {\n        this.ctx = ctx;\n        this.enemyPokemon = [];\n        this.playerPokemon = [];\n        // this.handleLeftMouseClick.bind(this);\n    }\n\n    add(object) {\n        if (object instanceof PlayerPokemon) {\n        this.playerPokemon.push(object);\n        } else {\n        throw new Error(\"unknown type of object\");\n        }\n    }\n\n    addPlayerPokemon(pos) {\n        const playerPokemon = new PlayerPokemon({\n        pos: pos || this.randomPosition(),\n        });\n\n        this.add(playerPokemon);\n        return playerPokemon;\n    }\n\n    randomPosition() {\n        return [\n        Game.DIM_X * Math.random(),\n        Game.DIM_Y * Math.random()\n        ];\n    }\n\n    allObjects() {\n        return [].concat(this.playerPokemon, this.enemyPokemon);\n    }\n\n      moveObjects(delta) {\n        this.allObjects().forEach((object) => {\n          object.move(delta);\n        });\n      }\n\n      step(delta) {\n        this.moveObjects(delta);\n        // this.checkCollisions();\n      }\n\n    pokemonClicked(pokemon, clickPos){\n        if(Util.dist(pokemon.pos, clickPos) <= pokemon.radius) {\n            return true;\n        } else {\n            return false;\n        }\n    }\n\n    handleMouseClick(e) {\n        e.preventDefault();\n        if(e.button == 0) { \n            this.handleLeftMouseClick(e)\n        }\n        if(e.button == 1) { \n            // middle-mouse\n        }\n        if(e.button == 2) { \n            this.handleLeftMouseClick(e)\n        }\n\n    }\n\n    handleLeftMouseClick(e) {\n        this.playerPokemon.forEach( poke => {\n            if(this.pokemonClicked(poke, [e.x,e.y])) {\n                poke.selected = true;\n            }\n        })\n    }\n\n    handleRightMouseClick(e) {\n        e.preventDefault();\n        let didDeselect = false;\n        this.playerPokemon.forEach( poke => {\n            if(this.pokemonClicked(poke, [e.x,e.y])) {\n                poke.selected = false;\n                didDeselect = true;\n            }\n        })\n        if (!didDeselect) {\n        this.playerPokemon.forEach( poke => {\n            if(poke.selected) {\n                poke.vel = Util.direction(poke.pos,[e.x,e.y])\n                poke.moveTo([e.x,e.y]);\n            }\n        })\n        }\n    }\n\n    draw(ctx) {\n        ctx.clearRect(0, 0, Board.DIM_X, Board.DIM_Y);\n        ctx.fillStyle = Board.BG_COLOR;\n        ctx.fillRect(0, 0, Board.DIM_X, Board.DIM_Y);\n\n        this.allObjects().forEach((object) => {\n            console.log('draw object:' + object)\n            if(object instanceof PlayerPokemon) {\n                console.log(object.selected)\n            }\n            object.draw(ctx);\n        });\n    }\n\n    start() {\n        this.lastTime = 0;\n        // start the animation\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n    animate(time) {\n        const timeDelta = time - this.lastTime;\n\n        this.step(timeDelta);\n        this.draw(this.ctx);\n        this.lastTime = time;\n\n        // every call to animate requests causes another call to animate\n        requestAnimationFrame(this.animate.bind(this));\n    }\n}\n\nBoard.BG_COLOR = \"#28ba32\";\nBoard.DIM_X = 1000;\nBoard.DIM_Y = 300;\nBoard.FPS = 32;\n// Board.MOVES = {\n//   w: [0, -1],\n//   a: [-1, 0],\n//   s: [0, 1],\n//   d: [1, 0],\n// };\n\nmodule.exports = Board;\n\n\n// class GameView {\n//   constructor(game, ctx) {\n//     this.ctx = ctx;\n//     this.game = game;\n//     this.player_pokemon = this.game.addPlayerPokemon();\n//   }\n\n// //   bindKeyHandlers() {\n// //     const player_pokemon = this.player_pokemon;\n\n// //     Object.keys(GameView.MOVES).forEach((k) => {\n// //       const direction = GameView.MOVES[k];\n// //       key(k, () => { player_pokemon.move(direction); });\n// //     });\n\n// //     key()\n\n// //   }\n\n//   start() {\n//     this.lastTime = 0;\n//     // start the animation\n//     requestAnimationFrame(this.animate.bind(this));\n//   }\n\n//   animate(time) {\n//     const timeDelta = time - this.lastTime;\n\n//     this.game.step(timeDelta);\n//     this.game.draw(this.ctx);\n//     this.lastTime = time;\n\n//     // every call to animate requests causes another call to animate\n//     requestAnimationFrame(this.animate.bind(this));\n//   }\n// }\n\n// GameView.MOVES = {\n//   w: [0, -1],\n//   a: [-1, 0],\n//   s: [0, 1],\n//   d: [1, 0],\n// };\n\n// module.exports = GameView;\n\n//# sourceURL=webpack:///./lib/board.js?");

/***/ }),

/***/ "./lib/player_pokemon.js":
/*!*******************************!*\
  !*** ./lib/player_pokemon.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Pokemon = __webpack_require__(/*! ./pokemon */ \"./lib/pokemon.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./lib/util.js\");\n\nfunction randomColor() {\n  const hexDigits = \"0123456789ABCDEF\";\n\n  let color = \"#\";\n  for (let i = 0; i < 3; i++) {\n    color += hexDigits[Math.floor((Math.random() * 16))];\n  }\n\n  return color;\n}\n\nclass PlayerPokemon extends Pokemon {\n  constructor(options) {\n    options.radius = PlayerPokemon.RADIUS;\n    options.vel = [0, 0];\n    options.color = options.color || randomColor();\n    super(options);\n    this.selected = false;\n  }\n\n\n    \n//   fireBullet() {\n//     const norm = Util.norm(this.vel);\n\n//     if (norm === 0) {\n//       // Can't fire unless moving.\n//       return;\n//     }\n\n//     const relVel = Util.scale(\n//       Util.dir(this.vel),\n//       Bullet.SPEED\n//     );\n\n//     const bulletVel = [\n//       relVel[0] + this.vel[0], relVel[1] + this.vel[1]\n//     ];\n\n//     const bullet = new Bullet({\n//       pos: this.pos,\n//       vel: bulletVel,\n//       color: this.color,\n//       game: this.game\n//     });\n\n//     this.game.add(bullet);\n//   }a\n  \n//   move(direction) {\n//     this.vel[0] = direction[0];\n//     this.vel[1] = direction[1];\n//     console.log(this.vel[0])\n//   }\n\n//   acceleration(impulse) {\n//     this.vel[0] += impulse[0];\n//     this.vel[1] += impulse[1];\n//   }\n\n  relocate() {\n    this.pos = this.game.randomPosition();\n    this.vel = [0, 0];\n  }\n}\n\nPlayerPokemon.RADIUS = 15;\nmodule.exports = PlayerPokemon;\n\n\n//# sourceURL=webpack:///./lib/player_pokemon.js?");

/***/ }),

/***/ "./lib/poke_royale.js":
/*!****************************!*\
  !*** ./lib/poke_royale.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// const MovingObject = require(\"./moving_object.js\");\n// const Util = require(\"./util.js\");\n// const Game = require(\"./game.js\");\n// window.Game = Game;\n// window.MovingObject = MovingObject;\n// window.ctx = document.getElementById(\"game-canvas\").getContext(\"2d\");\n\n// console.log(\"Webpack is working!\");\n// console.log(\"test!\");\n\n// function PokeRoyale(options) {\n//   PokeRoyale.prototype.COLOR = 'pink';\n//   PokeRoyale.prototype.RADIUS = 69; \n//   MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: Util.randomVec(this.RADIUS)});\n//   // const mo = new MovingObject({color: this.COLOR, radius: this.RADIUS, vel: Util.randomVec(this.RADIUS)});\n// }\n// // Asteroid.prototype.COLOR = 'pink';\n// // Asteroid.prototype.RADIUS = 69; \n\n// Util.inherits(Asteroid, MovingObject);\n// window.PokeRoyale = PokeRoyale;\n\n\nconst Board = __webpack_require__(/*! ./board */ \"./lib/board.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n  canvasEl.width = Board.DIM_X;\n  canvasEl.height = Board.DIM_Y;\n\n  const ctx = canvasEl.getContext(\"2d\");\n  const board = new Board(ctx);\n  board.start();\n\n  // Needs to be deleted later as User chooses either fire/water/grass at start\n  board.addPlayerPokemon([100,100])\n  board.addPlayerPokemon([200,200])\n\n  canvasEl.addEventListener('click', board.handleLeftMouseClick.bind(board), false);\n  canvasEl.addEventListener('contextmenu', board.handleRightMouseClick.bind(board), false);\n  \n  // const game = new Game();\n  // canvasEl.addEventListener('click', clickReporter, false);\n  // new GameView(game, ctx).start();\n});\n\n\n//# sourceURL=webpack:///./lib/poke_royale.js?");

/***/ }),

/***/ "./lib/pokemon.js":
/*!************************!*\
  !*** ./lib/pokemon.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./lib/util.js\");\n\nclass Pokemon {\n  constructor(options) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.color = options.color;\n  }\n\n  draw(ctx) {\n    console.log(this.pos)\n    ctx.beginPath();\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, true);\n    // ctx.strokeStyle = \"green\";\n    // ctx.lineWidth = 5;\n    ctx.stroke();\n    ctx.fillStyle = this.color;\n    ctx.fill();\n\n\n    // ctx.fillStyle = this.color;\n\n    // ctx.beginPath();\n    // ctx.arc(\n    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n    // );\n    // ctx.fill();\n  }\n\n  move() {\n    console.log(\"MOVE():\" + this.vel[0])\n    this.pos[0] += this.vel[0];\n    this.pos[1] += this.vel[1];\n  }\n\n  moveTo(location) {\n    \n  }\n}\n\nmodule.exports = Pokemon;\n \n\n\n// class MovingObject {\n//   constructor(options) {\n//     this.pos = options.pos;\n//     this.vel = options.vel;\n//     this.radius = options.radius;\n//     this.color = options.color;\n//     this.game = options.game;\n//     this.isWrappable = true;\n//   }\n\n//   collideWith(otherObject) {\n//     // default do nothing\n//   }\n\n//   draw(ctx) {\n//     ctx.fillStyle = this.color;\n\n//     ctx.beginPath();\n//     ctx.arc(\n//       this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n//     );\n//     ctx.fill();\n//   }\n\n//   isCollidedWith(otherObject) {\n//     const centerDist = Util.dist(this.pos, otherObject.pos);\n//     return centerDist < (this.radius + otherObject.radius);\n//   }\n\n//   move(timeDelta) {\n//     // timeDelta is number of milliseconds since last move\n//     // if the computer is busy the time delta will be larger\n//     // in this case the MovingObject should move farther in this frame\n//     // velocity of object is how far it should move in 1/60th of a second\n//       this.pos[0] += this.vel[0];\n//       this.pos[1] += this.vel[1];\n    \n//     // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n//     //     offsetX = this.vel[0] * velocityScale,\n//     //     offsetY = this.vel[1] * velocityScale;\n\n//     // this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n\n//     // if (this.game.isOutOfBounds(this.pos)) {\n//     //   if (this.isWrappable) {\n//     //     this.pos = this.game.wrap(this.pos);\n//     //   } else {\n//     //     this.remove();\n//     //   }\n//     // }\n//   }\n\n//   remove() {\n//     this.game.remove(this);\n//   }\n// }\n\n// const NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\n// module.exports = MovingObject;\n\n\n//# sourceURL=webpack:///./lib/pokemon.js?");

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst Util = {\n    // Find distance between two points.\n  dist(pos1, pos2) {\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n\n  direction(pos1, pos2) {\n    return [\n      (pos2[0] - pos1[0]) / Util.dist(pos1, pos2),\n      (pos2[1] - pos1[1]) / Util.dist(pos1, pos2)]\n  }\n\n  // randomVec(length) {\n  //  const deg = 2 * Math.PI * Math.random();\n  //  return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  // },\n  // scale(vec, m) {\n  //   return [vec[0] * m, vec[1] * m];\n  // },\n  // inherits(childClass, parentClass) {\n  //   function Surrogate() {}\n  //   Surrogate.prototype = parentClass.prototype;\n  //   surrogate = new Surrogate();    \n  //   childClass.prototype = surrogate;\n  //   childClass.prototype.constructor = childClass;\n  // }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./lib/util.js?");

/***/ })

/******/ });