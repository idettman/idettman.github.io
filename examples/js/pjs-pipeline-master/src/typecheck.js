import { assert } from "assert";
import { ConstTerm, VariableTerm, CallTerm, FnTerm, VecTerm, MapTerm,
         ScanTerm, FieldTerm, IndexTerm, NameBinding,
         TupleBinding } from "./ast";
import { BIFs } from "./bif";
import { Constraint, ParamType, AssocFnType, FnType, TupleType,
         Boolean, Number, TypeScheme, Numeric, Ordered, Subst,
         TypeScheme } from "./type";

export function TypeCheckEnv(term, freevars = {}) {
  // Returns the environment after type-checking term, given the set
  // of free variables. Intended for testing.

  console.log("TypeCheckEnv");
  console.log(term.toString());

  var env = new Env();

  for (var bif of BIFs) {
    env.bind(bif.name, bif.typeScheme);
  }

  for (var x of Object.getOwnPropertyNames(freevars)) {
    env.bind(x, freevars[x]);
  }

  console.log(term.toString());
  term.type(env);

  return env.toString();
}

export class SubtypeConstraint extends Constraint {
  constructor(sub, sup) {
    this.sub = sub;
    this.sup = sup;
  }
}

class Env {
  constructor() {
    this.vars = 0;
    this.bindings = [];
    this.constraints = [];
  }

  pushBindings(f) {
    var l = this.bindings.length;
    var r = f();
    while (l !== this.bindings.length)
      this.bindings.pop();
    return r;
  }

  bind(name, type) {
    // assert(type instanceof TypeScheme, "Expected TypeScheme");
    this.bindings.push([name, type]);
  }

  lookup(name) {
    for (var binding of this.bindings) {
      if (binding[0] === name)
        return binding[1];
    }

    return null;
  }

  freshVars(number) {
    var result = [];
    for (var i = 0; i < number; i++)
      result.push(new VariableType(this.vars++));
    return result;
  }

  instantiate(scheme) {
    var vars = this.freshVars(scheme.params.length);
    var subst = new Subst(params, vars);
    var type = this.type.subst(subst);
    for (var c of this.constraints)
      this.constraints.push(c.subst(subst));
    return type;
  }

  subtype(sub, sup) {
    this.constraints.push(new SubtypeConstraint(sub, sup));
  }

  member(type, klass) {
    this.constraints.push(new MemberConstraint(type, klass));
  }

  toString() {
    return JSON.stringify({
      vars: this.vars,
      bindings: this.bindings.map(b => "{" + b + "}"),
      constraints: this.constraints.map(c => c.toString()),
    });
  }
}

ConstTerm.type = function(env) {
  if (typeof this.value == "number")
    return Number;

  throw new Error("Unsupported constant");
}

VariableTerm.type = function(env) {
  var scheme = env.lookup(this.name);
  if (scheme === null)
    throw new Error("No variable in scope named: " + this.name);

  return env.instantiate(scheme);
}

CallTerm.type = function(env) {
  var funcType = this.func.type(env);

  var [d, r] = env.freshVars(2);
  env.subtype(funcType, new FnType(d, r));

  var argType = this.arg.type(env);
  env.subtype(argType, d);

  return r;
}

FnTerm.type = function(env) {
  var [d, r] = env.freshVars(2);
  return env.pushBindings(() => {
    this.binding.bind(env, d.toScheme());
    return this.body.type(env);
  });
}

VecTerm.type = function(env) {
  var termTypes = this.terms.map(t => t.type(env));
  return new TupleType(termTypes);
}

MapTerm.type = function(env) {
  // terms should have types like [T]
  var elemTypes = env.freshVars(this.terms.length);
  var vecTypes = elemTypes.map(t => new VecType(t));

  for (var i = 0; i < this.terms.length; i++) {
    var termType = this.terms[i].type(env);
    env.subtype(termType, vecTypes[i]);
  }

  var tupleType = new TupleType(elemTypes);
  var [rangeType] = env.freshVars(1);
  var fnType = new FnTerm(tupleType, rangeType);
  env.subtype(this.fn.type(env), fnType);

  return new VecType(rangeType);
}

ScanTerm.type = function(env) {
  var [d, r] = env.freshVars(2);
  var f = new FnTerm(d, r);
  env.subtype(this.fn.type(env), f);

  var [e] = env.freshVars(1);
  var v = new VecType(e);
  env.subtype(this.body.type(env), v);
  return v;
}

FieldTerm.type = function(env) {
  // TODO -- row typing?
  throw Error("NYI");
}

IndexTerm.type = function(env) {
  var termType = this.term().type(env);
  env.member(termType, Indexable);

  var indexType = this.index().type(env);
  env.subtype(indexType, Number);
}

NameBinding.bind = function(env, type) {
  env.bind(this.name, type);
}

TupleBinding.bind = function(env, type) {
  var elemTypes = env.freshVars(this.bindings.length);
  var tupleType = new TupleType(elemTypes);
  env.subtype(type, tupleType);

  for (var i = 0; i < this.bindings.length; i++) {
    this.bindings[i].bind(env, elemTypes[i]);
  }
}
