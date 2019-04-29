//maps

// JSON.stringify(blocks).replace(/"/g,"");

var blocks =[];
//var checkpoints =[{"x":450,"y":100,"visited":false},{"x":1450,"y":200,"visited":false},{"x":1746,"y":536,"visited":false},{"x":2831,"y":857,"visited":false},{"x":3746,"y":664,"visited":false},{"x":833,"y":992,"visited":false}];
var checkpoints =[];
var levelEnd = {};
var levelsCompleted = [0,0,0,0,0];

var blink = -1;

var currentLevel=1;
var finalLevel=false;

var level1 = function(){
	blocks = [];
  	player.x=0;
 	player.y=-2;
 	player.checkpoint = {x:18,y:-100};
 	player.health = 100;
 	enemyArr = [];
 	checkpoints =[];
 	levelEnd = {};
 	
 	currentLevel = 1;
}



var lavaHeight = 500;



var mapRender = function(){

  ctx.save();
	ctx.beginPath();
	
	ctx.fillStyle = "#5f5";
	ctx.rect(0,0,100000,64);
	ctx.fill();
	ctx.closePath();
	ctx.restore();
	

}



var mapRender2= function(){
	
	

}

