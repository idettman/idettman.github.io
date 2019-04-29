var game = function (modifier) {


  if (gameKey.left && !gameKey.right) {

    if (player.speed > -player.maxSpeed) {
      player.speed -= player.acceleration * modifier;

    }
    player.lastDir = "dirLeft";
  };

  if (gameKey.right && !gameKey.left) {

    if (player.speed < player.maxSpeed) {
      player.speed += player.acceleration * modifier;
      player.lastDir = "dirRight";
    }
  };

  if ((!gameKey.left || (gameKey.right && gameKey.left)) && player.speed < 0) {
    player.speed += player.deAcceleration * modifier;
    if (player.speed > -1) {
      player.speed = 0;
    };
  };

  if ((!gameKey.right || (gameKey.right && gameKey.left)) && player.speed > 0) {
    player.speed -= player.deAcceleration * modifier;
    if (player.speed < 1) {
      player.speed = 0;
    };

  };
  if ((!upKey || (gameKey.down && upKey)) && player.jumpSpeed < 0) {
    player.jumpSpeed += player.deAcceleration * modifier;
    if (player.jumpSpeed > -1) {
      player.jumpSpeed = 0;
    };
  };

  if ((!gameKey.down || (gameKey.down && upKey)) && player.jumpSpeed > 0) {
    player.jumpSpeed -= player.deAcceleration * modifier;
    if (player.jumpSpeed < 1) {
      player.jumpSpeed = 0;
    };

  };

  if (upKey) {

    player.jumpSpeed -= player.acceleration * modifier;
  };
  if (gameKey.down) {

    player.jumpSpeed += player.acceleration * modifier;
  };

  if (gameKey.shoot == true && reloadTimeLeft <= 0) {
    bulletPush(player.x, player.y);
    reloadTimeLeft = currentWeapon.reloadTime;

  };

  if (gameKey.down && player.jumping == true) {
    player.jumping = false;
    player.jumpSpeed = 0;
  }

  if (oneKey) {
    switchWeapon(1);
    muotokerroin = 0.295;
    bulletMass = 0.008;
    caliber = 0.00762;
  }
  if (twoKey) {
    switchWeapon(2);
    caliber = 0.006;
    bulletMass = 0.0002;
    muotokerroin = 0.47;
  }
  if (threeKey) {
    switchWeapon(3);
    bulletMass = 75;
    caliber = 0.65;
    muotokerroin = 1;

  }
  if (fourKey) {
    switchWeapon(4);
    muotokerroin = 0.295;
    bulletMass = 10;
    caliber = 0.10;
    muotokerroin = 0.295;

  }

  bulletUpdate(modifier);

  if (player.speed > player.maxSpeed) {
    player.speed = player.maxSpeed;
  } else if (player.speed < -player.maxSpeed) {
    player.speed = -player.maxSpeed;
  }
  if (player.jumpSpeed > player.maxSpeed) {
    player.jumpSpeed = player.maxSpeed;
  } else if (player.jumpSpeed < -player.maxSpeed) {
    player.jumpSpeed = -player.maxSpeed;
  }

  player.x += player.speed * modifier;

  player.y += player.jumpSpeed * modifier;
  updateCamera(modifier);

}
player.hp = 100;