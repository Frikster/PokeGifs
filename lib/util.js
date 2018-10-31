
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