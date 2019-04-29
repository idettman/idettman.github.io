package raycast;

class World
{

	public var mapData:Array<Array<Int>>;

	public var mapWidth:Int;
	public var mapHeight:Int;

	public function new()
	{
		mapData = [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
			[2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
			[2, 0, 0, 0, 1, 1, 4, 4, 4, 1],
			[1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
			[2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		];
		mapWidth = mapData[0].length;
		mapHeight = mapData.length;
	}

	public function isBlocking(x:Float, y:Float, w:Float, h:Float)
	{
		if (y < 0 || y >= mapHeight || x < 0 || x >= mapWidth) {
			return true;
		}

		var l:Int = Math.floor(x - w);
		var r:Int = Math.floor(x + w);
		var u:Int = Math.floor(y - h);
		var d:Int = Math.floor(y + h);

		return (mapData[u][l] != 0 || mapData[u][r] != 0 ||
			mapData[d][l] != 0 || mapData[d][r] != 0);
	}
}