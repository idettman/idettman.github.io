var buttons = {
  w: 250,
  h: 75
}

var menuButton1 = {
  w: 250,
  h: 75,
  x: canvas.width / 2 - 125,
  y: 100
}

var menuButton2 = {
  w: 250,
  h: 75,
  x: canvas.width / 2 - 125,
  y: menuButton1.y + 100
}

var menuButton3 = {
  w: 250,
  h: 75,
  x: canvas.width / 2 - 125,
  y: menuButton2.y + 100
}

var menuButton4 = {
  w: 250,
  h: 75,
  x: canvas.width / 2 - 125,
  y: menuButton3.y + 100
}
var menuButton5 = {
  w: 250,
  h: 75,
  x: canvas.width / 2 - 125,
  y: menuButton4.y + 100
}

var backButton = {
  txt: "Back",
  w: 100,
  h: 75,
  x: 25,
  y: 25
}

var startButton = {
  txt: "Aloita demo",
  w: 250,
  h: 75,
  x: canvas.width / 2 - 125,
  y: 100
}

var optionsButton = {
  txt: "Options",
  w: 250,
  h: 75,
  x: canvas.width / 2 - 125,
  y: startButton.y + 100
}

var leaderboardButton = {
  txt: "Leaderboards (not working)",
  w: 250,
  h: 75,
  x: canvas.width / 2 - 125,
  y: optionsButton.y + 100
}

var creditsButton = {
  txt: "Credits (not working)",
  w: 250,
  h: 75,
  x: canvas.width / 2 - 125,
  y: leaderboardButton.y + 100
}


//plusminusbutton
var pmAudioButton = {
  w: 75,
  h: 75
}

// BACKGROUND FOR MENU
var menuBg = {
  img: backgroundImg,
  x: 0,
  y: 0,
  w: backgroundImg.width,
  h: backgroundImg.height,
  rotation: 0,
  scale: 1
}

var menuPage = 1;

var menu = function () {

  if (menuPage > 1) {
    //BACK KEY
    if (gameKey.esc || (mouseDown == true && rectDotCol(backButton.x, backButton.y, backButton.w, backButton.h, mouseX, mouseY) == true)) {
      mouseup();
      if (menuPage == (2 || 3 || 4) || menuPage == 1.1) {
        menuPage = 1;
      }
      if (menuPage >= 2.1 && menuPage <= 2.9) {
        menuPage = 2;
      }
    }
  }

  if (menuPage == 1) {
    //STARTBUTTON
    if (mouseDown == true && rectDotCol(startButton.x, startButton.y, startButton.w, startButton.h, mouseX, mouseY)) {
      menuPage = 1.1;
      mouseup();

    }

  }
  // LEVEL SELECT
  if (menuPage == 1.1) {

    if (mouseDown == true) {

      if (rectDotCol(menuButton1.x, menuButton1.y, menuButton1.w, menuButton1.h, mouseX, mouseY) == true) {
        level1();
        menuRunning = false;
        gameRunning = true;
        mouseup();

      }
      if (rectDotCol(menuButton2.x, menuButton2.y, menuButton2.w, menuButton2.h, mouseX, mouseY) == true && levelsCompleted[1] == true) {
        level2();
        menuRunning = false;
        gameRunning = true;
        mouseup();

      }
      if (rectDotCol(menuButton3.x, menuButton3.y, menuButton3.w, menuButton3.h, mouseX, mouseY) == true && levelsCompleted[2] == true) {
        level3();
        menuRunning = false;
        gameRunning = true;
        mouseup();

      }
      if (rectDotCol(menuButton4.x, menuButton4.y, menuButton4.w, menuButton4.h, mouseX, mouseY) == true && levelsCompleted[3] == true) {
        level4();
        menuRunning = false;
        gameRunning = true;
        mouseup();

      }
    }
  }

  //OPTIONS
  

}
var menurender = function () {
  //ctx.font="20px Georgia"; MENU BG RENDER
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(2, 2);
  ctx.rotate(menuBg.rotation);
  ctx.drawImage(menuBg.img, -menuBg.img.width / 2, -menuBg.img.height / 2);
  ctx.restore();
  menuBg.rotation = menuBg.rotation + 1 / 5000;

  // MENUBUTTON FONT
  ctx.font = "bold 16px Arial";

  //BACK KEY
  if (menuPage > 1) {
    ctx.beginPath();
    ctx.rect(backButton.x, backButton.y, backButton.w, backButton.h);
    ctx.fillStyle = "#af1";
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "#000";
    ctx.fillText(backButton.txt, backButton.x + 10, backButton.y + backButton.h / 2 + 5);
  }

  if (menuPage == 1) {
    // STARTBUTTON
    ctx.beginPath();
    ctx.rect(startButton.x, startButton.y, startButton.w, startButton.h);
    ctx.fillStyle = "#123";
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "#fff";
    ctx.fillText(startButton.txt, startButton.x + 10, startButton.y + startButton.h / 2 + 5);

   

  }

  if (menuPage == 1.1) {
    ctx.beginPath();
    ctx.rect(menuButton1.x, menuButton1.y, menuButton1.w, menuButton1.h);
    ctx.fillStyle = "#123";
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillText("Demo level", menuButton1.x + 10, menuButton1.y + menuButton1.h / 2 + 5);
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(menuButton2.x, menuButton2.y, menuButton2.w, menuButton2.h);

  }


}