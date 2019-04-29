var ParallelPipeline = (function() {
  var { objectType, ArrayType, Any } = TypedObject;

  function fromFunc(shape0, func, grainType) {
    var shape = [];
    if ((shape0 | 0) === shape0)
      shape.push(shape0 | 0);
    else {
      for (var i = 0; i < shape0.length; i++) {
        if ((shape0[i] | 0) !== shape0[0])
          throw new TypeError("Shape must be an array of ints");
        shape.push(shape0[i] | 0);
      }
    }

    if (typeof grainType === "undefined")
      grainType = Any;

    return new ComprehensionOp(func, grainType, shape);
  }

  function fromArray(input, depth) {
    if (typeof depth === "undefined")
      depth = 1;

    if ((depth | 0) !== depth)
      throw new TypeError("Depth must be an integer");

    if (depth <= 0)
      throw new TypeError("Depth must be at least 1");

    var typeObj = objectType(input);
    var shape;
    if (typeObj === TypedObject.Object) {
      if (depth !== 1)
        throw new TypeError("Depth too large");
      shape = [input.length];
      typeObj = Any;
    } else {
      shape = [];

      if (!(typeObj instanceof ArrayType))
        throw new TypeError("Depth too large");
      shape.push(input.length);
      typeObj = typeObj.elementType;

      for (var i = 1; i < depth; i++) {
        if (!(typeObj instanceof ArrayType))
          throw new TypeError("Depth too large");
        shape.push(typeObj.length);
        typeObj = typeObj.elementType;
      }
    }

    assertEq(shape.length, depth);

    for (var i = 0; i < depth; i++) {
      const d = shape[i];
      if (d !== (d | 0))
        throw new TypeError("Invalid shape");
    }

    return new ComprehensionOp((...indices) => index(input, indices),
                               typeObj, shape);
  }

  function BaseOp() { }
  BaseOp.prototype = {
    map: function(func) {
      return this.mapTo(this.grainType, func);
    },

    mapTo: function(grainType, func) {
      return new MapToOp(this, grainType, func);
    },

    filter: function(func) {
      if (this.depth() !== 1)
        throw new TypeError("Cannot filter a pipeline unless depth is 1");
      return new FilterOp(this, func);
    },

    build: function() {
      return build(this.prepare_());
    },

    reduce: function(func) {
      if (this.depth() !== 1)
        throw new TypeError("Cannot reduce a pipeline unless depth is 1");
      var temp = build(this.prepare_());
      var accum = temp[0];
      for (var i = 1; i < temp.length; i++)
        accum = func(accum, temp[i]);
      return accum;
    },
  };

  ///////////////////////////////////////////////////////////////////////////

  function ComprehensionOp(func, grainType, shape) {
    this.func = func;
    this.grainType = grainType;
    this.shape = shape;
  }

  ComprehensionOp.prototype = subtype(BaseOp.prototype, {
    depth: function() {
      return this.shape.length;
    },

    prepare_: function() {
      return new ComprehensionState(this);
    },
  });

  function ComprehensionState(op) {
    this.op = op;
    this.shape = this.op.shape;
    this.positions = [];
    for (var i = 0; i < this.shape.length; i++)
      this.positions.push(0);
    this.grainType = this.op.grainType;
  }

  ComprehensionState.prototype = {
    next: function() {
      var v = this.op.func.apply(null, this.positions);
      increment(this.positions, this.shape);
      return v;
    },
  };

  ///////////////////////////////////////////////////////////////////////////

  function MapToOp(prevOp, grainType, func) {
    assertEq(prevOp instanceof BaseOp, true);
    this.prevOp = prevOp;
    this.grainType = grainType;
    this.func = func;
  }

  MapToOp.prototype = subtype(BaseOp.prototype, {
    depth: function() {
      return this.prevOp.depth();
    },

    prepare_: function() {
      return new MapState(this, this.prevOp.prepare_());
    },
  });

  function MapState(op, prevState) {
    this.op = op;
    this.prevState = prevState;
    this.shape = prevState.shape;
    this.grainType = op.grainType;
  }

  MapState.prototype = {
    next: function() {
      var v = this.prevState.next();
      return this.op.func(v);
    }
  };

  ///////////////////////////////////////////////////////////////////////////

  function FilterOp(prevOp, func) {
    this.prevOp = prevOp;
    this.grainType = prevOp.grainType;
    this.func = func;
  }

  FilterOp.prototype = subtype(BaseOp.prototype, {
    depth: function() {
      return 1;
    },

    prepare_: function() {
      var prevState = this.prevOp.prepare_();
      var grainType = prevState.grainType;
      var temp = build(prevState);
      var keeps = new Uint8Array(temp.length);
      var count = 0;
      for (var i = 0; i < temp.length; i++)
        if ((keeps[i] = this.func(temp[i])))
          count++;
      return new FilterState(grainType, temp, keeps, count);
    }
  });

  function FilterState(grainType, temp, keeps, count) {
    this.temp = temp;
    this.keeps = keeps;
    this.grainType = grainType;
    this.shape = [count];
    this.position = 0;
  }

  FilterState.prototype = {
    next: function() {
      while (!this.keeps[this.position])
        this.position++;
      return this.temp[this.position++];
    }
  };

  ///////////////////////////////////////////////////////////////////////////

  function lastOp(pipeline) {
    return pipeline.ops[pipeline.ops.length - 1];
  }

  function build(state) {
    var resultArray = allocArray(state.grainType, state.shape);

    var total = 1;
    var position = [];
    for (var i = 0; i < state.shape.length; i++) {
      total *= state.shape[i];
      position.push(0);
    }

    for (var i = 0; i < total; i++) {
      setIndex(resultArray, position, state.next());
      increment(position, state.shape);
    }

    return resultArray;
  }

  function index(vec, positions) {
    var v = vec;
    for (var i = 0; i < positions.length; i++)
      v = v[positions[i]];
    return v;
  }

  function setIndex(vec, positions, value) {
    var v = vec;
    for (var i = 0; i < positions.length - 1; i++)
      v = v[positions[i]];
    v[positions[i]] = value;
  }

  function increment(positions, shape) {
    for (var i = positions.length - 1; i >= 0; i--) {
      var v = ++positions[i];
      if (v < shape[i])
        return;
      positions[i] = 0;
    }
  }

  function allocArray(grainType, shape) {
    var arrayType = grainType;
    for (var i = shape.length - 1; i >= 0; i--)
      arrayType = new ArrayType(arrayType).dimension(shape[i]);
    return new arrayType();
  }

  function subtype(proto, props) {
    var result = Object.create(proto);
    for (var key in props) {
      if (props.hasOwnProperty(key)) {
        result[key] = props[key];
      }
    }
    return result;
  }

  return { fromArray: fromArray, fromFunc: fromFunc };
})();

// Using it:

function ParallelPipelineTests() {
  var { uint32, float64, objectType, ArrayType, Any, Object } = TypedObject;

  function test1() {
    var uints = new ArrayType(uint32);
    var input =
      new uints([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    var output =
      ParallelPipeline.fromArray(input).map(i => i + 1).map(i => i * 2).build();
    assertEq(input.length, output.length);
    for (var i = 0; i < input.length; i++)
      assertEq((input[i] + 1) * 2, output[i]);
  }
  test1();

  function test2() {
    var uints = new ArrayType(uint32);
    var input =
      new uints([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    var output =
      ParallelPipeline.fromArray(input).map(i => i + 1).filter(i => i > 5).build();
    assertArrayEq(output, [6, 7, 8, 9, 10, 11]);
  }
  test2();

  function test3() {
    var uints = uint32.array(5, 5);
    var input =
      new uints([[11, 12, 13, 14, 15],
                 [21, 22, 23, 24, 25],
                 [31, 32, 33, 34, 35],
                 [41, 42, 43, 44, 45],
                 [51, 52, 53, 54, 55]]);
    var output =
      ParallelPipeline.fromArray(input, 2).map(i => i + 1).build();
    print(output.toSource());
  }
  test3();

  function test4() {
    var uints = new ArrayType(uint32);
    var input =
      new uints([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    var output =
      ParallelPipeline.
      fromArray(input).
      mapTo(float64, i => i + 0.22).
      reduce((i, j) => i + j);
    assertEq((output - 57.199) < 0.001, true);
  }
  test4();

  function test5() {
    var output =
      ParallelPipeline.
      fromFunc(10, i => i + 1).
      map(i => i + 1).
      map(i => i * 2).
      build();

    var input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    assertEq(input.length, output.length);
    for (var i = 0; i < input.length; i++)
      assertEq((input[i] + 1) * 2, output[i]);
  }
  test5();

  function test6() {
    var output =
      ParallelPipeline.
      fromFunc(10, i => i + 1, uint32).
      map(i => i + 1).
      map(i => i * 2).
      build();

    var input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    assertEq(input.length, output.length);
    for (var i = 0; i < input.length; i++)
      assertEq((input[i] + 1) * 2, output[i]);
  }
  test5();

  function assertArrayEq(array1, array2) {
    assertEq(array1.length, array2.length);
    for (var i = 0; i < array1.length; i++)
      assertEq(array1[i], array2[i]);
  }
}

ParallelPipelineTests();
