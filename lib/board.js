const Util = require("./util");
const PlayerPokemon = require("./player_pokemon");
import * as UI from "./ui";
import SpawnSidebar from "./spawn_sidebar";

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.offsetX = 0;
    this.offsetY = 0;
    this.enemyPokemon = [];
    this.playerPokemon = [];
    this.selectorRectangle = null;
    this.previousLeftMouseClick = [];
    this.spawnSidebar = new SpawnSidebar(Board.SPAWN_SIDEBAR_COORDS);
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
        this.selectorRectangle = new UI.SelectorRectangle(
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

export default Board;


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