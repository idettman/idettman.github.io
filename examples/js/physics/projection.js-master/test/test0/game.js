(function(){
    var screen = document.getElementById("screen");

    var renderer = PIXI.autoDetectRenderer(800, 500);
    screen.appendChild(renderer.view);

    var stage = new PIXI.Stage(0x4444DD);

    var keyboard = new GAMEKBD.Keyboard();
    var camera = new PROJECTION.Camera();

    var tex = PIXI.Texture.fromImage('square.png');

    var bg = new PIXI.Sprite(tex);
    bg.position.x = 400;
    bg.position.y = 250;
    bg.anchor.x = 0.5;
    bg.anchor.y = 0.5;

    var bg2 = new PIXI.Sprite(tex);
    bg2.position.x = 400;
    bg2.position.y = 250;
    bg2.anchor.x = 0.5;
    bg2.anchor.y = 0.5;
    bg2.tint = 0x00FF00;

    stage.addChild(bg);
    stage.addChild(bg2);

    var node1 = new PROJECTION.Node();
    var node2 = new PROJECTION.Node(node1);

    node1.position = [20, 0, -5];
    node2.position = [0, -20, 0];

    var animate = function()
    {
        node1.update();
        var newPos = node1.getData2d(camera);
        var newPos2 = node2.getData2d(camera);

        bg.scale.x = newPos.scale;
        bg.scale.y = newPos.scale;
        bg.position.x = 400 + newPos.position[0];
        bg.position.y = 250 + newPos.position[1];
        if (newPos.scale < 0)
            bg.visible = false;
        else
            bg.visible = true;

        bg2.scale.x = newPos2.scale;
        bg2.scale.y = newPos2.scale;
        bg2.position.x = 400 + newPos2.position[0];
        bg2.position.y = 250 + newPos2.position[1];

        if (newPos2.scale < 0)
            bg2.visible = false;
        else
            bg2.visible = true;

        stage.children.sort(function(a,b){
            return a.scale.x - b.scale.x
        });

        if (keyboard.isKeyDown(GAMEKBD.Keys.KEY_W))
        {
            node1.rotation[2] += 0.1
        }
        if (keyboard.isKeyDown(GAMEKBD.Keys.KEY_S))
        {
            node1.rotation[2] -= 0.1
        }
        if (keyboard.isKeyDown(GAMEKBD.Keys.KEY_A))
        {
            var pos = camera.position;
            pos[0] -= 0.1;
            camera.position = pos;
            console.log(camera.position);
        }
        if (keyboard.isKeyDown(GAMEKBD.Keys.KEY_D))
        {
            var pos = camera.position;
            pos[0] += 0.1;
            camera.position = pos;
            console.log(camera.position);
        }

        keyboard.update();

        renderer.render(stage);
    };

    TweenLite.ticker.addEventListener("tick", animate);


})();