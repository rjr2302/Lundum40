//"use strict";
var cvs = document.getElementById("gameCanvas");
var canvas = cvs.getContext("2d");
var level = [];

/*function Sprite(src){
  this.image = new Image();
  this.image.src = src;
}*/

function Platform(x, y){
  let img = new Image();
  img.src = "images/platform.png"
  Entity.call(this, x, y, img);
}

Platform.prototype = Object.create(Entity.prototype);
Platform.prototype.constructor = Platform;

new Platform(20, 200);

var player;
var playerImage = new Image();
playerImage.onload = function (){
  player = new Entity(20, 20, playerImage);
  player.tick = function(){
    let dx = this.v[0];
    let dy = this.v[1];
    for (let i = 0; i < dx; i++){
      this.x++;
      let collide = this.checkCollision();

    }
  }
};
playerImage.src = "images/player.png";

function draw() {
  canvas.clearRect(0, 0, cvs.width, cvs.height);
  for (let e of entities){
    canvas.drawImage(e.image, e.pos[0], e.pos[1]);
  }
}

function loop(){
  for (let e of entities){
    e.tick();
  }

  draw();
  console.log("loop");
}

setInterval(loop, 18);
