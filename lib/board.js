const Util = require("./util");
const PlayerPokemon = require("./player_pokemon");

class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.enemyPokemon = [];
        this.playerPokemon = [];
        // this.handleLeftMouseClick.bind(this);
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
        return [
        Game.DIM_X * Math.random(),
        Game.DIM_Y * Math.random()
        ];
    }

    allObjects() {
        return [].concat(this.playerPokemon, this.enemyPokemon);
    }

    //   moveObjects(delta) {
    //     this.allObjects().forEach((object) => {
    //       object.move(delta);
    //     });
    //   }

    //   step(delta) {
    //     // this.moveObjects(delta);
    //     // this.checkCollisions();
    //   }
    pokemonClicked(pokemon, clickPos){
        if(Util.dist(pokemon.pos, clickPos) <= pokemon.radius) {
            return true;
        } else {
            return false;
        }
    }

    handleMouseClick(e) {
        e.preventDefault();
        if(e.button == 0) { 
            this.handleLeftMouseClick(e)
        }
        if(e.button == 1) { 
            // middle-mouse
        }
        if(e.button == 2) { 
            this.handleLeftMouseClick(e)
        }

    }

    handleLeftMouseClick(e) {
        this.playerPokemon.forEach( poke => {
            if(this.pokemonClicked(poke, [e.x,e.y])) {
                poke.selected = true;
            }
        })
    }

    handleRightMouseClick(e) {
        e.preventDefault();
        this.playerPokemon.forEach( poke => {
            if(this.pokemonClicked(poke, [e.x,e.y])) {
                poke.selected = false;
            }
        })
    }

    draw(ctx) {
        ctx.clearRect(0, 0, Board.DIM_X, Board.DIM_Y);
        ctx.fillStyle = Board.BG_COLOR;
        ctx.fillRect(0, 0, Board.DIM_X, Board.DIM_Y);

        this.allObjects().forEach((object) => {
            console.log('draw object:' + object)
            if(object instanceof PlayerPokemon) {
                console.log(object.selected)
            }
            object.draw(ctx);
        });
    }

    start() {
        this.lastTime = 0;
        // start the animation
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        const timeDelta = time - this.lastTime;

        // this.game.step(timeDelta);
        this.draw(this.ctx);
        this.lastTime = time;

        // every call to animate requests causes another call to animate
        requestAnimationFrame(this.animate.bind(this));
    }
}

Board.BG_COLOR = "#28ba32";
Board.DIM_X = 1000;
Board.DIM_Y = 300;
Board.FPS = 32;
// Board.MOVES = {
//   w: [0, -1],
//   a: [-1, 0],
//   s: [0, 1],
//   d: [1, 0],
// };

module.exports = Board;


// class GameView {
//   constructor(game, ctx) {
//     this.ctx = ctx;
//     this.game = game;
//     this.player_pokemon = this.game.addPlayerPokemon();
//   }

// //   bindKeyHandlers() {
// //     const player_pokemon = this.player_pokemon;

// //     Object.keys(GameView.MOVES).forEach((k) => {
// //       const direction = GameView.MOVES[k];
// //       key(k, () => { player_pokemon.move(direction); });
// //     });

// //     key()

// //   }

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