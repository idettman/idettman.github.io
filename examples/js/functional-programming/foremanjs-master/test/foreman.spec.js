import { assert } from 'chai';
import Brick from '../src/brick';

import itertools from '../src/itertools';
import BaseRange from '../src/range';
import Composer, { intoBrickParam } from '../src/composer';

import { Option, Eventual } from '../src/utils';

const SILENT = true;

if (!(console.debug)) {
  console.debug = console.info;
}

if (SILENT) {
  console.debug = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
}

describe('Foreman', () => {
  describe('Brick', () => {
    let echoBrick;
    let FutureSum;
    let OptionalSum;
    let Sum;

    beforeEach(() => {
      echoBrick = Brick.create({
        fn(args) {
          return {
            a: args.a,
            b: args.b,
            c: args.c,
          };
        },
        args: ['a', 'b', 'c'],
      });

      FutureSum = Brick.create({
        fn(args) {
          return new Eventual(new Promise((resolve, reject) => {
            setTimeout(() => resolve(args.x + args.y), 100);
          }));
        },
        args: ['x', 'y'],
      });

      OptionalSum = Brick.create({
        fn(args) {
          if (args.x % 2 == 0 && args.y % 2 == 0) {
            return new Option(args.x + args.y);
          } else {
            return Option.None;
          }
        },
        args: ['x', 'y'],
      });

      Sum = Brick.create({
        fn(args) { return args.x + args.y; },
        args: ['x', 'y'],
      });
    });

    describe("Direct `fn` calls", () => {
      it("is callable", () => {
        const res = echoBrick.fn({ a: 1, b: 2, c: 3 });
        assert.deepEqual(res, { a: 1, b: 2, c: 3 });
      });

      it('can be called on a range', () => {
        const res = echoBrick.fn(BaseRange.fromIterable([
            { a: 1, b: 2, c: 3 },
            { a: 4, b: 5, c: 6 },
            { a: 7, b: 8, c: 9 },
        ]));

        const resList = itertools.collect(res);

        assert.deepEqual(resList, [
            { a: 1, b: 2, c: 3 },
            { a: 4, b: 5, c: 6 },
            { a: 7, b: 8, c: 9 },
        ]);
      });

      it('can be called on Option', () => {
        const res = echoBrick.fn(new Option({ a: 1, b: 2, c: 3 }));

        const resUnwrapped = res.unwrap();

        assert.deepEqual(resUnwrapped, { a: 1, b: 2, c: 3 });
      });

      it('can return a basic future result', (done) => {
        const futureRes = FutureSum.fn({ x: 2, y: 3 });
        futureRes.fmap(res => {
          assert.deepEqual(res, 5);
          done();
        });
      });

      it('can be called on a future option', (done) => {
        const future = echoBrick.fn(Eventual.ret(Option.ret({ a: 1, b: 2, c: 3 })));

        future.then(opt => {
          assert.deepEqual(opt.unwrap(), { a: 1, b: 2, c: 3 });
          done();
        });
      });

      it('can return an optional result', () => {
        {
          const opt = OptionalSum.fn({ x: 2, y: 4 });
          assert.deepEqual(opt.unwrap(), 6);
        }

        {
          const opt = OptionalSum.fn({ x: 2, y: 3 });
          assert.deepEqual(opt.isNone(), true);
        }
      });

      it('works for reduce-style bricks', () => {
        const Max = Brick.create({
          fn(args) {
            const list = itertools.collect(args.list);
            return list.reduce((max, e) => e > max ? e : max, Number.MIN_SAFE_INTEGER);
          },
          args: [{ name: 'list', type: { isHigherOrder: true } }],
        });

        assert.deepEqual(Max.fn({ list: [1, 2, 3] }), 3);
        assert.deepEqual(Max.fn({ list: BaseRange.fromIterable([1, 2, 3]) }), 3);
      });

      it('works for reduce-style bricks with additional dependencies', () => {
        const Filter = Brick.create({
          fn(args) {
            const list = itertools.collect(args.numbers);
            return list.filter(args.predicate);
          },
          args: [{
            name: 'numbers',
            type: {
              isHigherOrder: true,
            },
          }, {
            name: 'predicate',
          }],
        });

        assert.deepEqual(Filter.args, ['numbers', 'predicate']);
        assert.deepEqual(
          Filter.fn({ numbers: [1, 2, 3], predicate: x => x >= 2 }),
          [2, 3]
        );
        assert.deepEqual(
          Filter.fn({ numbers: BaseRange.fromIterable([1, 2, 3]), predicate: x => x >= 2 }),
          [2, 3]
        );
      });

      it('keeps `this`', () => {
        const brick = Brick.create({
          fn(args) {
            return this.x * args.a;
          },
          x: 5,
          args: ['a'],
        });

        assert.deepEqual(brick.fn({ a: 2 }), 10);
        const res = itertools.collect(brick.fn(
          BaseRange.fromIterable([
            { a: 1 }, { a: 2 },
          ])));
        assert.deepEqual(res, [5, 10]);
      });
    });

    describe('`invoke` operation', () => {
      it("basic", (done) => {
        const res = echoBrick.invoke({ a: 1, b: 2, c: 3 });
        res.then(res => {
          assert.deepEqual(res, { a: 1, b: 2, c: 3 });
          done();
        });
      });

      it('can be called on a range', () => {
        const res = echoBrick.invoke(BaseRange.fromIterable([
            { a: 1, b: 2, c: 3 },
            { a: 4, b: 5, c: 6 },
            { a: 7, b: 8, c: 9 },
        ]));

        const resList = [];
        let done = false;
        res.then(res => resList.push(res), () => done = true);

        assert.deepEqual(done, true);
        assert.deepEqual(resList, [
            { a: 1, b: 2, c: 3 },
            { a: 4, b: 5, c: 6 },
            { a: 7, b: 8, c: 9 },
        ]);
      });

      it('can be called on Option', (done) => {
        const res = echoBrick.invoke(new Option({ a: 1, b: 2, c: 3 }));

        res.then(res => {
          assert.deepEqual(res, { a: 1, b: 2, c: 3 });
          done();
        });
      });

      it('can return a basic future result', (done) => {
        const futureRes = FutureSum.invoke({ x: 2, y: 3 });
        futureRes.then(res => {
          assert.deepEqual(res, 5);
          done();
        });
      });

      it('can return an optional result', () => {
        {
          const opt = OptionalSum.invoke({ x: 2, y: 4 });
          opt.then(res => {
            assert.deepEqual(res, 6);
          });
        }

        {
          const opt = OptionalSum.invoke({ x: 2, y: 3 });
          let hasRes = false;
          opt.then(res => {
            hasRes = true;
          });
          assert.deepEqual(hasRes, false);
        }
      });
    });

    describe('`bind` operation', () => {
      it('basic', () => {
        const child = echoBrick.bind({ a: 1 });
        const res = child.fn({ b: 2, c: 3});
        assert.deepEqual(res, { a: 1, b: 2, c: 3});
      });

      it('basic, two levels', () => {
        const child = echoBrick.bind({ a: 1 });
        const grandchild = child.bind({ b: 2 });
        const res = grandchild.fn({ c: 3});
        assert.deepEqual(res, { a: 1, b: 2, c: 3});
      });

      it('on functor-returning brick', (done) => {
        const child = FutureSum.bind({ x: 1 });

        const futureRes = child.fn({ y: 3 });

        futureRes.fmap(res => {
          assert.deepEqual(res, 4);
          done();
        });
      });

      it('component with additional methods', () => {
          const SumWithExtras = Brick.create({
            fn(args) { return args.x + args.y; },
            negated(args) { return -this.fn(args); },
            args: ['x', 'y'],
          });

          // Sanity check...
          assert.deepEqual(SumWithExtras.fn({ x: 2, y: 3 }), 5);
          assert.deepEqual(SumWithExtras.negated({ x: 2, y: 3 }), -5);

          const Incrementer = SumWithExtras.bind({ x: 1 });

          assert.deepEqual(Incrementer.fn({ y: 3 }), 4);
          assert.deepEqual(Incrementer.negated({ y: 3 }), -4);
      });

      it('brick still applicable to functor types', () => {
        {
          // Maybe
          const child = echoBrick.bind({ a: 1 });
          const res = child.fn(new Option({ b: 2, c: 3 }));
          assert.deepEqual(res.unwrap(), { a: 1, b: 2, c: 3 });
        }
        {
          // List
          const child = echoBrick.bind({ a: 1 });
          const res = child.fn(BaseRange.fromIterable([
              { b: 2, c: 2 },
              { b: 3, c: 3 },
          ]));
          assert.deepEqual(itertools.collect(res), [
            { a: 1, b: 2, c: 2 },
            { a: 1, b: 3, c: 3 },
          ]);
        }
      });

      it('works for reduce-style bricks', () => {
        const Max = Brick.create({
          fn(args) {
            const list = itertools.collect(args.list);
            return list.reduce((max, e) => e > max ? e : max, Number.MIN_SAFE_INTEGER);
          },
          args: [{ name: 'list', type: { isHigherOrder: true } }],
        });
        const Three = Max.bind({ list: [1, 2, 3] });

        assert.deepEqual(Three.fn(), 3);
      });

      it('works for reduce-style bricks with additional deps', () => {
        const Filter = Brick.create({
          fn(args) {
            const list = itertools.collect(args.numbers);
            return list.filter(args.predicate);
          },
          args: [{
            name: 'numbers',
            type: {
              isHigherOrder: true,
            },
          }, {
            name: 'predicate',
          }],
        });
        {
          const Positives = Filter.bind({ predicate: x => x > 0 });
          assert.deepEqual(
            Positives.fn({ numbers: [-2, -1, 0, 1, 2] }),
            [1, 2]
          );
        }
        {
          const FixedList = Filter.bind({ numbers: [-2, -1, 0, 1, 2] });
          assert.deepEqual(
            FixedList.fn({ predicate: x => x > 1 }),
            [2]
          );
        }
      });
    });

    describe('`compose` operation', () => {
      it('basic', () => {
        const child = echoBrick.compose({ a: Sum });

        assert.deepEqual(child.args, ['x', 'y', 'b', 'c']);
        const res = child.fn({ x: 1, y: 2, b: 3, c: 4 });
        assert.deepEqual(res, { a: 3, b: 3, c: 4 });
      });

      it('basic compose on child', () => {
        const child = echoBrick.bind({ a: 1 });
        const comp = child.compose({ b: Sum });

        assert.deepEqual(comp.args, ['x', 'y', 'c']);
        const res = comp.fn({ x: 1, y: 2, c: 3 });

        assert.deepEqual(res, { a: 1, b: 3, c: 3 });
      });

      it('basic compose on functor returning component', (done) => {
        const Sum = Brick.create({
          fn(args) { return args.q + args.w; },
          args: ['q', 'w'],
        });
        const child = FutureSum.compose({ x: Sum });

        assert.deepEqual(child.args, ['q', 'w', 'y']);

        const futureRes = child.fn({ q: 1, w: 2, y: 3 });

        futureRes.fmap(res => {
          assert.deepEqual(res, 6);
          done();
        });
      });

      it('use future functor result in composition -- one level', (done) => {
        const child = echoBrick.compose({ a: FutureSum });

        assert.deepEqual(child.args, ['x', 'y', 'b', 'c']);

        const futureRes = child.fn({ x: 1, y: 2, b: 3, c: 4 });

        futureRes.fmap(res => {
          assert.deepEqual(res, { a: 3, b: 3, c: 4 });
          done();
        });
      });

      it('use two functor results -- one level', (done) => {
        const child = echoBrick.compose({ a: OptionalSum, b: FutureSum });

        assert.deepEqual(child.args, ['x', 'y', 'c']);

        const res = child.fn({ x: 2, y: 4, c: 10 });

        res.unwrap().fmap(res => {
          assert.deepEqual(res, { a: 6, b: 6, c: 10 });
          done();
        });
      });

      it('allows multiple levels of functors', (done) => {
        const PassThrough = Brick.create({
          fn(args) {
            if (args.num % 2 == 0) {
              return new Option(args.num);
            } else {
              return Option.None;
            }
          },
          args: ['num'],
        });

        {
          const child = echoBrick.compose({ a: PassThrough });
          assert.deepEqual(
            child.fn({ num: 2, b: 3, c: 4 }).unwrap(),
            { a: 2, b: 3, c: 4 }
            );
          assert.deepEqual(
            child.fn({ num: 1, b: 3, c: 4 }).isNone(),
            true
            );
        }

        const FutureSumPassThrough = PassThrough.compose({
          num: FutureSum,
        });
        const Echo = echoBrick.compose({ a: FutureSumPassThrough });
        Echo.fn({ x: 1, y: 1, b: 3, c: 4 }).then(res => {
          assert.deepEqual(res.unwrap(), { a: 2, b: 3, c: 4 });
          done();
        });
      });

      it('allows multiple levels of functors with range application', (done) => {
        const PassThrough = Brick.create({
          fn(args) {
            if (args.num % 2 == 0) {
              return new Option(args.num);
            } else {
              return Option.None;
            }
          },
          args: ['num'],
        });
        const FutureSumPassThrough = PassThrough.compose({
          num: FutureSum,
        });
        const Echo = echoBrick.compose({ a: FutureSumPassThrough });

        const res = itertools.collect(Echo.fn(BaseRange.fromIterable([
            { x: 1, y: 1, b: 3, c: 4 },
        ])));

        assert.deepEqual(res.length, 1);
        res[0].then(x => {
          assert.deepEqual(x.unwrap(), { a: 2, b: 3, c: 4 });
          done();
        });
      });

      it('reducer works in functor composition', (done) => {
        const Max = Brick.create({
          fn(args) {
            const list = itertools.collect(args.list);
            return list.reduce(
              (max, e) =>
                max.flatMap(max =>
                  e.fmap(el =>
                    max > el ? max : el)),
              Eventual.ret(Number.MIN_SAFE_INTEGER));
          },
          args: [{ name: 'list', type: { name: 'list', isHigherOrder: true } }],
        });
        const MaxFutureSum = Max.compose({ list: FutureSum });

        const res = MaxFutureSum.fn({
          list: BaseRange.fromIterable([
            { x: 1, y: 1 },
            { x: 3, y: 1 },
            { x: 1, y: 2 },
          ])
        });

        res.then(max => {
          assert.deepEqual(max, 4);
          done();
        });
      });

      it('component with additional methods', () => {
        const SumWithExtras = Brick.create({
          fn(args) { return args.x + args.y; },
          negated(args) { return -this.fn(args); },
          args: ['x', 'y'],
        });
        const Unit = Brick.create({
          fn() { return 1; },
          args: [],
        });

        // Sanity check...
        assert.deepEqual(SumWithExtras.fn({ x: 2, y: 3 }), 5);
        assert.deepEqual(SumWithExtras.negated({ x: 2, y: 3 }), -5);

        const Incrementer = SumWithExtras.compose({ x: Unit });

        assert.deepEqual(Incrementer.fn({ y: 3 }), 4);
        assert.deepEqual(Incrementer.negated({ y: 3 }), -4);
      });

      it('brick still applicable to functors', () => {
        const child = echoBrick.compose({ a: Sum });
        {
          // Maybe
          const res = child.fn(new Option({ x: 1, y: 2, b: 3, c: 4 }));
          assert.deepEqual(res.unwrap(), { a: 3, b: 3, c: 4 });
        }
        {
          // List
          const res = child.fn(BaseRange.fromIterable([
            { x: 1, y: 2, b: 3, c: 3 },
            { x: 2, y: 2, b: 4, c: 4 },
            { x: 3, y: 2, b: 5, c: 5 },
          ]));
          assert.deepEqual(itertools.collect(res), [
            { a: 3, b: 3, c: 3 },
            { a: 4, b: 4, c: 4 },
            { a: 5, b: 5, c: 5 },
          ]);
        }
      });

      it('maintains dependency type info', () => {
        const child = echoBrick.compose({ a: Sum });
        assert.deepEqual(child.getArgumentType('x'), 'x');
        assert.deepEqual(child.getArgumentType('b'), 'b');
        // Drops the one for the dependency that was lost though!
        assert.deepEqual(child.getArgumentType('a'), undefined);
      });

      it('works for reduce-style bricks; single new dependency', () => {
        const Max = Brick.create({
          fn(args) {
            const list = itertools.collect(args.list);
            return list.reduce((max, e) => e > max ? e : max, Number.MIN_SAFE_INTEGER);
          },
          args: [{ name: 'list', type: { name: 'list', isHigherOrder: true } }],
        });
        const Negate = Brick.create({
          fn(args) {
            return -args.x;
          },
          args: [{ name: 'x', type: 'number' }],
        });
        const MaxNeg = Max.compose({ list: Negate });

        assert.deepEqual(MaxNeg.args, ['list']);
        const depType = MaxNeg.getArgumentType('list');
        assert.deepEqual(depType.name, 'list');
        assert.deepEqual(depType.innerType, { 'x': 'number' });
        assert.deepEqual(
          MaxNeg.fn({
            list: BaseRange.fromIterable([{ x: 1 }, { x: 2 }, { x: 3 }])
          }),
          -1);
        assert.deepEqual(
            MaxNeg.fn(new Option({ list: BaseRange.fromIterable([{ x: 1 }]) })).unwrap(),
            -1
        );
      });

      it('works for reduce-style bricks when there is a list provider', () => {
        const Max = Brick.create({
          fn(args) {
            const list = itertools.collect(args.list);
            const res = list.reduce((max, e) => e > max ? e : max, Number.MIN_SAFE_INTEGER);

            return res;
          },
          args: [{ name: 'list', type: { name: 'list', isHigherOrder: true } }],
        });
        const ListProvider = Brick.create({
          fn(args) {
            return BaseRange.fromIterable([1*args.foo, 2*args.foo, 3*args.foo]);
          },
          args: ['foo'],
        });
        const MaxOfList = Max.compose({ list: ListProvider });

        const res = MaxOfList.fn({
          list: {
            foo: 2
          }
        });

        assert.deepEqual(res, 6);
      });

      it('works for two-level composition for reduce-style bricks', () => {
        const Max = Brick.create({
          fn(args) {
            const list = itertools.collect(args.list);
            return list.reduce((max, e) => e > max ? e : max, Number.MIN_SAFE_INTEGER);
          },
          args: [{ name: 'list', type: { name: 'list', isHigherOrder: true } }],
        });
        const Negate = Brick.create({
          fn(args) {
            return -args.x;
          },
          args: [{ name: 'x', type: 'number' }],
        });
        const ListProvider = Brick.create({
          fn(args) {
            return BaseRange.fromIterable([{ x: 1*args.factor }, { x: 2*args.factor }, { x: 3*args.factor }]);
          },
          args: ['factor'],
        });
        const MaxNeg = Max.compose({ list: Negate });
        const MaxScaled = MaxNeg.compose({ list: ListProvider });

        const res = MaxScaled.fn({
          list: { factor: 4 }
        });
        assert.deepEqual(res, -4);

        {
          const MinusOne = MaxScaled.bind({ list: { factor: 1 } });
          assert.deepEqual(MinusOne.fn({}), -1);
        }
        {
          const MinusOne = MaxScaled.compose({
            list: Brick.create({
              fn(args) { return { factor: 1 }; },
              args: [],
            })
          });
          assert.deepEqual(MinusOne.fn({ list: {} }), -1);
        }
      });

      it('allows for map-reduce style operations', () => {
        const Provider = Brick.create({
          fn(args) {
            return BaseRange.fromIterable([
              { num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }
            ]);
          },
          args: [],
        });
        const Mapper = Brick.create({
          fn(args) { return 2*args.num; },
          args: ['num'],
        });
        const Reducer = Brick.create({
          fn(args) {
            const list = itertools.collect(args.list);
            return list.reduce((s, x) => s + x, 0);
          },
          args: [{ name: 'list', type: { isHigherOrder: true } }],
        });

        const MapReduce = Reducer.compose({ list: Mapper }).compose({ list: Provider });
        const res = MapReduce.fn({ list: {} });

        assert.deepEqual(res, 20);
      });

      it('works for reduce-style bricks; multiple new deps', () => {
        const Max = Brick.create({
          fn(args) {
            const list = itertools.collect(args.list);
            return list.reduce((max, e) => e > max ? e : max, Number.MIN_SAFE_INTEGER);
          },
          args: [{ name: 'list', type: { isHigherOrder: true } }],
        });

        const MaxSum = Max.compose({ list: Sum });

        assert.deepEqual(MaxSum.args, ['list']);
        assert.deepEqual(
          MaxSum.fn({
            list: BaseRange.fromIterable([
              { x: 1, y: 2 },
              { x: 3, y: 3 },
              { x: 2, y: 2 },
            ])
          }),
          6
        );
      });

      it('allows a reduce style brick to be a dependency provider', () => {
        const Max = Brick.create({
          fn(args) {
            const list = itertools.collect(args.list);
            return list.reduce((max, e) => e > max ? e : max, Number.MIN_SAFE_INTEGER);
          },
          args: [{ name: 'list', type: { isHigherOrder: true } }],
        });
        const SumWithMax = Sum.compose({ x: Max });

        assert.deepEqual(SumWithMax.args, ['list', 'y']);
        assert.deepEqual(
          SumWithMax.fn({
            list: [1, 2, 3],
            y: 3
          }),
          6
        );
      });

      it('works for reduce style bricks with additional dependencies', () => {
        const Filter = Brick.create({
          fn(args) {
            const list = itertools.collect(args.list);
            return list.filter(args.predicate);
          },
          args: [{
            name: 'list',
            type: {
              isHigherOrder: true,
            },
          }, {
            name: 'predicate',
          }],
        });
        const SumFilter = Filter.compose({ list: Sum });

        assert.deepEqual(
          SumFilter.fn({
            list: BaseRange.fromIterable([
              { x: 1, y: 1 },
              { x: 1, y: 2 },
              { x: 3, y: 1 },
              { x: 1, y: 4 },
            ]),
            predicate: x => x % 2 == 0
          }),
          [2, 4]
        );
      });

      it('works for reduce style bricks for more dependencies', () => {
        const Filter = Brick.create({
          fn(args) {
            const list = itertools.collect(args.numbers);
            return list.filter(args.predicate);
          },
          args: [{
            name: 'numbers',
            type: {
              isHigherOrder: true,
            },
          }, {
            name: 'predicate',
          }],
        });
        const Div = Brick.create({
          fn(args) {
            return x => x % args.num == 0
          },
          args: ['num'],
        });
        const SumFilterDivisible = Filter.compose({ numbers: Sum, predicate: Div });

        assert.deepEqual(SumFilterDivisible.args, ['numbers', 'num']);
        assert.deepEqual(
          SumFilterDivisible.fn({
            numbers: BaseRange.fromIterable([
              { x: 1, y: 1 },
              { x: 1, y: 2 },
              { x: 3, y: 1 },
              { x: 1, y: 4 },
            ]),
            num: 2
          }),
          [2, 4]
        );
      });

      it('keeps correct `this`', () => {
        const brick = Brick.create({
          fn(args) {
            return this.x * args.a;
          },
          x: 5,
          args: ['a'],
        });
        // Sanity check
        assert.deepEqual(brick.fn({ a: 2 }), 10);

        const MultSum = brick.compose({ a: Sum });
        assert.deepEqual(MultSum.fn({ x: 1, y: 1 }), 10);
      });

      it('reducers keep `this`', () => {
        const DoubleMax = Brick.create({
          fn(args) {
            const list = itertools.collect(args.list);
            const max = list.reduce((max, e) => e > max ? e : max, Number.MIN_SAFE_INTEGER);
            return max * this.x;
          },
          args: [{ name: 'list', type: { isHigherOrder: true } }],
          x: 2,
        });
        // Sanity check
        assert.deepEqual(DoubleMax.fn({ list: [1, 2] }), 4);

        const DoubleMaxSum = DoubleMax.compose({ list: Sum });
        const res = DoubleMaxSum.fn({
          list: BaseRange.fromIterable([
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 1, y: 0 },
          ])
        });

        assert.deepEqual(res, 6);
      });
    });
  });

  describe('Composer', () => {
    let Sum;
    let echoBrick;
    beforeEach(() => {
      Sum = Brick.create({
        fn(args) { return args.x + args.y; },
        args: ['x', 'y'],
      });

      echoBrick = Brick.create({
        fn(args) {
          return args;
        },
        args: ['a', 'b', 'c'],
      });
    });

    it('returns bricks', () => {
      const composer = new Composer();
      composer.register('sum', [], Sum);

      const sum = composer.get('sum');

      assert.deepEqual(sum.fn({ x: 1, y: 2 }), 3);
    });

    it('binds values to bricks in container', () => {
      const composer = new Composer();
      composer.register('sum', { x: 'static' }, Sum);
      composer.register('static', [], () => 2);

      const sum = composer.get('sum');

      assert.deepEqual(sum.args, ['y']);
      assert.deepEqual(sum.fn({ y: 1 }), 3);
    });

    it('composes bricks', () => {
      const composer = new Composer();
      composer.register('echo', { a: 'sum' }, echoBrick);
      composer.register('sum', [], Sum);

      const echo = composer.get('echo');

      assert.deepEqual(echo.args, ['x', 'y', 'b', 'c']);
      assert.deepEqual(echo.fn({ x: 1, y: 2, b: 3, c: 4 }), {
        a: 3, b: 3, c: 4,
      });
    });

    it('combines compose and bind', () => {
      const composer = new Composer();
      composer.register('echo', { a: 'sum' }, echoBrick);
      composer.register('sum', { x: 'static' }, Sum);
      composer.register('static', [], () => 2);

      const echo = composer.get('echo');

      assert.deepEqual(echo.args, ['y', 'b', 'c']);
      assert.deepEqual(echo.fn({ y: 2, b: 3, c: 4 }), {
        a: 4, b: 3, c: 4,
      });
    });

    it('allows higher-order bricks', () => {
      const composer = new Composer();
      composer.register('foo', { 'brick': 'sum' }, Brick.create({
        fn(args) { return args.brick.fn({ x: 5, y: 10 }) },
        args: ['brick'],
      }));
      composer.register('sum', {}, intoBrickParam(Sum));

      const brick = composer.get('foo');

      assert.deepEqual(brick.fn(), 15);
    });
  });

  describe('itertools', () => {
    it('`map` works', () => {
      let map1 = itertools.map(x => x + 1, [1, 2, 3]);
      let map2 = itertools.map(x => x + 1, map1);

      const res = [
        for (x of map2)
        x
      ];

      assert.deepEqual(res, [3, 4, 5]);
    });
  });

  describe('range', () => {
    it('range is re-entrant', () => {
      const range = BaseRange.fromForLike(0, x => x + 1, x => x == 10);
      const first = itertools.collect(range);
      const second = itertools.collect(range);
      const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

      assert.deepEqual(first, expected);
      assert.deepEqual(second, expected);
    });

    it('range from Array', () => {
      const list = [1, 2, 3, 4];
      const range = BaseRange.fromIterable(list);

      const first = itertools.collect(range);
      const second = itertools.collect(range);

      assert.deepEqual(first, list);
      assert.deepEqual(second, list);
    });

    it('range from iterator', () => {
      const list = [1, 2, 3, 4];
      const range = BaseRange.fromIterable(list[Symbol.iterator]());

      const first = itertools.collect(range);
      const second = itertools.collect(range);

      assert.deepEqual(first, list);
      // Once the first iteration is complete, the iterator is exhausted, so it is expected
      // that the second one is empty...
      assert.deepEqual(second, []);
    });
  });
});
