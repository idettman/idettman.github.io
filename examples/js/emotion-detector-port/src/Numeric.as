package
{
	public class Numeric
	{
		public static function rep (s:Array, v:int, k:int = 0):Array
		{
			var n:int = s[k];
			var ret:Array = new Array(n);
			var i:int;

			if (k === s.length - 1) {
				for (i = n - 2; i >= 0; i -= 2) {
					ret[i + 1] = v;
					ret[i] = v;
				}
				if (i === -1) {
					ret[0] = v;
				}
				return ret;
			}
			for (i = n - 1; i >= 0; i--) {
				ret[i] = rep(s, v, k + 1);
			}
			return ret;
		}


		public static function diag (d:Array):Array
		{
			var i:int, i1:int, j:int, n:int = d.length, A:Array = new Array(n), Ai:Array;

			for (i = n - 1; i >= 0; i--) {
				Ai = new Array(n);
				i1 = i + 2;
				for (j = n - 1; j >= i1; j -= 2) {
					Ai[j] = 0;
					Ai[j - 1] = 0;
				}
				if (j > i) {
					Ai[j] = 0;
				}
				Ai[i] = d[i];
				for (j = i - 1; j >= 1; j -= 2) {
					Ai[j] = 0;
					Ai[j - 1] = 0;
				}
				if (j === 0) {
					Ai[0] = 0;
				}
				A[i] = Ai;
			}
			return A;
		}

		public static function _biforeach2 (x:Array, y:*, s:Array, k:int, f:Function):Array
		{
			if (k == s.length - 1) {
				return f(x, y);
			}
			var i:int, n:int = s[k], ret:Array = new Array(n);

			var typedY:*;

			for (i = n - 1; i >= 0; --i) {
				typedY = (y is Array) ? y[i] : y;
				ret[i] = _biforeach2(x[i], typedY, s, k + 1, f);
			}
			return ret;
		}

		public static function dim (x:Array):Array
		{
			var y:Array = x[0];
			return [x.length, y.length];
		}

		public static function mulVS (x:Array, y:Number):Array
		{
			var _n:int = x.length;
			var i:int, ret:Array = new Array(_n);

			for (i = _n - 1; i !== -1; --i) {
				ret[i] = x[i] * y;
			}
			return ret;
		}

		public static function mul (...arguments):Array
		{
			var n:int = arguments.length, i:int, x:Array = arguments[0];

			for (i = 1; i !== n; ++i) {
				x = _biforeach2(x, arguments[i], dim(x), 0, mulVS);
			}
			return x;
		}

		public static function transpose (x:Array):Array
		{
			var i:int, j:int, m:int = x.length, n:int = (x[0] as Array).length, ret:Array = new Array(n), A0:Array, A1:Array, Bj:Array;
			for (j = 0; j < n; j++) ret[j] = new Array(m);
			for (i = m - 1; i >= 1; i -= 2) {
				A1 = x[i];
				A0 = x[i - 1];
				for (j = n - 1; j >= 1; --j) {
					Bj = ret[j];
					Bj[i] = A1[j];
					Bj[i - 1] = A0[j];
					--j;
					Bj = ret[j];
					Bj[i] = A1[j];
					Bj[i - 1] = A0[j];
				}
				if (j === 0) {
					Bj = ret[0];
					Bj[i] = A1[0];
					Bj[i - 1] = A0[0];
				}
			}
			if (i === 0) {
				A0 = x[0];
				for (j = n - 1; j >= 1; --j) {
					ret[j][0] = A0[j];
					--j;
					ret[j][0] = A0[j];
				}
				if (j === 0) {
					ret[0][0] = A0[0];
				}
			}
			return ret;
		}

		public static function dot (x:Array, y:Array):Array
		{

			var p:int = y.length, v:Array = new Array(p);
			var m:int = x.length, n:int = (y[0] as Array).length, A:Array = new Array(m), xj:Array;

			var i:int, j:int, z:int;
			--p;
			--m;
			for (i = m; i !== -1; --i) A[i] = new Array(n);
			--n;
			for (i = n; i !== -1; --i) {
				_getCol(y, i, v);
				for (j = m; j !== -1; --j) {
					z = 0;
					xj = x[j];
					A[j][i] = dotVV(xj, v);
				}
			}
			return A;
		}

		public static function sub (...arguments):Array
		{
			var n:int = arguments.length, i, x:Array = arguments[0], y:Array;

			for (i = 1; i !== n; ++i) {
				y = arguments[i];
				x = _biforeach2(x, y, dim(x), 0, subVV);
			}
			return x;
		}

		public static function subVV (x:Array, y:Array):Array
		{
			var _n:int = y.length;
			var i:int, ret:Array = new Array(_n);

			for (i = _n - 1; i !== -1; --i) {
				ret[i] = x[i] - y[i];
			}
			return ret;
		}

		public static function add (...arguments):Array
		{
			var n:int = arguments.length, i:int, x:Array = arguments[0];

			for (i = 1; i != n; ++i) {
				x = _biforeach2(x, arguments[i], dim(x), 0, addVV);
			}
			return x;
		}

		public static function addVV (x:Array, y:Array):Array
		{
			if (!y) return [];

			var _n:int = y.length;
			var i:int, ret:Array = new Array(_n);

			for (i = _n - 1; i !== -1; --i) {
				ret[i] = x[i] + y[i];
			}
			return ret;
		}

		private static function _getCol (A:Array, j:int, x:Array):void
		{
			var n:int = A.length, i:int;
			for (i = n - 1; i > 0; --i) {
				x[i] = A[i][j];
				--i;
				x[i] = A[i][j];
			}
			if (i == 0) x[0] = A[0][j];
		}

		private static function dotVV (x:Array, y:Array):Number
		{
			var i:int, n:int = x.length, i1:Number, ret:Number = x[n - 1] * y[n - 1];
			for (i = n - 2; i >= 1; i -= 2) {
				i1 = i - 1;
				ret += x[i] * y[i] + x[i1] * y[i1];
			}
			if (i == 0) {
				ret += x[0] * y[0];
			}
			return ret;
		}


		public static function inv (x1:Array):Array
		{
			var s:Array = dim(x1), abs:Function = Math.abs, m:int = s[0], n:int = s[1];
			var A:Array = clone(x1), Ai:Array, Aj:Array;
			var I:Array = identity(m), Ii:Array, Ij:Array;
			var i:int, j:int, k:int, x:int;
			for (j = 0; j < n; ++j) {
				var i0:int = -1;
				var v0:int = -1;
				for (i = j; i !== m; ++i) {
					k = abs(A[i][j]);
					if (k > v0) {
						i0 = i;
						v0 = k;
					}
				}
				Aj = A[i0];
				A[i0] = A[j];
				A[j] = Aj;
				Ij = I[i0];
				I[i0] = I[j];
				I[j] = Ij;
				x = Aj[j];
				for (k = j; k !== n; ++k)    Aj[k] /= x;
				for (k = n - 1; k !== -1; --k) Ij[k] /= x;
				for (i = m - 1; i !== -1; --i) {
					if (i !== j) {
						Ai = A[i];
						Ii = I[i];
						x = Ai[j];
						for (k = j + 1; k !== n; ++k)  Ai[k] -= Aj[k] * x;
						for (k = n - 1; k > 0; --k) {
							Ii[k] -= Ij[k] * x;
							--k;
							Ii[k] -= Ij[k] * x;
						}
						if (k === 0) Ii[0] -= Ij[0] * x;
					}
				}
			}
			return I;
		}

		public static function identity (n:int):Array
		{
			return diag(rep([n], 1));
		}

		public static function clone (x:Array):Array
		{
			return _foreach2(x, dim(x), 0, cloneV);
		}

		private static function cloneV (x:Array):Array
		{
			var _n:int = x.length;
			var i:int, ret:Array = new Array(_n);

			for (i = _n - 1; i !== -1; --i) {
				ret[i] = (x[i]);
			}
			return ret;
		}

		private static function _foreach2 (x:Array, s:Array, k:int, f:Function):Array
		{
			if (k == s.length - 1) {
				return f(x);
			}
			var i:int, n:int = s[k], ret:Array = new Array(n);
			for (i = n - 1; i >= 0; i--) {
				ret[i] = _foreach2(x[i], s, k + 1, f);
			}
			return ret;
		}
	}
}
