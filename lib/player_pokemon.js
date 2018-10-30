const MovingObject = require("./moving_object");
const Util = require("./util");

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

class PlayerPokemon extends MovingObject {
  constructor(options) {
    options.radius = PlayerPokemon.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();
    super(options);
  }

//   fireBullet() {
//     const norm = Util.norm(this.vel);

//     if (norm === 0) {
//       // Can't fire unless moving.
//       return;
//     }

//     const relVel = Util.scale(
//       Util.dir(this.vel),
//       Bullet.SPEED
//     );

//     const bulletVel = [
//       relVel[0] + this.vel[0], relVel[1] + this.vel[1]
//     ];

//     const bullet = new Bullet({
//       pos: this.pos,
//       vel: bulletVel,
//       color: this.color,
//       game: this.game
//     });

//     this.game.add(bullet);
//   }a
  
//   move(direction) {
//     this.vel[0] = direction[0];
//     this.vel[1] = direction[1];
//     console.log(this.vel[0])
//   }

//   acceleration(impulse) {
//     this.vel[0] += impulse[0];
//     this.vel[1] += impulse[1];
//   }

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }
}

PlayerPokemon.RADIUS = 15;
module.exports = PlayerPokemon;
