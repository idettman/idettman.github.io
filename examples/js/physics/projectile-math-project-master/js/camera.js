var camera = {
  x: 0,
  y: 0
};
camera.x = player.x - canvas.height / 2;
camera.y = player.y - canvas.width / 2;

var updateCamera = function () {
  if (bulletArray.length > 0 && seuraaLuotia) {
    camera.y = bulletArray[bulletArray.length - 1].y - canvas.height / 2;
    camera.x = bulletArray[bulletArray.length - 1].x - canvas.width / 2;

  } else {
    if (camera.y - 50 > player.y - canvas.height / 2) {
      camera.y = Math.round(player.y - canvas.height / 2 + 50);
    }
    if (camera.y + 50 < player.y - canvas.height / 2) {
      camera.y = Math.round(player.y - canvas.height / 2 - 50);
    }

    camera.x = player.x - player.width;

  }

}
