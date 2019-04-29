var topCol = function(a, b){
   if  ((b.y < a.y+a.height)&&(b.y + 15 > a.y+a.height) && (b.x+2<a.x+a.width) && (b.x+28>a.x))
      {
      	return true;}
    else {
    	return false;}  
  };
var topCol2 = function(a, b){
   if  ((b.y < a.y+5)&&(b.y + 15 > a.y+5) && (b.x+2<a.x+5) && (b.x+28>a.x))
      {
        return true;}
    else {
      return false;}  
  };
var topCol3 = function(a, b){
   if  ((b.y < a.y+a.height)&&(b.y + b.s/4 > a.y+a.height) && (b.x+5<a.x+a.width) && (b.x+b.s-5>a.x)){
        return true;
      }
    else {
      return false;
    }  
};


/*
		========= <----
		|		    |
		|	a	    |
		---------
		
*/

  var bottomCol = function(a, b){
   if  ((a.y < b.y+28) && (a.y > b.y+15) && (b.x<a.x+a.width-5) && (b.x+25>a.x))
      {
      	return true;}
    else {
    	return false;}  
  };

    var bottomCol2 = function(a, b){
   if  (a.y < b.y+b.s && a.y > b.y+50 && b.x<a.x+a.width-5 && b.x+b.s-5>a.x)
      {
        alert(b.s+b.y+" bs"+b.s+" ay"+a.y);
        return true;
        }
    else {
      return false;}  
  };
   var bottomCol3 = function(a, b){
   if  (a.x+1<b.x+b.s && a.x+a.width-1>b.x && a.y<b.y+b.s && a.y>b.y+b.s-10)
      {
        
        return true;
        }
    else {
      return false;}  
  };

 
var leftCol = function (a, b){
    if ((b.y+15 < a.y+a.height)&&(b.y + 15 > a.y) && (b.x<a.x+a.width) && (b.x+10>a.x))
      {return true;}
    else {return false;} 
}
var rightCol = function (a, b){
    if ((b.y+15 < a.y+a.height)&&(b.y + 15 > a.y) && (a.x+a.width>b.x+20) && (a.x<b.x+30))
      {return true;}
    else {return false;} 
}

var leftCol2 = function (a, b){
    if ((b.y+b.s/2 < a.y+a.height)&&(b.y + b.s/2 > a.y) && (b.x<a.x+a.width) && (b.x+10>a.x))
      {return true;}
    else {return false;} 
}
var rightCol2 = function (a, b){
    if ((b.y+b.s/2 < a.y+a.height)&&(b.y + b.s/2 > a.y) && (a.x+a.width>b.x+b.s-10) && (a.x<b.x+b.s))
      {return true;}
    else {return false;} 
}

var leftCol3 = function (a, b){
    if (a.y<b.y+b.s && a.y+a.height-2>b.y && a.x+a.width>b.x && a.x+a.width<b.x+10)
      {return true;}
    else {return false;} 
}

var rightCol3 = function (a, b){
    if (a.y<b.y+b.s && a.y+a.height-2>b.y && a.x<b.x+b.s && a.x>b.x+b.s-10)
      {return true;}
    else {return false;} 
}

var rectCol = function (a, b){
  if (((a.x <= b.x && b.x <= a.x+a.width) || (a.x<=b.x+b.width  && b.x+b.width <= a.x+a.width)) 
       && 
     ((a.y <= b.y && b.y <= a.y+a.height) || (a.y<=b.y+b.height && b.y+b.height<=a.y+a.height))){
        return true;
  }
  else return false;
}

var rectCol2 = function (a, b){
  if (((a.x <= b.x && b.x <= a.x+a.s) || (a.x<=b.x+b.s  && b.x+b.s <= a.x+a.s)) 
       && 
     ((a.y+2 <= b.y && b.y <= a.y+a.s) || (a.y+2<=b.y+b.s && b.y+b.s<=a.y+a.s))){
        return true;
  }
  else return false;
}

var rectDotCol = function(rectX,rectY,rectWidth,rectHeigth,dotX,dotY){
	if (rectX<=dotX && rectX+rectWidth>=dotX && rectY<=dotY && rectY+rectHeigth>=dotY){
		return true;}
    else {
    	return false;}  
  };
var rectDotCol2 = function(a,b){ // b= rect, a = dot
  if (b.x<=a.x && b.x+b.width>=a.x && b.y<=a.y && b.y+b.height>=a.y){ 
    return true;}
    else {
      return false;}  
  };
var rectDotCol4 = function(a,b){ // b= rect, a = dot  rect width & height 64
  if (b.x<=a.x && b.x+64>=a.x && b.y<=a.y && b.y+64>=a.y){ 
    return true;}
    else {
      return false;}  
  };

var rectDotCol3 = function(a,b){ // b= rect, a = dot  ei toimi
  //console.log(a.x);
  if (b.x<=a.x && b.x+64>=a.x && b.y<=a.y && b.y+64>=a.y){ 
    return true;}
    else {
      return false;}  
  };