import { merge } from './module';

const object = [{ 'b': 2 }, { 'd': 4 }];
const other = [{ 'c': 3 }, { 'e': 5 }];

console.log(merge(object, other));