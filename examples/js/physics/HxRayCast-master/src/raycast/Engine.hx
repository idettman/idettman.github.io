package raycast;

import flash.display.Sprite;
import flash.display.Stage;
import flash.display.StageAlign;
import flash.display.StageDisplayState;
import flash.display.StageQuality;
import flash.display.StageScaleMode;
import flash.events.Event;
import flash.events.KeyboardEvent;
import flash.ui.Keyboard;
import flash.Lib;

class Engine extends Sprite
{

	public var screen:Screen;

	public inline static var turnSpeed:Float = 3;
	public inline static var tiltSpeed:Float = 12;
	public inline static var moveSpeed:Float = 0.18;

	private var forward:Float = 0;
	private var strafe:Float = 0;
	private var turn:Float = 0;
	private var tilt:Float = 0;

	public function new()
	{
		super();

		if (Lib.current.stage != null) onStage();
		else Lib.current.addEventListener(Event.ADDED_TO_STAGE, onStage);
	}

	public static function main()
	{
		new Engine();
	}

	private function onStage(?e:Event)
	{
		if (e != null)
		{
			Lib.current.removeEventListener(Event.ADDED_TO_STAGE, onStage);
		}

		var stage = Lib.current.stage;

		screen = new Screen(stage.stageWidth, stage.stageHeight);
		addChild(screen);

		stage.align = StageAlign.TOP_LEFT;
		stage.quality = StageQuality.HIGH;
		stage.scaleMode = StageScaleMode.EXACT_FIT;
		stage.displayState = StageDisplayState.NORMAL;
		stage.addChild(this);

		addEventListener(Event.ENTER_FRAME, onEnterFrame);
		stage.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown, false,  2);
		stage.addEventListener(KeyboardEvent.KEY_UP, onKeyUp, false,  2);
	}

	private function onKeyDown(e:KeyboardEvent)
	{
		switch (e.keyCode)
		{
			case Keyboard.LEFT:
				turn = -turnSpeed;
			case Keyboard.RIGHT:
				turn = turnSpeed;
			case Keyboard.W:
				forward = moveSpeed;
			case Keyboard.S:
				forward = -moveSpeed;
			case Keyboard.A:
				strafe = -moveSpeed;
			case Keyboard.D:
				strafe = moveSpeed;
			case Keyboard.UP:
				tilt = tiltSpeed;
			case Keyboard.DOWN:
				tilt = -tiltSpeed;
		}
	}

	private function onKeyUp(e:KeyboardEvent)
	{
		switch (e.keyCode)
		{
			case Keyboard.LEFT:
				turn = 0;
			case Keyboard.RIGHT:
				turn = 0;
			case Keyboard.W:
				forward = 0;
			case Keyboard.S:
				forward = 0;
			case Keyboard.UP:
				tilt = 0;
			case Keyboard.DOWN:
				tilt = 0;
			case Keyboard.A:
				strafe = 0;
			case Keyboard.D:
				strafe = 0;
		}
	}

	private inline function checkMove(x:Float, y:Float)
	{
		if ( ! screen.world.isBlocking(screen.camera.x + x, screen.camera.y, 0.25, 0.25) )
		{
			screen.camera.x += x;
		}

		if ( ! screen.world.isBlocking(screen.camera.x, screen.camera.y + y, 0.25, 0.25) )
		{
			screen.camera.y += y;
		}
	}

	private inline function move()
	{
		var x:Float, y:Float, angle:Float;

		screen.camera.angle += turn;
		angle = screen.camera.angle * Screen.RAD;

		screen.camera.z += tilt;

		x = Math.cos(angle) * forward;
		y = Math.sin(angle) * forward;
		checkMove(x, y);

		angle += 90 * Screen.RAD;
		x = Math.cos(angle) * strafe;
		y = Math.sin(angle) * strafe;
		checkMove(x, y);
	}

	private function onEnterFrame(e:Event)
	{
		move();

		if (screen != null)
		{
			screen.draw();
		}
	}

}