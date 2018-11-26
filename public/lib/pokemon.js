const Stream = require("../vendor/stream");
const Util = require("./util");

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
      }
      superGifBack.load(playBack);

    }
    this.currentFrame = 0;   
    this.goingRound = false;
  }

  draw(ctx) {
    //TODO: delete if not needed
    if (false && !this.XMLHttpRequestData && !document.getElementById("charmander")) {
      var img = document.createElement("img");
      img.src = `https://sprites.pokecheck.org/bw/i/494.gif`;
      img.id = 'charmander'
      img.setAttribute("rel:animated_src", `https://sprites.pokecheck.org/bw/i/494.gif`);
      let div = document.getElementById("x");
      div.appendChild(img);

      img.onload = function () {
        if (!this.gifHeight && !this.gifWidth) { 
          this.gifHeight = img.height;
          this.gifWidth = img.width;
        }
      }




      let gif = document.getElementById('charmander');
      let src = gif.getAttribute('rel:animated_src')

      // fetch(src).then(res => {
      //   debugger
      // });

      var h = new XMLHttpRequest();
      h.open('GET', src, true);
      this.loading_complete.bind(this);


      // h.onload = function (e) {
      //     debugger
      //     var XMLHttpRequestData = this.response;
      //   }
      
      h.onreadystatechange = function () {
        if (h.readyState == XMLHttpRequest.DONE) {
          this.XMLHttpRequestData = h.response;

          // stream = new Stream(this.XMLHttpRequestData);
          // setTimeout(doParse, 0);
        }
      }.bind(this)
      h.send();
    } else if (false && this.XMLHttpRequestData && !this.parsed) {
      let stream = new Stream(this.XMLHttpRequestData);


      // setTimeout(Util.parseGIF(stream, handler), 0);


      let charmander = new SuperGif({
        gif: document.getElementById("charmander"),
        auto_play: false
      });
      // debugger //TODO: TRY charmander.set_frame_offset   <---> setSizes


      // charmander.load();
      // Util.parseGIF(stream, charmander.handler)
      this.parsed = true;

    }

    if (this.spritesheetCanvas && this.vel[1] >= 0) {
      ctx.drawImage(this.spritesheetCanvas, 0, this.currentFrame * this.height, this.width, this.height,
         this.pos[0] - this.width / 2, this.pos[1] - this.height / 2, this.width, this.height);
      this.currentFrame = (this.currentFrame + 1) % this.num_frames;
    } else if (this.spritesheetCanvasBack && this.vel[1] < 0) {
      ctx.drawImage(this.spritesheetCanvasBack, 0, this.currentFrame * this.height, this.width, this.height,
        this.pos[0] - this.width / 2, this.pos[1] - this.height / 2, this.width, this.height);
      this.currentFrame = (this.currentFrame + 1) % this.num_frames;
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

export default Pokemon;
 


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
