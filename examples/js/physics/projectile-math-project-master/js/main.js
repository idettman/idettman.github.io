var canvasSize = function(a,b){
  canvas.width = a;
  canvas.height = b;
}

var goorotation = 0;


// get level code from editor (prompt method can only give small level codes)
var getLevel = function(){
	levelCode=JSON.stringify(blocks);
	window.prompt("CTRL+C to copy level code", levelCode);
}
// push level code to the editor
var pushLevel = function(){
	levelCode = window.prompt("Give level code", "");
	realLevelCode = JSON.parse(levelCode);
	blocks = realLevelCode;

}
// reseting level code
var resetLevel = function(){		
	blocks = [];
}


var freedrawing = true;
var freedraw = function(){
	if (freedrawing==false){
		freedrawing = true;
	}
	else{
		freedrawing = false;
	}
}

var blockType = 1;
var changeBlockType = function(x){
	blockType = x;
}



function rand_range(a, b) {
    return Math.floor(Math.random()*(b-a+1))+a;
}

function rand_range2(a, b) {
    return Math.floor(Math.random()*(b-a+1))+a;
}



var spaceKey = upKey= fourKey = downKey = leftKey = rightKey = rKey = escKey = altKey = oneKey = twoKey = threeKey = false;
var mouseX;
var mouseY;

function keys(e, updown) {                           // kopio kuittisen esimerkistä. pari muutosta
   var code, elem;
    e = e || window.event;
    if (e.keyCode)
        code = e.keyCode;
    else if (e.which)
        code = e.which;
    var mode = (updown=="down");
      
      //Player
          if (code==37 || code==65) leftKey = mode;  // nuolinäppäimet ja WASD
          if (code==39 || code==68) rightKey = mode;         
          if (code==38 || code==87) upKey = mode;
          if (code==40 || code==83) downKey = mode;

          if (code==32) spaceKey = mode; 
          if (code==18) altKey = mode;
          if (code==16) shiftKey = mode;
          if (code==82) rKey = mode;
          if (code==27) escKey = mode;
          if (code==48) zeroKey = mode;
          if (code==49) oneKey = mode;
          if (code==50) twoKey = mode;
          if (code==51) threeKey = mode;
          if (code==52) fourKey = mode;
          if (code==53) fiveKey = mode;
          if (code==54) sixKey = mode;
          if (code==55) sevenKey = mode;
          if (code==56) eightKey = mode;
          if (code==57) nineKey = mode;
      return true;
};
var gameKey={};

//var gK;

/*var gKUpdate = function(s,l,r,u,d,e){
	gK = function(){
		gameKeys = {
			shoot : s,
			left : l,
			right : r,
			up : u,
			down : d,
			esc : e
		}
	}
}*/

//var jepui = true;
/*var shootKey;
var updateGameKeys = function(){
		if (jepui==true){
			shootKey = prompt("ampumis nappi(kirjain tai numero)", "");
			
			
				shootKey = shootKey+"Key";
			
			
			jepui=false;
		}
		gKUpdate(eval('('+shootKey+')'),leftKey,rightKey,upKey,downKey,escKey);

		gK();
		//gameKey = {
		//	shoot : s,
		//	left : l,
		//	right : r,
		//	up : u,
		//	down : d,
		//	esc : e
		//}
		gameKey = gameKeys;


}*/

var gameControlsUpdate = function() {          // TÄÄ TOIMII
	gameControls = function(){
		gameKey = {
			shoot : shiftKey,
			left : leftKey,
			right : rightKey,                             
			up : upKey,
			down : downKey,
			esc : escKey
		}
	}
}

var gameControls = function(){
	gameKey = {
		shoot : rKey,
		left : leftKey,
		right : rightKey,
		up : upKey,
		down : downKey,
		esc : escKey
	}
}





var mouseDown = false;
function mousedown(){
	mouseDown = true;
	/*if (mouseX>=0 && mouseX<=canvas.width && mouseY>=0 && mouseY<=canvas.height){
    bulletPush();
  } */

}
function mouseup(){
	mouseDown = false;
  if (gameRunning && menuRunning == false){
    if (mouseX>=0 && mouseX<=canvas.width && mouseY>=0 && mouseY<=canvas.height){
     // bulletPush();
    }
  }
}

var getMouseCoords = function(event){
      var x = event.pageX;
      var y = event.pageY;
       mouseX = x;
       mouseY = y;
     }






var gameOrEditor = function(){
	if (gameRunning){
		gameRunning = false;
		editorRunning = true;
	}else if (!gameRunning){
		editorRunning = false;
		gameRunning = true;

	}
}

var deltaTime = 0;
var ok = true;
var gameRunning = false;
var menuRunning = true;
var editorRunning = false;
var renderDeltaTime=1000;
//var fps = 60;
var maxDT = 0;


var toggle;

level1();

var main = function () {
	
	var now = Date.now();
	deltaTime = now - then;
	gameControls();
	/*gameKey = {
		shoot : rKey,
		left : leftKey,
		right : rightKey,
		up : upKey,
		down : downKey,
		esc : escKey
	}*/
	//updateGameKeys(spaceKey,leftKey,rightKey,upKey,downKey,escKey);
	

	if (maxDT < deltaTime){
		maxDT = deltaTime;

	}

	
		deltaTime =20;
	

	if (menuRunning == true){
		menu();

		//menurender();
		//render();
		//menu();
	} else if(gameRunning){ 
		game(deltaTime / 1000);

		if (escKey){
			gameRunning=false;
			menuRunning=true;
		}
	  	//render();
	  	
	} else if(editorRunning){ 
		
		editorcode(deltaTime / 1000);
		
		//camera.x = player.x-canvas.width/2;
		//camera.y = player.y-canvas.height/2;
		//render();

	  	
	};
	if (renderDeltaTime > 3000){
		maxDT = 0;
		renderDeltaTime= 0;
	}
	document.getElementById("id_speed").innerHTML="Lähtönopeus: "+currentWeapon.speed+"m/s";
  	document.getElementById("id_tiheys").innerHTML="Ilmantiheys: "+ilmantiheys;
  	document.getElementById("id_caliber").innerHTML="Kaliiperi: "+caliber*1000+"mm";
  	document.getElementById("id_mass").innerHTML="Massa: "+bulletMass*1000+"g";
  	document.getElementById("id_gravity").innerHTML="Painovoima: "+bulletGravity+"m/s^2";
  	document.getElementById("id_muoto").innerHTML="Muotokerroin: "+muotokerroin;
	//alert(bulletSpeedX+" deltatime"+deltaTime);
  	renderDeltaTime+=deltaTime;
  	then = now;
  	render(deltaTime / 1000);
  	
  	
  	
  	
};
var muotokerroinSlide = function(){

	muotokerroin = document.getElementById("id_muotoSlider").value/1000;
}
var bulletGravitySlide = function(){
	
	bulletGravity = document.getElementById("id_gravitySlider").value/100;
}
var tiheysSlide = function(){
	
	ilmantiheys = document.getElementById("id_tiheysSlider").value/1000;
}
var massSlide = function(){
	
	bulletMass = document.getElementById("id_massSlider").value/100000;
}
var caliberSlide = function(){
	
	caliber = document.getElementById("id_caliberSlider").value/100000;
}
var speedSlide = function(){
	
	currentWeapon.speed = document.getElementById("id_speedSlider").value;
}

var speedButton = function(){
	currentWeapon.speed = prompt("Anna luodin lähtönopeus:","");
}
var caliberButton = function(){
	caliber= prompt("Anna luodin kaliiperi:","");
}
var massButton = function(){
	bulletMass= prompt("Anna luodin massa:","");
}
var tiheysButton = function(){
	ilmantiheys = prompt("Anna ilmantiheys:","");
}
var gravityButton = function(){
	bulletGravity= prompt("Anna painovoima:","");
}
var muotoButton = function(){
	muotokerroin = prompt("Anna muotokerroin: ","");
}

var sijaintix = function(a){
	
	player.x+=a;
	
}
var sijaintiy = function(a){
	player.y+=a;
}

var jee = 0;
var jee3 = 0;
var lol = function(){
	 if (jee <60){
      jee+=60;
    }
    else {jee = 0;}
    if (jee3 <60){
      jee3+=60;
    }
    else {jee3 = 0;}

}
var jee2 = 0;

var lol5 = function(){
	 if (jee2 <180){
      jee2+=60;
    }
    else {jee2 = 0;}
}
    
var juu = 0;
var lol2 = function(){
	 if (juu <60){
      juu+=60;
    }
    else {juu = 0;}
}
var jyy=0;
var lol4 = function(){
	 if (jyy <168){
      jyy+=56;
    }
    else {jyy = 0;}
}

var jii = 0;
var lol3 = function(){
	 if (jii <192){
      jii+=64;
    }
    else {jii = 0;}
}
var jiu = 0;
var lol6 = function(){
	 if (jiu <832){
      jiu+=64;
    }
    else {jiu = 0;}
}



var then = Date.now();




function animate() {
    
    //render();
    //requestAnimFrame( animate );

}
//animate();
setInterval(main, 20);
//setInterval(render, 1000 / 60);
//setInterval(menurender, 1000 / 60);


setInterval(lol, 1500);
setInterval(lol2, 100);
setInterval(lol3, 200);
setInterval(lol4, 100);
setInterval(lol5, 100);
setInterval(lol6, 150);