function Level(){
  this.tiles = []; //Two dimensional array of columns (x coord first)
  this.tileSize = 16;
  this.bg = null;
}

function Tile(sprite, solid){
  this.sprite = sprite;
  this.solid = solid;
  this.transparent = false;
}

var level = new Level();
