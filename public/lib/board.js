// const fs = require("file-system");
// const randomFile = require("select-random-file");
const Util = require("./util");
import PlayerPokemon from "./player_pokemon";
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

    let form = document.getElementById("custom-gif-input");
    if (form.attachEvent) {
      form.attachEvent("submit", this.handleCustomPokemonSubmit.bind(this));
    } else {
      form.addEventListener("submit", this.handleCustomPokemonSubmit.bind(this));
    }
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
      if (object instanceof PlayerPokemon) {
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

  cleanClickCoordinates(coords) {
    return [coords[0] - document.getElementById("viewport").getBoundingClientRect().x, coords[1] - document.getElementById("viewport").getBoundingClientRect().y];
  }

  handleDeleteKeyClick(e) {
    this.playerPokemon.slice(0).forEach(poke => {
      if (poke.selected) {
        this.playerPokemon.splice(this.playerPokemon.indexOf(poke), 1);
      }
    });
  }

  handleDoubleMouseClick(e) {
    this.playerPokemon.forEach(poke => {
      poke.selected = false;
    });
  }

  handleLeftMouseClick(e) {
    this.previousLeftMouseClick = this.cleanClickCoordinates([e.x, e.y]);
    let pokeClicked = false;
    this.playerPokemon.forEach(poke => {
      if (this.pokemonClicked(poke, this.cleanClickCoordinates([e.x, e.y]))) {
        this.selectOnePokemon(poke);
        pokeClicked = true;
        console.log('POKECLICKED')
      }
    });
    this.spawnSidebar.pokemon.forEach(poke => {
      if (this.pokemonClicked(poke, this.cleanClickCoordinates([e.x, e.y]))) {
        // poke.isDragging = true;
        this.dragOnePokemon(poke);
        pokeClicked = true;
        // this.selectorRectangle = null;
      }
    });
    // Deselect a group
    if(!pokeClicked && e.button === 0) {
      this.playerPokemon.forEach(poke => {
        poke.selected = false;
      });
    }
  }

  handleRightMouseClick(e) {
    e.preventDefault();
    let didDeselect = false;
    this.playerPokemon.forEach(poke => {
      if (this.pokemonClicked(poke, this.cleanClickCoordinates([e.x, e.y]))) {
        poke.selected = false;
        didDeselect = true;
      }
    });
    if (!didDeselect) {
      this.playerPokemon.forEach(poke => {
        if (poke.selected) {
          poke.setMotionAndDestination(this.cleanClickCoordinates([e.x, e.y]));
        }
      });
    }
  }

  handleMouseDownAndMouseMove(e) {
    if (!this.pokeBeingDragged()) {
      if (!this.selectorRectangle) {
        this.selectorRectangle = new UI.SelectorRectangle(
          this.previousLeftMouseClick,
          this.cleanClickCoordinates([e.x, e.y])
        );
      } else {
        this.selectorRectangle.updateRect(this.cleanClickCoordinates([e.x, e.y]));
        print(this.selectorRectangle)
      }
    } else {
      this.spawnSidebar.updateDraggedPoke(this.cleanClickCoordinates([e.x, e.y]));
    }
  }

  handleCustomPokemonSubmit(e) {
    if (e.preventDefault) e.preventDefault();
    const front = e.target.front.value;
    let back = e.target.back.value;
    // const scale = e.target.scale.value;

    const re = /(?:\.([^.]+))?$/;

    let img = document.createElement("img");
    img.src = this.front;

    // let dimCheck = setInterval(function () {
    //   debugger
    //   if (img.naturalWidth) {
    //     clearInterval(dimCheck);
    //   }
    // }, 10);


    if (re.exec(front)[1] === 'gif') {
      if (re.exec(back)[1] != "gif") { back = front;}
      let options = {
        imgSrc: front,
        imgSrcBack: back,
        imgId: Math.random().toString(36).substring(2)
          + (new Date()).getTime().toString(36),
        pos: [this.offsetX + 835, this.offsetY + 650],
        // scale: scale
      }
      this.createPokemon(options) 
    } else {
      alert("Front URL must end with '.gif'");
    }
    return false;
  }

  createPokemon(options) {
    let newPoke = new PlayerPokemon(options);
    this.playerPokemon.push(newPoke);
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
    let newPoke = new PlayerPokemon({
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
      this.playerPokemon.forEach(poke => {
        if (this.pokemonClicked(poke, this.cleanClickCoordinates([e.x, e.y]))) {
          this.selectOnePokemon(poke);
        }
      });
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

  // applyRandomBackground() {
  //   //TODO: finish
  //   let blueprint_background = new Image();
  //   const dir = '../assets/images/background'
  //   // debugger
  //   // randomFile(dir, (err, file) => {
  //   //   blueprint_background.src = file;
  //   // })
  //   blueprint_background.src = dir + `/Broag_Garden_Entrance_image.jpg`;

  //   blueprint_background.onload = function () {
  //     let pattern = ctx.createPattern(this, "repeat");
  //     ctx.fillStyle = pattern;
  //     ctx.fill();
  //   };
  // }

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
Board.SPAWN_SIDEBAR_COORDS = [50 , 50];
// Board.FPS = 32;
Board.MOVES = {
    w: [0, 20],
    a: [20, 0],
    s: [0, -20],
    d: [-20, 0],
    up: [0, 20],
    left: [20, 0],
    down: [0, -20],
    right: [-20, 0],
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