package raycast;

import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.PixelSnapping;
import flash.display.Sprite;
import flash.display.BlendMode;
import flash.geom.ColorTransform;
import flash.geom.Matrix;
import flash.geom.Rectangle;

class Screen extends Sprite
{

	// Used for rad-to-deg and deg-to-rad conversion.
	public static var DEG(get, never):Float;
	public inline static function get_DEG():Float { return 180 / Math.PI; }
	public static var RAD(get, never):Float;
	public inline static function get_RAD():Float { return Math.PI / 180; }

	public var wallImage:Bitmap;
	public var camera:Camera;
	public var world:World;
	public var entities:Array<Entity>;

	public var stripWidth:Int = 3;

	public function new(width:Int, height:Int)
	{
		super();

		wallImage = new Bitmap(openfl.Assets.getBitmapData("assets/walls.png"));

		clipRect = new Rectangle();
		matrix = new Matrix();

		camera = new Camera(3, 3); // set initial start position
		world = new World();
		entities = new Array<Entity>();

		_bufferWidth = width;
		_bufferHeight = height;
		_buffer = new BitmapData(_bufferWidth, _bufferHeight, false, 0);
		addChild(new Bitmap(_buffer, PixelSnapping.NEVER));
	}

	public inline function drawMiniMap()
	{
		var mx:Int = 20, my: Int = 20;
		var rect = new Rectangle(0, 0, 3, 3);
		for (y in 0...world.mapHeight)
		{
			for (x in 0...world.mapWidth)
			{
				var wall:Int = world.mapData[y][x];
				rect.x = x * rect.width + mx;
				rect.y = y * rect.height + my;
				if (wall != 0)
				{
					_buffer.fillRect(rect, 0x555555);
				}
				else
				{
					_buffer.fillRect(rect, 0x888888);
				}
			}
		}

		// draw view point
		/*
		var thetaX:Float = Math.cos(camera.angle * RAD);
		var thetaY:Float = Math.sin(camera.angle * RAD);
		for (i in 0...10)
		{
			var x:Int = Std.int(camera.x + (i * thetaX) + 1);
			var y:Int = Std.int(camera.y + (i * thetaY) + 1);
			if (mapData[y][x] != 0)
				break;
			rect.x = x * rect.width + mx;
			rect.y = y * rect.height + my;
			buffer.fillRect(rect, 0xFF8888);
		}
		*/

		rect.x = camera.x * rect.width + mx;
		rect.y = camera.y * rect.height + my;
		_buffer.fillRect(rect, 0x00FF00);
	}

	private inline function distance(x1:Float, y1:Float, x2:Float, y2:Float):Float
	{
		var dx:Float = x1 - x2;
		var dy:Float = y1 - y2;
		return dx * dx + dy * dy;
	}

	public inline function doRayCast(angle:Float)
	{
		var colorTransform = new ColorTransform();
		var dist:Float = 0, textureX:Float = 0;
		var wallX:Int, wallY:Int, wallType:Int = 0;
		var x:Float, y:Float, dx:Float, dy:Float, slope:Float;

		var fCos:Float = Math.cos(angle * RAD);
		var fSin:Float = Math.sin(angle * RAD);

		var left:Bool = (angle > 90 && angle < 270);
		var up:Bool = (angle > 180 && angle < 360);


		// horizontal
		slope = fSin / fCos;

		x = left ? Math.floor(camera.x) : Math.ceil(camera.x);
		y = camera.y + (x - camera.x) * slope;

		dx = left ? -1 : 1;
		dy = dx * slope;

		while (x >= 0 && x < world.mapWidth && y >= 0 && y < world.mapHeight)
		{
			wallX = Math.floor(x + (left ? -1 : 0));
			wallY = Math.floor(y);
			var tile:Int = world.mapData[wallY][wallX];
			if (tile != 0)
			{
				textureX = y % 1;
				if ( left )
				{
					textureX = 1 - textureX; // flip texture
					colorTransform.greenMultiplier = colorTransform.blueMultiplier = colorTransform.redMultiplier = 0.7;
				}
				else
				{
					colorTransform.greenMultiplier = colorTransform.blueMultiplier = colorTransform.redMultiplier = 0.8;
				}

				wallType = tile;
				dist = distance(x, y, camera.x, camera.y);
				break;
			}
			x += dx;
			y += dy;
		}


		// vertical
		slope = fCos / fSin;

		y = up ? Math.floor(camera.y) : Math.ceil(camera.y);
		x = camera.x + (y - camera.y) * slope;

		dy = up ? -1 : 1;
		dx = dy * slope;

		while (x >= 0 && x < world.mapWidth && y >= 0 && y < world.mapHeight)
		{
			wallX = Math.floor(x);
			wallY = Math.floor(y + (up ? -1 : 0));
			var tile:Int = world.mapData[wallY][wallX];
			if (tile != 0)
			{
				var newDist = distance(x, y, camera.x, camera.y);
				if (dist <= 0 || dist > newDist)
				{
					textureX = x % 1;
					if ( up )
					{
						colorTransform.greenMultiplier = colorTransform.blueMultiplier = colorTransform.redMultiplier = 0.6;
					}
					else
					{
						textureX = 1 - textureX; // flip texture
					}
					dist = newDist;
					wallType = tile;
				}
				break;
			}
			x += dx;
			y += dy;
		}

		if (dist >= 0)
		{
			var numTextures:Int = 4;
			var tileHeight:Int = 64;

			// fix fisheye
			dist = Math.sqrt(dist) * Math.cos((camera.angle - angle) * RAD);
			dist = viewDist / dist;

			clipRect.y = (_bufferHeight + camera.z - dist) / 2;
			clipRect.height = dist;

			// prevent gaps in the wall
			var texX:Float = textureX * dist;
			if (texX > dist - stripWidth)
				texX = dist - stripWidth;

			var sy:Float = dist / wallImage.height * numTextures;

			matrix.identity();
			matrix.scale(dist / wallImage.width, sy);
			matrix.translate(clipRect.x - texX, clipRect.y - sy * (wallType - 1) * tileHeight);

			_buffer.draw(wallImage, matrix, colorTransform, BlendMode.NORMAL, clipRect);
		}
	}

	public inline function drawRays()
	{
		var numRays:Int = Math.ceil(_bufferWidth / stripWidth);
		var angle:Float = camera.angle - camera.fov / 2;
		var deltaAngle:Float = camera.fov / numRays;

		// keep angle in 0-360 range
		while (angle < 0) angle += 360;

		viewDist = (_bufferWidth / 2) / Math.tan((camera.fov * RAD) / 2);
		clipRect.width = stripWidth;
		for (i in 0...numRays)
		{
			clipRect.x = i * stripWidth;

			doRayCast(angle);

			// keep angle in 0-360 range
			angle = (angle + deltaAngle) % 360;
		}
	}

	public function draw()
	{
		// clear background
		var rect:Rectangle = _buffer.rect;
		// ceiling
		rect.height = (rect.height + camera.z) / 2;
		_buffer.fillRect(rect, 0x555353);
		// floor
		rect.y += rect.height;
		rect.height = _bufferHeight - rect.y;
		_buffer.fillRect(rect, 0x333030);

		drawRays();
		drawMiniMap();
	}

	private var clipRect:Rectangle;
	private var matrix:Matrix;
	private var viewDist:Float;

	private var _bufferWidth:Int;
	private var _bufferHeight:Int;
	private var _buffer:BitmapData;

}