var editorcode = function(modifier){
	
	if (rKey){
		for(i=0; i<blocks.length; i++){
			
			if (blocks[i].img<=4 && rectDotCol(blocks[i].x, blocks[i].y, 30, 30, mouseX+camera.x, mouseY+camera.y)){

				blocks.splice(i,1);
				
			}
			if (blocks[i].img>=5 && rectDotCol(blocks[i].x, blocks[i].y, 64, 64, mouseX+camera.x, mouseY+camera.y)){

				blocks.splice(i,1);
				
			}
		}	 
		
		
	}

	if (upKey){
		camera.y-=1000*modifier;
		dirKeyPushed = true;
	}
	if (downKey){
		camera.y+=1000*modifier;
		dirKeyPushed = true;

	}
	if (leftKey){
		camera.x-=1000*modifier;
		dirKeyPushed = true;
	}
	if (rightKey){
		camera.x+=1000*modifier;
		dirKeyPushed = true;

	}

//  arrow keys or WASD not pushed -> rounds camera y and x position to nearest number that is  divisible with number 30
	if (!rightKey && !leftKey && !upKey && !downKey){
		camera.y = Math.round(camera.y/64)*64
		camera.x = Math.round(camera.x/64)*64
	}
	/*for(i=0; i<blocks.length; i++){
		if (blocks[i].x<=800){
			blocks[i].x++;
		}
		if (blocks[i].x>800){

			blocks[i].x=0;	
		}
	}*/


};
var newBlock = function() {
	if ( mouseX>0 && mouseY>0 && mouseY<canvas.height && mouseX<canvas.width){	

		if (blockType==1){
			newCheckpoint(Math.round(mouseX/64)*64-32+camera.x, Math.round(mouseY/64)*64-32+camera.y)
		}

		if (blockType==2) {
			newEnemy(mouseX-15+camera.x,mouseY-15+camera.y,2)
		}
		if (blockType==100) {
			newEnemy(mouseX-15+camera.x,mouseY-15+camera.y,3)
		}

		if (blockType >=3 && blockType <=99){	

			if (mouseX>=0 && mouseX<=canvas.width && mouseY>=0 && mouseY<=canvas.height){
				if (freedrawing==true){
					if (blockType <=4){	
						blocks.push({
							x:mouseX-15+camera.x,
							y:mouseY-15+camera.y,
							s:30,
							img:blockType,
						});
					}
					if (blockType >=10){	
						blocks.push({
							x:mouseX-32+camera.x,
							y:mouseY-32+camera.y,
							s:64,
							img:blockType,
						});
					}
						
				}
				if (freedrawing==false){
					if (blockType <=4){
						blocks.push({
							x:Math.round(mouseX/enemyImg.width)*enemyImg.width-15+camera.x,
							y:Math.round(mouseY/enemyImg.height)*enemyImg.height-15+camera.y,
							s:30,
							img:blockType,
						});
					}
					if (blockType >=10){
						blocks.push({
							x:Math.round(mouseX/64)*64-32+camera.x,
							y:Math.round(mouseY/64)*64-32+camera.y,
							s:64,
							img:blockType,
						});
					}
					 
				}
			}
		}

		
		 // JSON.stringify(blocks)
	}
};

