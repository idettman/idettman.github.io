import { removeActor } from './utility';
import World from '../world'

export function advanceTime(world: World) {
  if (world.timedEvents[world.timeIndex] !== undefined) {
    world.renderEvent([ world.timedEvents[world.timeIndex] ]);
  } else {
    world.randomEvent();
  }
  world.actors.forEach((actor, idx) => {
    if (idx >= world.size) return;
    const age = world.timeIndex - actor.entryTime;
    if (age > actor.lifeTime) {
      removeActor(world, actor.id);
    }
    // } else if (actor.callback !== null) {
      // world.processTimeTrigger(world, actor.callback(world.timeIndex));
    // }
  });
  world.timeIndex++;
}
