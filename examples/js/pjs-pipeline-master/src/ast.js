///////////////////////////////////////////////////////////////////////////
// AST
//
// TERM = X
//      | TERM(TERM)
//      | BIND -> TERM
//      | (TERM...)
//      | [TERM...]
//      | map(TERM) FN
//      | scan(BIF, TERM)
//      | TERM.f
//      | TERM[TERM]
//      | CONST

export class Term {
  constructor(bindings, childTerms) {
    this.bindings = bindings;
    this.childTerms = childTerms;
  }
}

export class ConstTerm extends Term {
  constructor(value) {
    super([], []);
    this.value = value;
  }

  toString() {
    return "Const(" + value + ")";
  }
}

export class VariableTerm extends Term {
  constructor(name) {
    super([], []);
    this.name = name;
  }

  toString() {
    return this.name;
  }
}

export class CallTerm {
  constructor(func, arg) {
    super([], [func, arg]);
  }

  get func() { return this.childTerms[0]; }
  get arg() { return this.childTerms[1]; }

  toString() {
    return this.func + "(" + this.arg + ")";
  }
}

export class FnTerm extends Term {
  constructor(binding, term) {
    super([binding], [term]);
  }

  get binding() { return this.bindings[0]; }
  get body() { return this.childTerms[0]; }

  toString() {
    return this.binding + " -> " + this.body;
  }
}

export class VecTerm extends Term {
  constructor(terms) {
    super([], terms);
  }

  get terms() { return this.childTerms; }
}

export class MapTerm extends Term {
  constructor(terms, fn) {
    super([], [terms, fn]);
  }

  get terms() { return this.childTerms.slice(0, this.childTerms.length - 1); }
  get fn() { return this.childTerms[this.childTerms.length - 1]; }
}

export class ScanTerm extends Term {
  constructor(fn, body) {
    super([], [fn, body]);
  }

  get fn() { return this.childTerms.slice(0, this.childTerms.length - 1); }
  get body() { return this.childTerms[this.childTerms.length - 1]; }
}

export class FieldTerm extends Term {
  constructor(term, name) {
    super([], [term]);
    this.name = name;
  }

  get term() { return this.childTerms[0]; }
}

export class IndexTerm extends Term {
  constructor(l, r) {
    super([], [l, r]);
  }

  get term() { return this.childTerms[0]; }
  get index() { return this.childTerms[1]; }
}

///////////////////////////////////////////////////////////////////////////
// BIND = X | [BIND...]

export class Binding {
  constructor() {
  }
}

export class NameBinding extends Binding {
  constructor(name) {
    this.name = name;
  }
}

export class TupleBinding extends Binding {
  constructor(bindings) {
    this.bindings = bindings;
  }
}
