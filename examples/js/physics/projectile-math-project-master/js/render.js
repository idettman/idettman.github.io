var jee = 0;
var render = function (modifier) {
  toggle = !toggle;

  if ("ASD" === "ASD") {

    if (gameRunning || editorRunning) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.fillStyle = "white"; // matikkatausta
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      ctx.save();
      ctx.scale(2, 2);

      ctx.restore();

      ctx.save();
      ctx.translate(-camera.x, -camera.y);
      mapRender();
      weaponRender();
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(player.x - 15, player.y - 15, 30, 30);
      ctx.stroke();
      ctx.closePath();

      ctx.save();
      ctx.beginPath();

      ctx.stroke();
      ctx.closePath();
      ctx.restore();
      mapRender2();

      ctx.restore();

      ctx.font = "20px arial";
      ctx.fillStyle = "#fff";

    }
    if (menuRunning) {
      menurender();
    }
  };
  ctx.save();
  ctx.restore();

};