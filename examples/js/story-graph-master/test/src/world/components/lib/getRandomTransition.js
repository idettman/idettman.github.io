const assert = require('assert');
const getRandomTransition = require('../../../../../src/world/components/lib/getRandomTransition');
const Rule = require('../../../../../src/components/rule');
const SG = require('../../../../../src/main');
const Actor = SG.Actor;
const Type = SG.Type;
const c = SG.constants;

describe('getRandomTransition', () => {
  it('Returns a random Transition and matching Actor from the World', () => {
    const world = new SG.World();
    const cat = new Type('cat');
    world.addLocation({ name: 'the garden' });
    world.addLocation({ name: 'the shed' });
    const Sport = world.addActor(new Actor({
      type: cat,
      name: 'Sport',
      locations: ['the garden', 'the shed'],
    }));
    world.addRule(new Rule({
      cause: {
        type: [Sport, c.move_out, 'the garden'],
        value: [],
      },
      consequent: {
        type: [c.source, c.move_in, 'the shed'],
        value: [c.source, 'wanders', 'the shed'],
      },
      isDirectional: true,
      mutations: null,
      consequentActor: null,
    }));
    assert.deepEqual(getRandomTransition(world), [
      {
        id: 0,
        isDirectional: true,
        locations: [],
        cause: {
          type: [
            0,
            'MOVE_OUT',
            'the garden',
          ],
          value: [],
        },
        consequent: {
          type: [
            'SOURCE',
            'MOVE_IN',
            'the shed',
          ],
          value: [
            'SOURCE',
            'wanders',
            'the shed',
          ],
        },
        consequentActor: null,
        mutations: null,
      },
      {
        id: 0,
        type: {
          types: [
            'cat',
          ],
        },
        name: 'Sport',
        location: 'the garden',
        locations: [
          'the garden',
          'the shed',
        ],
        members: undefined,
        lifeTime: 999,
        callback: null,
        entryTime: 1,
      },
    ]);
  });
  it('Returns false when there are no transitions present', () => {
    const world = new SG.World();
    const cat = new Type('cat');
    world.addLocation({ name: 'the garden' });
    world.addLocation({ name: 'the shed' });
    world.addActor(new Actor({
      type: cat,
      name: 'Sport',
      locations: ['the garden', 'the shed'],
    }));
    assert.deepEqual(getRandomTransition(world), false);
  });
});
