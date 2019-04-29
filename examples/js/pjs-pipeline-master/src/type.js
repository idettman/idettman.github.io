///////////////////////////////////////////////////////////////////////////
// TYPES

export class Type {
  equals(otherType) {
    toString() === otherType.toString()
  }

  vec() {
    return new VecType(this);
  }

  arrow(otherType) {
    return new FnType(this, otherType);
  }

  toScheme() {
    return new TypeScheme([], [], this);
  }
}

export class VariableType extends Type {
  constructor(index) {
    this.index = index;
  }

  toString() {
    return "$" + this.index;
  }

  subst(subst) {
    return this;
  }
}

export class ParamType extends Type {
  constructor(name) {
    this.name = name;
  }

  toString() {
    return "'" + this.index;
  }

  is(klass) {
    return new MemberConstraint(this, klass);
  }

  subst(subst) {
    var index = subst.params.indexOf(this);
    return subst.vars[index]
  }
}

export class BooleanType extends Type {
  constructor() {
  }

  toString() {
    return "boolean";
  }

  subst(subst) {
    return this;
  }
}

export var Boolean = new BooleanType();

export class NumberType extends Type {
  constructor() {
  }

  toString() {
    return "number";
  }

  subst(subst) {
    return this;
  }
}

export var Number = new NumberType();

export class TupleType extends Type {
  constructor(types) {
    this.types = types;
  }

  toString() {
    return "(" + this.types + ")";
  }

  subst(subst) {
    return new TupleType(this.types.map(t => t.subst(subst)));
  }
}

export class VecType extends Type {
  constructor(type) {
    this.type = type;
  }

  toString() {
    return "[" + this.type + "]";
  }

  subst(subst) {
    return new VecType(this.type.subst(subst));
  }
}

export class FnType extends Type {
  constructor(domain, range) {
    this.domain = domain;
    this.range = range;
  }

  toString() {
    return this.domain + " -> " + this.range;
  }

  subst(subst) {
    return new FnType(this.domain.subst(subst),
                      this.range.subst(subst));
  }
}

export class AssocFnType extends Type {
  constructor(domain, range) {
    this.domain = domain;
    this.range = range;
  }

  toString() {
    return this.domain + " ->> " + this.range;
  }

  subst(subst) {
    return new AssocFnType(this.domain.subst(subst),
                           this.range.subst(subst));
  }
}

///////////////////////////////////////////////////////////////////////////
// TYPE CLASSES
//
// Limiting to built-in type classes right now.

export class TypeClass {
}

export var Numeric = new TypeClass();
export var Indexable = new TypeClass();
export var Ordered = new TypeClass();

export class Constraint {
}

export class MemberConstraint extends Constraint {
  constructor(klass, type, outputTypes) {
    this.klass = klass;
    this.type = type;
  }

  toString() {
    return "(" + this.type + " : " + this.klass + ")";
  }
}

///////////////////////////////////////////////////////////////////////////
// TYPE SCHEMES

export class TypeScheme {
  constructor(params, constraints, type) {
    this.params = params;
    this.constraints = constraints;
    this.type = type;
  }

  toScheme() {
    return this;
  }

  toString() {
    return "forall " + this.names + ": " + this.type;
  }
}

///////////////////////////////////////////////////////////////////////////
// Substitutions

export class Subst {
  constructor(params, vars) {
    this.params = params;
    this.vars = vars;
  }

  toString() {
    return "{" + this.params + "} => {" + this.vars + "}";
  }
}

