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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ \"./lib/ui.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./lib/util.js\");\nconst PlayerPokemon = __webpack_require__(/*! ./player_pokemon */ \"./lib/player_pokemon.js\");\n\n\nclass Board {\n    constructor(ctx) {\n        this.ctx = ctx;\n        this.enemyPokemon = [];\n        this.playerPokemon = [];\n        this.selectorRectangle = null;\n        this.previousLeftMouseClick = [];\n    }\n\n    add(object) {\n        if (object instanceof PlayerPokemon) {\n            this.playerPokemon.push(object);\n        } else  {\n            throw new Error(\"unknown type of object\");\n        }\n    }\n\n    addPlayerPokemon(pos) {\n        const playerPokemon = new PlayerPokemon({\n            pos: pos || this.randomPosition(),\n        });\n\n        this.add(playerPokemon);\n        return playerPokemon;\n    }\n\n    randomPosition() {\n        return [\n            Game.DIM_X * Math.random(),\n            Game.DIM_Y * Math.random()\n        ];\n    }\n\n    allObjects() {\n        if (this.selectorRectangle) {\n            return [].concat(this.playerPokemon, this.enemyPokemon, [this.selectorRectangle]);\n        } else {\n            return [].concat(this.playerPokemon, this.enemyPokemon);\n        }\n    }\n\n    allPokemon() {\n        return [].concat(this.playerPokemon, this.enemyPokemon);\n    }\n\n    moveObjects(delta) {\n        this.allPokemon().forEach((object) => {\n            if (object instanceof PlayerPokemon){ \n                object.move(delta);\n            }\n        });\n        }\n\n        step(delta) {\n        this.moveObjects(delta);\n        this.checkDestinations();\n        // this.checkCollisions();\n    }\n\n    checkDestinations() {\n        this.allPokemon().filter(obj => obj.destination).forEach( obj => {\n            if(Util.dist(obj.pos, obj.destination) <= (obj.radius / 2) ) {\n                obj.vel = [0,0];\n            }\n        })\n    }\n\n    pokemonClicked(pokemon, clickPos){\n        if(Util.dist(pokemon.pos, clickPos) <= (pokemon.radius + 3)) {\n            return true;\n        } else {\n            return false;\n        }\n    }\n\n    // handleMouseClick(e) {\n    //     e.preventDefault();\n    //     if(e.button == 0) { \n    //         this.handleLeftMouseClick(e)\n    //     }\n    //     if(e.button == 1) { \n    //         // middle-mouse\n    //     }\n    //     if(e.button == 2) { \n    //         this.handleLeftMouseClick(e)\n    //     }\n\n    // }\n    selectOnePokemon(selectedPoke) {\n        selectedPoke.selected = true\n        this.playerPokemon.forEach( poke => { \n            if(poke != selectedPoke) {\n                poke.selected = false;\n            }\n        });\n        return selectedPoke;\n    }\n\n    selectOnlyThesePokemon(selectedPokes) {\n        selectedPokes.forEach(poke => {\n            poke.selected = true;\n        });\n\n        this.playerPokemon.forEach( poke => { \n            if(!selectedPokes.includes(poke)) {\n                poke.selected = false;\n            }\n        });\n        return selectedPokes;\n    }\n\n    handleLeftMouseClick(e) {\n        this.previousLeftMouseClick = [e.x,e.y]\n        this.playerPokemon.forEach( poke => {\n            if(this.pokemonClicked(poke, [e.x,e.y])) {\n                this.selectOnePokemon(poke);\n            }\n        })\n    }\n\n    handleRightMouseClick(e) {\n        e.preventDefault();\n        let didDeselect = false;\n        this.playerPokemon.forEach( poke => {\n            if(this.pokemonClicked(poke, [e.x,e.y])) {\n                poke.selected = false;\n                didDeselect = true;\n            }\n        })\n        if (!didDeselect) {\n        this.playerPokemon.forEach( poke => {\n            if(poke.selected) {\n                poke.vel = Util.direction(poke.pos,[e.x,e.y]);\n                poke.destination = [e.x,e.y];\n            }\n        })\n        }\n    }\n\n    handleMouseDownAndMouseMove(e) {\n        if (!this.selectorRectangle) {\n            this.selectorRectangle = new _ui__WEBPACK_IMPORTED_MODULE_0__[\"SelectorRectangle\"](this.previousLeftMouseClick,[e.x,e.y]);\n        } else {\n            console.log([e.x,e.y])\n            this.selectorRectangle.setEndCoords([e.x,e.y]);\n        }\n    }\n\n    handleMouseUp(e) {\n        this.groupSelect();\n        this.selectorRectangle = null;\n    }\n\n\n\n    groupSelect() {\n        if(!this.selectorRectangle) return;\n        this.selectOnlyThesePokemon(this.playerPokemon.filter(poke => _ui__WEBPACK_IMPORTED_MODULE_0__[\"SelectorRectangle\"].inSelectRectangle(poke.pos)))\n    }\n\n    draw(ctx) {\n        ctx.clearRect(0, 0, Board.DIM_X, Board.DIM_Y);\n        ctx.fillStyle = Board.BG_COLOR;\n        ctx.fillRect(0, 0, Board.DIM_X, Board.DIM_Y);\n\n        this.allObjects().forEach((object) => {\n            // console.log('draw object:' + object)\n            if(object instanceof PlayerPokemon) {\n                // console.log(object.selected)\n            }\n            object.draw(ctx);\n        });\n    }\n\n    start() {\n        this.lastTime = 0;\n        // start the animation\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n    animate(time) {\n        const timeDelta = time - this.lastTime;\n\n        this.step(timeDelta);\n        this.draw(this.ctx);\n        this.lastTime = time;\n\n        // every call to animate requests causes another call to animate\n        requestAnimationFrame(this.animate.bind(this));\n    }\n}\n\nBoard.BG_COLOR = \"#28ba32\";\nBoard.DIM_X = 1000;\nBoard.DIM_Y = 300;\nBoard.FPS = 32;\n// Board.MOVES = {\n//   w: [0, -1],\n//   a: [-1, 0],\n//   s: [0, 1],\n//   d: [1, 0],\n// };\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Board);\n\n\n// class GameView {\n//   constructor(game, ctx) {\n//     this.ctx = ctx;\n//     this.game = game;\n//     this.player_pokemon = this.game.addPlayerPokemon();\n//   }\n\n// //   bindKeyHandlers() {\n// //     const player_pokemon = this.player_pokemon;\n\n// //     Object.keys(GameView.MOVES).forEach((k) => {\n// //       const direction = GameView.MOVES[k];\n// //       key(k, () => { player_pokemon.move(direction); });\n// //     });\n\n// //     key()\n\n// //   }\n\n//   start() {\n//     this.lastTime = 0;\n//     // start the animation\n//     requestAnimationFrame(this.animate.bind(this));\n//   }\n\n//   animate(time) {\n//     const timeDelta = time - this.lastTime;\n\n//     this.game.step(timeDelta);\n//     this.game.draw(this.ctx);\n//     this.lastTime = time;\n\n//     // every call to animate requests causes another call to animate\n//     requestAnimationFrame(this.animate.bind(this));\n//   }\n// }\n\n// GameView.MOVES = {\n//   w: [0, -1],\n//   a: [-1, 0],\n//   s: [0, 1],\n//   d: [1, 0],\n// };\n\n// module.exports = GameView;\n\n//# sourceURL=webpack:///./lib/board.js?");

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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./lib/board.js\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ \"./lib/ui.js\");\n// const MovingObject = require(\"./moving_object.js\");\n// const Util = require(\"./util.js\");\n// const Game = require(\"./game.js\");\n// window.Game = Game;\n// window.MovingObject = MovingObject;\n// window.ctx = document.getElementById(\"game-canvas\").getContext(\"2d\");\n\n// console.log(\"Webpack is working!\");\n// console.log(\"test!\");\n\n// function PokeRoyale(options) {\n//   PokeRoyale.prototype.COLOR = 'pink';\n//   PokeRoyale.prototype.RADIUS = 69; \n//   MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: Util.randomVec(this.RADIUS)});\n//   // const mo = new MovingObject({color: this.COLOR, radius: this.RADIUS, vel: Util.randomVec(this.RADIUS)});\n// }\n// // Asteroid.prototype.COLOR = 'pink';\n// // Asteroid.prototype.RADIUS = 69; \n\n// Util.inherits(Asteroid, MovingObject);\n// window.PokeRoyale = PokeRoyale;\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n  canvasEl.width = _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"].DIM_X;\n  canvasEl.height = _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"].DIM_Y;\n\n  const ctx = canvasEl.getContext(\"2d\");\n  const board = new _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx);\n  board.start();\n\n  // Needs to be deleted later as User chooses either fire/water/grass at start\n  board.addPlayerPokemon([100,100])\n  board.addPlayerPokemon([200,200])\n\n  canvasEl.addEventListener(\"mousedown\", function(e){\n    board.handleLeftMouseClick.bind(board)(e)\n    this.onmousemove = function(e) {\n        board.handleMouseDownAndMouseMove.bind(board)(e);\n     }\n    // this.addEventListener(\"mousemove\", board.handleMouseDownAndMouseMove.bind(board));\n  });\n  canvasEl.addEventListener(\"mouseup\", function(e){\n      board.handleMouseUp.bind(board)(e);\n      this.onmousemove = null;\n      // this.removeEventListener(\"mousemove\", board.handleMouseDownAndMouseMove);\n  });\n  canvasEl.addEventListener('click', function(e){\n    this.onmousemove = null;\n    board.handleLeftMouseClick.bind(board)(e);},\n    false);\n  canvasEl.addEventListener('contextmenu', function(e){\n    this.onmousemove = null;\n    board.handleRightMouseClick.bind(board)(e);\n  }, false);\n\n  window.ctx = ctx;\n});\n\n\n\n\n//# sourceURL=webpack:///./lib/poke_royale.js?");

/***/ }),

/***/ "./lib/pokemon.js":
/*!************************!*\
  !*** ./lib/pokemon.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./lib/util.js\");\n\nclass Pokemon {\n  constructor(options) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.color = options.color;\n    this.destination = options.destination;\n  }\n\n  draw(ctx) {\n    ctx.beginPath();\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, true);\n    // ctx.strokeStyle = \"green\";\n    // ctx.lineWidth = 5;\n    ctx.stroke();\n    ctx.fillStyle = this.color;\n    ctx.fill();\n\n\n    // ctx.fillStyle = this.color;\n\n    // ctx.beginPath();\n    // ctx.arc(\n    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n    // );\n    // ctx.fill();\n  }\n\n  move() {\n    this.pos[0] += this.vel[0];\n    this.pos[1] += this.vel[1];\n  }\n\n  moveTo(location) {\n\n  }\n}\n\nmodule.exports = Pokemon;\n \n\n\n// class MovingObject {\n//   constructor(options) {\n//     this.pos = options.pos;\n//     this.vel = options.vel;\n//     this.radius = options.radius;\n//     this.color = options.color;\n//     this.game = options.game;\n//     this.isWrappable = true;\n//   }\n\n//   collideWith(otherObject) {\n//     // default do nothing\n//   }\n\n//   draw(ctx) {\n//     ctx.fillStyle = this.color;\n\n//     ctx.beginPath();\n//     ctx.arc(\n//       this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n//     );\n//     ctx.fill();\n//   }\n\n//   isCollidedWith(otherObject) {\n//     const centerDist = Util.dist(this.pos, otherObject.pos);\n//     return centerDist < (this.radius + otherObject.radius);\n//   }\n\n//   move(timeDelta) {\n//     // timeDelta is number of milliseconds since last move\n//     // if the computer is busy the time delta will be larger\n//     // in this case the MovingObject should move farther in this frame\n//     // velocity of object is how far it should move in 1/60th of a second\n//       this.pos[0] += this.vel[0];\n//       this.pos[1] += this.vel[1];\n    \n//     // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n//     //     offsetX = this.vel[0] * velocityScale,\n//     //     offsetY = this.vel[1] * velocityScale;\n\n//     // this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n\n//     // if (this.game.isOutOfBounds(this.pos)) {\n//     //   if (this.isWrappable) {\n//     //     this.pos = this.game.wrap(this.pos);\n//     //   } else {\n//     //     this.remove();\n//     //   }\n//     // }\n//   }\n\n//   remove() {\n//     this.game.remove(this);\n//   }\n// }\n\n// const NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\n// module.exports = MovingObject;\n\n\n//# sourceURL=webpack:///./lib/pokemon.js?");

/***/ }),

/***/ "./lib/ui.js":
/*!*******************!*\
  !*** ./lib/ui.js ***!
  \*******************/
/*! exports provided: SelectorRectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SelectorRectangle\", function() { return SelectorRectangle; });\nconst Util = __webpack_require__(/*! ./util */ \"./lib/util.js\"); \n\nclass SelectorRectangle {\n    constructor(startCoords, endCoords) {\n        this.startCoords = startCoords; \n        this.endCoords = endCoords; \n        this.thirdCoord = [this.startCoords[0],this.endCoords[1]]\n        this.defineRect = [\n            this.startCoords[0],\n             this.startCoords[1],\n              this.endCoords[0],\n               this.endCoords[1],\n               this.thirdCoord[0],\n               this.thirdCoord[1]];\n    }\n\n    setEndCoords(coords) {\n        this.endCoords = coords;\n    }\n\n    // inSelectRectangle(coords) {\n    //     return Util.inRect(coords, this.defineRect));\n    // }\n\n    draw(ctx) {\n        // ctx.fillStyle = 'black';\n        // ctx.fillRect(100,100,200,200);\n        ctx.strokeStyle = 'black';\n        ctx.lineWidth = 0.5;\n        const x = this.endCoords[0] - this.startCoords[0];\n        const y = this.endCoords[1] - this.startCoords[1];\n        ctx.strokeRect(this.startCoords[0],this.startCoords[1],x,y);\n\n        // ctx.rect(this.topleft[0],this.topleft[1],this.bottomRight[0],this.bottomRight[1]);\n        // ctx.stroke();\n    }\n\n\n}\n\n\n\n//# sourceURL=webpack:///./lib/ui.js?");

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst Util = {\n  // Find distance between two points.\n  dist(pos1, pos2) {\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n  // Direction vector between two points.\n  direction(pos1, pos2) {\n    return [\n      (pos2[0] - pos1[0]) / Util.dist(pos1, pos2),\n      (pos2[1] - pos1[1]) / Util.dist(pos1, pos2)]\n  }\n  // Note we need 3 points for the rect in case the rectangle is tilted\n  // Corners in ax,ay,bx,by,dx,dy\n  // Point in x, y\n  // Source: https://stackoverflow.com/a/2752754/2734863\n  // inRect(point, rect){\n  //   [x, y] = point;\n  //   [ax, ay, bx, by, dx, dy] = rect;\n  //   const bax = bx - ax;\n  //   const bay = by - ay;\n  //   const dax = dx - ax;\n  //   const day = dy - ay;\n\n  //   if ((x - ax) * bax + (y - ay) * bay < 0.0) {return false}\n  //   if ((x - bx) * bax + (y - by) * bay > 0.0) {return false}\n  //   if ((x - ax) * dax + (y - ay) * day < 0.0) {return false}\n  //   if ((x - dx) * dax + (y - dy) * day > 0.0) {return false}\n\n  //   return true\n  // }\n\n  // randomVec(length) {\n  //  const deg = 2 * Math.PI * Math.random();\n  //  return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  // },\n  // scale(vec, m) {\n  //   return [vec[0] * m, vec[1] * m];\n  // },\n  // inherits(childClass, parentClass) {\n  //   function Surrogate() {}\n  //   Surrogate.prototype = parentClass.prototype;\n  //   surrogate = new Surrogate();    \n  //   childClass.prototype = surrogate;\n  //   childClass.prototype.constructor = childClass;\n  // }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./lib/util.js?");

/***/ })

/******/ });