<a name="Vec2"></a>
## Vec2
  Stability: 2 (fixes / performance improvements)

  Vec2 is represented as a two coordinates array

  [x:Number, y:Number]

<a name="Vec2-create"></a>
* **create** (*x*: Number, *y*: Number): Vec2

  Create a Vec2 given two coords


<a name="Vec2-dFromPolar"></a>
* **dFromPolar** (*length*: Number, *degrees*: Number (Degrees)): Vec2

  Create a Vec2 given length and angle


<a name="Vec2-fromPolar"></a>
* **fromPolar** (*length*: Number, *radians*: Number (Radians)): Vec2

  Create a Vec2 given length and angle


<a name="Vec2-zero"></a>
* **zero** (): Vec2

  Create an empty Vec2


<a name="Vec2-clone"></a>
* **clone** (*v1*: Vec2): Vec2

  Clone given vec2


<a name="Vec2-equals"></a>
* **equals** (*v1*: Vec2, *v2*: Vec2): Boolean

  Returns true if both vectors are equal(same coords)


<a name="Vec2-equalsEpsilon"></a>
* **equalsEpsilon** (*v1*: Vec2, *v2*: Vec2): Boolean

  Returns true if both vectors are "almost(Math.EPS)" equal


<a name="Vec2-gt"></a>
* **gt** (*v1*: Vec2, *v2*: Vec2): Boolean

  Returns true both coordinates of v1 area greater than v2


<a name="Vec2-lt"></a>
* **lt** (*v1*: Vec2, *v2*: Vec2): Boolean

  Returns true both coordinates of v1 area lesser than v2


<a name="Vec2-near"></a>
* **near** (*v1*: Vec2, *v2*: Vec2, *dist*: Number): Boolean

  Returns true if the distance between v1 and v2 is less than dist.


<a name="Vec2-compare"></a>
* **compare** (*v1*: Vec2, *v2*: Vec2): Number

  * 0 equal

  * 1 top

  * 2 top-right

  * 3 right

  * 4 bottom right

  * 5 bottom

  * 6 bottom-left

  * 7 left

  * 8 top-left


<a name="Vec2-isValid"></a>
* **isValid** (*v1*: Vec2): Boolean

  The vector does not contain any not number value: ±Infinity || NaN


<a name="Vec2-isNaN"></a>
* **isNaN** (*v1*: Vec2): Boolean

  Any coordinate is NaN? -> true


<a name="Vec2-copy"></a>
* **copy** (*out_vec2*: Vec2, *v1*: Vec2): Vec2

  Copy v1 into out_vec2


<a name="Vec2-negate"></a>
* **negate** (*out_vec2*: Vec2, *v1*: Vec2): Vec2

  Negate v1 into out_vec2


<a name="Vec2-normalize"></a>
* **normalize** (*out_vec2*: Vec2, *v1*: Vec2): Vec2

<a name="Vec2-normalizeSq"></a>
* **normalizeSq** (*out_vec2*: Vec2, *v1*: Vec2): Vec2

  Normalize v1 but squared no use sqrt, for performance.


<a name="Vec2-perpendicular"></a>
* **perpendicular** (*out_vec2*: Vec2, *v1*: Vec2): Vec2

  Rotate the vector clockwise


<a name="Vec2-rperpendicular"></a>
* **rperpendicular** (*out_vec2*: Vec2, *v1*: Vec2): Vec2

  Rotate the vector counterclockwise


<a name="Vec2-lerp"></a>
* **lerp** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2, *t*: Number): Vec2

  Linearly interpolate between a and b.


<a name="Vec2-lerpconst"></a>
* **lerpconst** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2, *d*: Number): Vec2

  Linearly interpolate between v1 towards v2 by distance d.


<a name="Vec2-slerp"></a>
* **slerp** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2, *t*: Number): Vec2

  Spherical linearly interpolate between v1 and v2.


<a name="Vec2-slerpconst"></a>
* **slerpconst** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2, *radians*: Number (Radians)): Vec2

  Spherical linearly interpolate between v1 towards v2 by no more than angle a in radians.


<a name="Vec2-forAngle"></a>
* **forAngle** (*out_vec2*: Vec2, *radians*: Number (Radians)): Vec2

  Returns the unit length vector for the given angle (in radians).


<a name="Vec2-project"></a>
* **project** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2): Vec2

  Returns the vector projection of v1 onto v2.


<a name="Vec2-rotate"></a>
* **rotate** (*out_vec2*: Vec2, *v1*: Vec2, *radians*: Number (Radians)): Vec2

  Rotates the point by the given angle


<a name="Vec2-rotateFrom"></a>
* **rotateFrom** (*out_vec2*: Vec2, *v1*: Vec2, *radians*: Number (Radians), *center*: Vec2): Vec2

  Rotates the point by the given angle around an optional center point.

  *note*: center cannot be out_vec2

  *todo*: center cannot be out_vec2


<a name="Vec2-rotateVec"></a>
* **rotateVec** (*out_vec2*: Vec2, *v1*: Vec2, *v2_n*: Vec2): Vec2

  Rotate a vector given "angle" by a normalized vector v2_n


<a name="Vec2-unrotateVec"></a>
* **unrotateVec** (*out_vec2*: Vec2, *v1*: Vec2, *v2_n*: Vec2): Vec2

  Un-rotate a vector given "angle" by a normalized vector v2_n


<a name="Vec2-midPoint"></a>
* **midPoint** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2): Vec2

<a name="Vec2-reflect"></a>
* **reflect** (*out_vec2*: Vec2, *v1*: Vec2, *v2_n*: Vec2): Vec2

  Reflect v1 by the imaginary line v2_n


<a name="Vec2-subtract"></a>
* **subtract** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2): Vec2

<a name="Vec2-subtract2"></a>
* **subtract2** (*out_vec2*: Vec2, *v1*: Vec2, *x*: Number, *y*: Number): Vec2

<a name="Vec2-add"></a>
* **add** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2): Vec2

<a name="Vec2-add2"></a>
* **add2** (*out_vec2*: Vec2, *v1*: Vec2, *x*: Number, *y*: Number): Vec2

<a name="Vec2-multiply"></a>
* **multiply** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2): Vec2

  **see**: [scale](#Vec2-scale)


<a name="Vec2-multiply2"></a>
* **multiply2** (*out_vec2*: Vec2, *v1*: Vec2, *x*: Number, *y*: Number): Vec2

<a name="Vec2-divide"></a>
* **divide** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2): Vec2

<a name="Vec2-divide2"></a>
* **divide2** (*out_vec2*: Vec2, *v1*: Vec2, *x*: Number, *y*: Number): Vec2

<a name="Vec2-scale"></a>
* **scale** (*out_vec2*: Vec2, *v1*: Vec2, *factor*: Number): Vec2

  **see**: [multiply](#Vec2-multiply)


<a name="Vec2-pow"></a>
* **pow** (*out_vec2*: Vec2, *v1*: Vec2, *y*: Number): Vec2

  (x1^y, y1^y)


<a name="Vec2-max"></a>
* **max** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2): Vec2

<a name="Vec2-min"></a>
* **min** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2): Vec2

<a name="Vec2-abs"></a>
* **abs** (*out_vec2*: Vec2, *v1*: Vec2): Vec2

<a name="Vec2-scaleAndAdd"></a>
* **scaleAndAdd** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2, *factor*: Number): Vec2

<a name="Vec2-clamp"></a>
* **clamp** (*out_vec2*: Vec2, *v1*: Vec2, *length*: Number): Vec2

<a name="Vec2-truncate"></a>
* **truncate** (*out_vec2*: Vec2, *v1*: Vec2, *length*: Number)

<a name="Vec2-crossVZ"></a>
* **crossVZ** (*out_vec2*: Vec2, *vec2*: Vec2, *factor*: Number): Number

  Cross product between a vector and the Z component of a vector

  AKA Rotate CW and scale

  *todo*: test use rprependicular ?


<a name="Vec2-crossZV"></a>
* **crossZV** (*out_vec2*: Vec2, *factor*: Number, *vec2*: Vec2): Vec2

  Cross product between a vector and the Z component of a vector

  AKA Rotate CCW and scale

  *todo*: test use prependicular ?


<a name="Vec2-tripleProduct"></a>
* **tripleProduct** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2, *v3*: Vec2)

  (A x B) x C = B(C · A) - A(C · B)

  (A x B) x C = B(A.dot(C)) - A(B.dot(C))


<a name="Vec2-magnitude"></a>
* **magnitude** (*v1*: Vec2, *v2*: Vec2): Number

<a name="Vec2-dot"></a>
* **dot** (*v1*: Vec2, *v2*: Vec2): Number

  v1 · v2 = |a| * |b| * sin θ


<a name="Vec2-cross"></a>
* **cross** (*v1*: Vec2, *v2*: Vec2): Number

  v1 × v2 = |a| * |b| * sin θ


<a name="Vec2-toAngle"></a>
* **toAngle** (*v1*: Vec2): Number

<a name="Vec2-angleTo"></a>
* **angleTo** (*v1*: Vec2, *v2*: Vec2): Number

<a name="Vec2-distance"></a>
* **distance** (*v1*: Vec2, *v2*: Vec2): Number

  Returns the distance between v1 and v2.


<a name="Vec2-sqrDistance"></a>
* **sqrDistance** (*v1*: Vec2, *v2*: Vec2): Number

  Distance without using sqrt (squared distance)


<a name="Vec2-length"></a>
* **length** (*v1*: Vec2): Number

  Return vector the length.


<a name="Vec2-sqrLength"></a>
* **sqrLength** (*v1*: Vec2): Number

  Squared length (no sqrt)


<a name="Vec2-within"></a>
* **within** (*v1*: Vec2, *v2*: Vec2, *v3*: Vec2): Boolean

  Return true if v2 is between v1 and v3(inclusive)


<a name="Vec2-$within"></a>
* **$within** (*px*: Number, *py*: Number, *qx*: Number, *qy*: Number, *rx*: Number, *ry*: Number): Boolean

  Return true if q is between p and r(inclusive)


<a name="Vec2-$near"></a>
* **$near** (*px*: Number, *py*: Number, *qx*: Number, *qy*: Number, *dist*: Number): Boolean

  p is near x ± dist ("box test")


<a name="Vec2-$cross"></a>
* **$cross** (*x1*: Number, *y1*: Number, *x2*: Number, *y2*: Number): Number

<a name="Vec2-$dot"></a>
* **$dot** (*x1*: Number, *y1*: Number, *x2*: Number, *y2*: Number): Number

<a name="Vec2-swap"></a>
* **swap** (*v1*: Vec2, *v2*: Vec2): Undefined

  Swap vectors, both will be modified.

  for lazy people


<a name="Vec2-toString"></a>
* **toString** (*v1*: Vec2): String

  (x, y) with only two decimals, for readability


<a name="Vec2-perp"></a>
* **perp** (*out_vec2*: Vec2, *v1*: Vec2)

  **see**: [perpendicular](#Vec2-perpendicular)


<a name="Vec2-rotateCW"></a>
* **rotateCW** (*out_vec2*: Vec2, *v1*: Vec2)

  **see**: [perpendicular](#Vec2-perpendicular)


<a name="Vec2-rperp"></a>
* **rperp** (*out_vec2*: Vec2, *v1*: Vec2)

  **see**: [rperpendicular](#Vec2-rperpendicular)


<a name="Vec2-rotateCCW"></a>
* **rotateCCW** (*out_vec2*: Vec2, *v1*: Vec2)

  **see**: [rperpendicular](#Vec2-rperpendicular)


<a name="Vec2-interpolate"></a>
* **interpolate** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2, *t*: Number)

  **see**: [lerp](#Vec2-lerp)


<a name="Vec2-angle"></a>
* **angle** (*v1*: Vec2)

  **see**: [toAngle](#Vec2-toAngle)


<a name="Vec2-eq"></a>
* **eq** (*v1*: Vec2, *v2*: Vec2)

  **see**: [equals](#Vec2-equals)


<a name="Vec2-sub"></a>
* **sub** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2)

  **see**: [subtract](#Vec2-subtract)


<a name="Vec2-sub2"></a>
* **sub2** (*out_vec2*: Vec2, *v1*: Vec2, *x*: Number, *y*: Number)

  **see**: [subtract2](#Vec2-subtract2)


<a name="Vec2-mul"></a>
* **mul** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2)

  **see**: [multiply](#Vec2-multiply)


<a name="Vec2-mul2"></a>
* **mul2** (*out_vec2*: Vec2, *v1*: Vec2, *x*: Number, *y*: Number)

  **see**: [multiply2](#Vec2-multiply2)


<a name="Vec2-div"></a>
* **div** (*out_vec2*: Vec2, *v1*: Vec2, *v2*: Vec2)

  **see**: [divide](#Vec2-divide)


<a name="Vec2-div2"></a>
* **div2** (*out_vec2*: Vec2, *v1*: Vec2, *x*: Number, *y*: Number)

  **see**: [divide2](#Vec2-divide2)


<a name="Vec2-distanceSq"></a>
* **distanceSq** (*v1*: Vec2, *v2*: Vec2)

  **see**: [sqrDistance](#Vec2-sqrDistance)


<a name="Vec2-lengthSq"></a>
* **lengthSq** (*v1*: Vec2)

  **see**: [sqrLength](#Vec2-sqrLength)
