package raycast;

/**
 * ...
 * @author Matt Tuttle
 */

class Camera
{

	public var x:Float;
	public var y:Float;
	public var z:Float;
	public var fov:Float;

	public function new(x:Float, y:Float, z:Float = 0, angle:Float = 0, fov:Float = 75)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.angle = angle;
		this.fov = fov;
	}

	public var angle(default, set):Float;
	private function set_angle(value:Float):Float
	{
		angle = value % 360;
		return angle;
	}

}