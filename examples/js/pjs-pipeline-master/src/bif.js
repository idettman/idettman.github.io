import { ParamType, AssocFnType, FnType, TupleType,
         Boolean, Number, TypeScheme, Numeric, Ordered } from "./type";

///////////////////////////////////////////////////////////////////////////
// BUILT-IN FUNCTIONS

export class BIF {
  constructor(name, params, type) {
    this.name = name;
    this.typeScheme = new TypeScheme(params, type);
  }
}

var T = new ParamType("T");

T.is(Numeric);

export var BIFs = [
  new BIF("filter", [T], [],
          new FnType(new TupleType([T.vec(), Boolean.vec()]),
                     T.vec())),

  // Associative operators can be applied to any number of values:
  new BIF("+", [T], [T.is(Numeric)],
          new AssocFnType(T.vec(), T)),
  new BIF("*", [T], [T.is(Numeric)],
          new AssocFnType(T.vec(), T)),
  new BIF("min", [T], [T.is(Ordered)],
          new AssocFnType(T.vec(), T)),
  new BIF("max", [T], [T.is(Ordered)],
          new AssocFnType(T.vec(), T)),

  // Non-associate operators take exactly two:
  new BIF("-", [T], [T.is(Numeric)],
          new FnType(new TupleType([T, T]), T)),
  new BIF("/", [T], [T.is(Numeric)],
          new FnType(new TupleType([T, T]), T)),
];

export function bif(name) {
  for (var bif of BIFs) {
    if (bif.name === name)
      return bif;
  }
  throw new Error("No bif: '" + name + "'");
}

