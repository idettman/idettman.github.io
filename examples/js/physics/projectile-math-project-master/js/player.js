var dmgcd = 100;

var player = {
  x:0,
  y:-1,
  width:60,
  height:60,
  speed:0,       // 
  maxSpeed:250,  // MAX Speed, pixels per second  gamecoden alussa uusiks
  acceleration:2000,
  deAcceleration:900,
  jumpSpeed:0,
  jumpForce:450,
  jumping:false,
  falling:false,
  doubleJump:false,
  gravity:900,
  lastJumpY:undefined,
  grounded:false,
  l:false,
  r:false,
  u:false,
  d:false,
  lastDir:"dirRight",
  health:100,
  checkpoint:{x:18,y:-100},
  maxJumpSpeed: 750,
  dmgcd:0,
  s:60

  
};

playerDead = function(){
  player.health = 100;
  player.x = player.checkpoint.x;
  player.y = player.checkpoint.y;
  player.speed = 0;
  player.jumpSpeed= 0;
  lavaHeight = player.y+500;
}

