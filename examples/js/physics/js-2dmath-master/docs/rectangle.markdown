<a name="Rectangle"></a>
## Rectangle
  Stability: 1 (Only additions & fixes)

  Rectangle is represented as a three coordinates array

  [a: Vec2, b: Vec2, normalized: Boolean]

<a name="Rectangle-create"></a>
* **create** (*x1*: Number, *y1*: Number, *x2*: Number, *y2*: Number): Rectangle

<a name="Rectangle-fromBB"></a>
* **fromBB** (*aabb2*: AABB2): Rectangle

<a name="Rectangle-zero"></a>
* **zero** (): Rectangle

<a name="Rectangle-clone"></a>
* **clone** (*rect*: Rectangle): Rectangle

<a name="Rectangle-copy"></a>
* **copy** (*out*: Rectangle, *rect*: Rectangle): Rectangle

<a name="Rectangle-normalize"></a>
* **normalize** (*out*: Rectangle, *rect*: Rectangle, *force*: Boolean): Rectangle

  a -> bottom-left

  a -> top-right


<a name="Rectangle-center"></a>
* **center** (*out_vec2*: Vec2, *rect*: Rectangle): Vec2

<a name="Rectangle-translate"></a>
* **translate** (*out*: Rectangle, *rect*: Rectangle, *vec2*: Vec2): Rectangle

<a name="Rectangle-distance"></a>
* **distance** (*rect*: Rectangle, *rect2*: Rectangle): Number

<a name="Rectangle-area"></a>
* **area** (*rect*: Rectangle): Number

<a name="Rectangle-isVec2Inside"></a>
* **isVec2Inside** (*rect*: Rectangle, *vec2*: Vec2): Boolean

<a name="Rectangle-perimeter"></a>
* **perimeter** (*rect*: Rectangle): Number

<a name="Rectangle-momentOfInertia"></a>
* **momentOfInertia** (*rect*: Rectangle, *mass*: Number)