import {
  ConstTerm, VariableTerm, CallTerm, FnTerm, VecTerm, MapTerm,
  ScanTerm, FieldTerm, IndexTerm, NameBinding, TupleBinding
} from "./ast";
import { } from './type';
import { TypeCheckEnv } from './typecheck';

function testSimpleFunction() {
  console.log(TypeCheckEnv(
    new FnTerm(new NameBinding("x"),
               new CallTerm(new VariableTerm("+"),
                            new VariableTerm("x")))
  ));
}
testSimpleFunction();
