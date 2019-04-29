import { expect } from 'chai';
import { curry, __ } from '../src/';

describe('curry', () => {
  it('curry the function correctly', () => {
    const strAdd3 = (a, b, c) => '' + a + b + c;
    const curriedStrAdd3 = curry(strAdd3);

    expect(curriedStrAdd3(__,4, __)()(__)(5)()(6)).to.equal('546');
  });
});
