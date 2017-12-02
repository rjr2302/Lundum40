const gravity = 1.5;

var entities = [];

function Entity(x, y, img, collide){
  this.pos = [x, y];
  this.image = img;
  this.width = img.width;
  this.height = img.height;
  this.v = [0, 0];
  this.canCollide = collide || false;
  entities.push(this);

}

Entity.prototype.collide = function collide(other){};

Entity.prototype.checkEntityCollision = function checkCollision(other){
  if ((this.pos[0] + this.width >= other.pos[0] && this.pos[0] <= other.pos[0]) ||
    (other.pos[0] + other.width >= this.pos[0] && other.pos[0] <= this.pos[0])){
      if ((this.pos[1] + this.height >= other.pos[1] && this.pos[1] <= other.pos[1]) ||
        (other.pos[1] + other.height >= this.pos[1] && other.pos[1] <= this.pos[1])){
          return true;
        }
    }
  return false;
};

Entity.prototype.checkPlatformCollision = moveWithCollision(){
  let tileX, tileY;

  let dx = 0, dy = 0;

  let yMin = Math.floor(this.pos[1]/level.tileSize);
  let yMax = Math.floor()(this.pos[1]+this.height)/level.tileSize);

  let xMin = Math.floor(this.pos[0]/level.tileSize);
  let xMax = Math.floor((this.pos[0]+this.width)/level.tileSize);

  let xRange = Math.floor(Math.abs(this.v[0])/level.tileSize)+1;
  let yRange = Math.floor(Math.abs(this.v[1])/level.tileSize)+1;

  if (this.v[0] > 0){
    tileX = Math.floor((this.pos[0]+this.width)/level.tileSize);
    for (tileY = yMin; tileY <= yMax; tileY++){
      //if (level.tiles[tileX][tileY].solid) return true;
      let collided = false;
      for(; dx <= xRange; dx++){
        if (level.tiles[tileX + dx][tileY].solid) {
          collided = true;
          break;
        }
      }
      if (collided) break;
    }

    let maxMove = (dx+tileX)*level.tileSize-(this.pos[0]+this.width);
    if (maxMove < this.v[0]) {
      this.pos[0] += maxMove;
      this.v[0] = 0;
    }
    else {
      this.pos[0] += this.v[0];
    }

  }
  else if (this.v[0] < 0){
    tileX = Math.floor(this.pos[0]/level.tileSize);
    for (tileY = yMin; tileY <= yMax; tileY++){
      //if (level.tiles[tileX][tileY].solid) return true;
      let collided = false;
      for(; dx <= xRange; dx++){
        if (level.tiles[tileX - dx][tileY].solid) {
          collided = true;
          break;
        }
      }
      if (collided) break;
    }

    let maxMove = (tileX-dx+1)*level.tileSize-this.pos[0];

    if (maxMove > this.v[0]){
      this.pos[0] += maxMove;
      this.v[0] = 0;
    } else {
      this.pos[0] += this.v[0];
    }

  }



}

Entity.prototype.gravity = function gravity(){
  v[1] += gravity;
}

Entity.prototype.move = function move(){
  if (!this.canCollide) {
    this.pos[0] += this.v[0];
    this.pos[1] += this.v[1];
  } else {
    this.moveWithCollision();
    }
  }
}

Entity.prototype.tick = function tick(){};
