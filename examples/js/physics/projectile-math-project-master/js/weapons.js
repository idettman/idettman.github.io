var bulletArray = [];
var reloading = false;
var reloadTimeLeft = 0;

/* type 0 = single shot, type 1 = automatic
	bImg:1 = bulletImg*/
var seuraaLuotia = true;
var luotiSeuraus = function () {
  if (seuraaLuotia == true) {
    seuraaLuotia = false;
  } else {
    seuraaLuotia = true;
  }
}

var ilmanvastus1 = 0;
var bulletGravity = 9.81;
var bulletSpeed = 0;
var bulletSpeedY = 0;
var bulletSpeedX = 0;
var bulletX = 0;
var bulletY = 0;
var caliber = 0.00762;
var muotokerroin = 0.295;
var ilmantiheys = 1.293;
var bulletMass = 0.008;
var lentoAika = 0;
var keskinopeusArr = [];
var keskinopeus = 0;
var keskinopeus1 = 0;
var joule = 0;
var xArr = [];
var yArr = [];
var poikkipintaala = function () {
  return Math.PI * Math.pow(caliber / 2, 2);
}

var ilmanvastus = function (v) {
  return 0.5 * ilmantiheys * Math.pow(v, 2) * muotokerroin * poikkipintaala();
}

var ykiihtyvyys = function () {
  return Math.sqrt((2 * bulletGravity * bulletMass) / (0.4 * ilmantiheys * poikkipintaala()));
}

var weapon = {
  basicWeapon: {
    name: "kivaari",
    bulletMass: 0.008,
    speed: 715,
    reloading: false,
    reloadTime: 1000,
    maxBullets: 1,
    type: 0,
    damage: 4,
    bImg: 1
  },
  secondaryWeapon: {
    name: "Airsoft ase",
    bulletMass: 0.0002,
    speed: 126,
    reloading: false,
    reloadTime: 1000,
    maxBullets: 1,
    type: 0,
    damage: 4,
    bImg: 1
  },
  shotgun: {
    name: "ihmistykki",
    bulletMass: 75,
    speed: 715,
    reloading: false,
    reloadTime: 1000,
    maxBullets: 1,
    type: 0,
    damage: 4,
    bImg: 1
  },
  railgun: {
    name: "Railgun",
    bulletMass: 10,
    speed: 2235,
    reloading: false,
    reloadTime: 1000,
    maxBullets: 1,
    type: 0,
    damage: 4,
    bImg: 1
  }
};

var currentWeapon = weapon.basicWeapon;

var randomizeWeapon = function () {
  var speed1 = rand_range(0, 2000);

  //var damage1 = rand_range(1,100);
  currentWeapon = {
    name: "randomweapon",
    bulletMass: 0.008,
    speed: speed1,
    reloading: false,
    reloadTime: 1000,
    maxBullets: 100,
    type: 0,
    damage: 4,
    bImg: 1
  };
}

var switchWeapon = function (a) {

  if (a == 1) {
    currentWeapon = weapon.basicWeapon;
  }
  if (a == 2) {
    currentWeapon = weapon.secondaryWeapon;
  }
  if (a == 3) {
    currentWeapon = weapon.shotgun;
  }
  if (a == 4) {
    currentWeapon = weapon.railgun;
  }
}
var lastWeaponAud = 0;

var speedXX = 0;
var speedYY = 0;

var bulletPush = function (startx, starty) {
  var speedX;
  var speedY;
  var direction;
  lentoAika = 0;
  speedXX = currentWeapon.speed * Math.cos(Math.atan((mouseY + camera.y - (player.y)) / (mouseX + camera.x - (player.x))));
  speedYY = currentWeapon.speed * Math.sin(Math.atan((mouseY + camera.y - (player.y)) / (mouseX + camera.x - (player.x))));
  if (reloadTimeLeft <= 0) {

    //speedX = 750;
    speedX = speedXX
    startx = player.x;
    direction = 0;

    if (mouseX + camera.x > player.x || (mouseX + camera.x == player.x && player.y < mouseY)) {
      bulletArray.push({
        x: player.x,
        y: player.y,
        sx: speedXX,
        sy: speedYY,
        dir: direction,
        bImg: 1
      });
    }
    if (mouseX + camera.x < player.x || (mouseX + camera.x == player.x && player.y > mouseY)) {
      bulletArray.push({
        x: player.x,
        y: player.y,
        sx: -speedX,
        sy: -speedYY,
        dir: direction,
        bImg: 1
      });
    }

    if (lastWeaponAud < 10) {
      lastWeaponAud++;
    } else {
      lastWeaponAud = 0
    }
    weapon1Aud[lastWeaponAud].play();

  }

};
var nopeusArr = [];
var asdaika = 0;
var bulletUpdate = function (modifier) {
  speedXX = currentWeapon.speed * Math.cos(Math.atan((mouseY + camera.y - (player.y)) / (mouseX + camera.x - (player.x))));
  speedYY = currentWeapon.speed * Math.sin(Math.atan((mouseY + camera.y - (player.y)) / (mouseX + camera.x - (player.x))));

  if (bulletArray.length > 0) {
    lentoAika += modifier;
    for (i = 0; i < bulletArray.length; i++) {

      if (bulletArray[i].y > 0) {
        alert("kantama: " + bulletArray[i].x + "m");
        bulletArray.splice(i, 1);
      }

      if (bulletArray[i].sy > 0) {

        bulletArray[i].sy -= ilmanvastus(bulletArray[i].sy) / bulletMass * modifier;

      }
      if (bulletArray[i].sy < 0) {

        bulletArray[i].sy -= (-ilmanvastus(bulletArray[i].sy) / bulletMass * modifier);
      }
      bulletArray[i].sy += bulletGravity * modifier;
      bulletArray[i].y += bulletArray[i].sy * modifier;

      if (bulletArray[i].sx > 0) { // jos bulletin alkuper�inen suunta on oikealle
        bulletArray[i].sx -= ilmanvastus(bulletArray[i].sx) / bulletMass * modifier;
      }
      if (bulletArray[i].sx < 0) { // jos bulletin alkuper�inen suunta on vasemmalle
        bulletArray[i].sx -= (-ilmanvastus(bulletArray[i].sx) / bulletMass * modifier);
      }
      bulletArray[i].x += bulletArray[i].sx * modifier;
      bulletSpeed = (Math.sqrt(Math.pow(bulletArray[i].sx, 2) + Math.pow(bulletArray[i].sy, 2)));
      ilmanvastus1 = ilmanvastus(bulletSpeed);
      bulletSpeedX = bulletArray[i].sx;
      bulletSpeedY = bulletArray[i].sy;
      bulletX = bulletArray[i].x;
      bulletY = bulletArray[i].y;
      keskinopeus1 += bulletSpeed;
      keskinopeusArr.push(bulletSpeed);
      joule = bulletMass * 0.5 * Math.pow(bulletSpeed, 2);
      kjoule = joule / 1000;
      mjoule = kjoule / 1000;
      asdaika++;
      if (asdaika == 1) {
        nopeusArr.push(bulletSpeed);
        xArr.push(bulletArray[i].x);
        yArr.push(bulletArray[i].y);
      }
      if (asdaika > 50) {
        asdaika = 0;
      }
    };
    keskinopeus = keskinopeus1 / keskinopeusArr.length;
  }
  if (bulletArray.length > 100) {
    bulletArray.shift();
  }
  if (reloadTimeLeft > 0) {
    reloadTimeLeft = reloadTimeLeft - deltaTime;

  }

}

var weaponRender = function () {
  for (i = 0; i < camera.x / 250 + 10; i++) {
    var tempnum = i * 250
    ctx.beginPath();
    ctx.fillStyle = "grey"; // matikkatausta
    ctx.rect(i * 250, camera.y, 2, canvas.height);
    ctx.rect(i * 250, camera.y, 2, canvas.height);
    ctx.fill();
    ctx.closePath();
    ctx.fillText(tempnum + "m", i * 250 + 3, 0);
    ctx.fillText(tempnum + "m", i * 250 + 3, camera.y + canvas.height - 50);
  }
  for (i = 0; i < -camera.y / 250 + 10; i++) {
    var tempnum = i * 250
    ctx.beginPath();
    ctx.fillStyle = "grey"; // matikkatausta
    ctx.rect(camera.x, -i * 250, canvas.width, 2);
    ctx.fill();
    ctx.closePath();
    ctx.fillText(tempnum + "m", camera.x + canvas.width - 50, -i * 250 + 3);
  }
  if (bulletArray.length > 0) {
    for (i = 0; i < bulletArray.length; i++) {
      if (bulletArray[i].sx > 0) {
        ctx.save();
        ctx.translate(bulletArray[i].x, bulletArray[i].y);
        if (bulletArray[i].bImg == 1) {
          ctx.drawImage(bulletImg, -bulletImg.width / 2, -bulletImg.height / 2);

        }
        if (bulletArray[i].bImg == 2) {
          ctx.drawImage(enemyImg, -bulletImg.width / 2, -bulletImg.height / 2);
        }
        ctx.restore();
      } else {
        ctx.save();
        ctx.translate(bulletArray[i].x, bulletArray[i].y);
        ctx.rotate(Math.PI)
        if (bulletArray[i].bImg == 1) {
          ctx.drawImage(bulletImg, -bulletImg.width / 2, -bulletImg.height / 2);
        }
        if (bulletArray[i].bImg == 2) {
          ctx.drawImage(enemyImg, -bulletImg.width / 2, -bulletImg.height / 2);
        }
        ctx.restore();

      }
      ctx.fillStyle = "#000";
      ctx.font = "bold 16px Arial";
      // ctx.fillText("luodin nopeus x akselilla:
      // "+bulletArray[i].sx.toFixed(2)+"m/s", camera.x+500, camera.y+50);
      // ctx.fillText("luodin nopeus y akselilla:
      // "+bulletArray[i].sy.toFixed(2)+"m/s", camera.x+500, camera.y+70);
      ctx.fillText("x:" + bulletArray[i].x.toFixed(2) + "y:" + bulletArray[i].y.toFixed(2) + " speedx:" + bulletArray[i].sx.toFixed(2) + " speedy:" + bulletArray[i].sy.toFixed(2), bulletArray[i].x + 10, bulletArray[i].y - 10);
    }
  }
  //t�ht�in

  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.strokeStyle = "red";
  ctx.moveTo(player.x, player.y);
  ctx.lineTo(mouseX + camera.x, mouseY + camera.y);
  ctx.stroke();
  ctx.closePath();
  ctx.fillStyle = "#000";
  ctx.font = "bold 16px Arial";
  var asteeet = Math.atan((mouseY + camera.y - (player.y)) / (mouseX + camera.x - (player.x))) * (180 / Math.PI);
  var rad = Math.atan((mouseY + camera.y - (player.y)) / (mouseX + camera.x - (player.x)));
  ctx.fillText("asteet:" + (-asteeet.toFixed(2)), player.x + 25, player.y - 20);
  //ctx.fillText("l�ht�sx:", player.x+25, player.y-20);
  ctx.fillText("lahtonopeus y:" + (-speedYY.toFixed(2)), player.x + 25, player.y - 60 + 100);
  ctx.fillText("lahtonopeusx:" + speedXX.toFixed(2), player.x + 25, player.y - 40 + 100);

  ctx.fillText("Start X: " + player.x.toFixed(2) + "m", camera.x + 50, camera.y + 30);
  ctx.fillText("Start Y: " + (-player.y.toFixed(2)) + "m", camera.x + 50, camera.y + 50);
  ctx.fillText("nopeus: " + (bulletSpeed.toFixed(2)) + "m/s", camera.x + 500, camera.y + 30);
  ctx.fillText("nopeus x akselilla: " + bulletSpeedX.toFixed(2) + "m/s", camera.x + 500, camera.y + 50);
  ctx.fillText("nopeus y akselilla: " + (-bulletSpeedY.toFixed(2)) + "m/s", camera.x + 500, camera.y + 70);
  ctx.fillText("Lentoaika: " + lentoAika.toFixed(2) + "s", camera.x + 500, camera.y + 90);
  ctx.fillText("Keskinopeus: " + keskinopeus.toFixed(2) + "m/s", camera.x + 500, camera.y + 110);
  ctx.fillText("Ase: " + currentWeapon.name, camera.x + 50, camera.y + 70);
  ctx.fillText("Ilmanvastus: " + ilmanvastus1.toFixed(2) + "N", camera.x + 50, camera.y + 110);
  ctx.fillText("bullet x: " + bulletX.toFixed(2) + ", y: " + bulletY.toFixed(2), camera.x + 50, camera.y + 130);

  if (joule < 1000) {
    ctx.fillText("Energia: " + joule.toFixed(2) + " J", camera.x + 50, camera.y + 90);
  }
  if (joule >= 1000 && joule <= 1000000) {
    ctx.fillText("Energia: " + kjoule.toFixed(2) + " kJ", camera.x + 50, camera.y + 90);
  }
  if (joule > 1000000) {
    ctx.fillText("Energia: " + mjoule.toFixed(2) + " MJ", camera.x + 50, camera.y + 90);
  }

}
