const Util = require("./util");

class Pokemon {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.destination = options.destination;
    this.selected = options.selected;

    

    this.image = new Image();
    this.image.src = `../assets/spritesheets/006.png`;
    this.sprite_size = [89, 91];
    this.frames = 143 -1;
    this.current_frame = 0;
    

    // this.image = new Image();
    // this.image.src = "https://sprites.pokecheck.org/i/004.gif";
    // // debugger
    // this.image.setAttribute('rel:animated_src', "https://sprites.pokecheck.org/i/004.gif");
    // // debugger
    // let charmander = new SuperGif({
    //   gif: this.image,
    //   auto_play: false,
    //   vp_t: 0,
    //   vp_l: 0,
    //   vp_w: 5000,
    //   vp_h: 5000
    // });
    // play = (res) => {
    //   charmander.play();
    // }
    // charmander.load(res => play(res));

  }



  draw(ctx) {


    ctx.drawImage(this.image, 0, this.current_frame * this.sprite_size[1], this.sprite_size[0], this.sprite_size[1],
      this.pos[0], this.pos[1], this.sprite_size[0], this.sprite_size[1]);
    this.current_frame = (this.current_frame + 1) % this.frames;
    console.log(this.current_frame);
    
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
