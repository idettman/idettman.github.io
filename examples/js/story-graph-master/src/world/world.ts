import Rule, { CauseTypeElement } from '../components/rule'
import Location from '../components/location'
import Actor from '../components/actor'

import { randomMatch, checkMatch, twoActors } from './components/story'
import { processEvent } from './components/events'
import { advanceTime } from './components/time'
import { getActor } from './components/utility'
import getLocalRules from './components/lib/getLocalRules';
import checkTransitionMatch from './components/lib/checkTransitionMatch';

const unique = (arr: any[]) => {
  let box = {}
  arr.forEach(item => box[item] = true)
  return Object.keys(box)
}

const selectAtRandom = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default class World {
  actors: Actor[];
  excludePrevious: boolean;
  lastId: number;
  locations: Location[];
  logEvents: boolean;
  numLocations: number;
  numRules: number;
  output: string;
  previousMatch: null | number;
  rules: Rule[];
  size: number;
  timedEvents: any;
  timeIndex: number;

  constructor(options) {
    this.size = 0;
    this.lastId = -1;
    this.actors = [];

    this.numLocations = 0;
    this.locations = [];

    this.numRules = 0;
    this.rules = [];

    this.logEvents = options && options.logEvents
    this.excludePrevious = options && options.excludePrevious
    this.previousMatch = null;

    this.timeIndex = 1;
    this.timedEvents = {};
    this.output = '';
  }

  addRule(data) {
    const id = this.numRules++;
    this.rules.push(new Rule(data, id));
    return id;
  }

  addLocation(data) {
    data.id = this.numLocations;
    this.locations.push(new Location(data));
    this.numLocations++;
  }

  addActor(actor: Actor | Actor[]) {
    const add = (actorToAdd: Actor) => {
      const id = this.lastId + 1;
      this.lastId = id;
      actorToAdd.id = id;
      actorToAdd.setEntryTime(this.timeIndex);
      this.actors.push(actorToAdd);
      this.size++;
      return id;
    }

    if (Array.isArray(actor)) {
      actor.forEach(item => add.apply(this, [item]));
      return false;
    }
    const id = add.apply(this, [actor]);
    return id;
  }

  getLocationByName(name) {
    for (let i = 0; i < this.locations.length; i++) {
      if (this.locations[i].name === name) {
        return this.locations[i].id;
      }
    }
    return false;
  }

  getLocationById(id) {
    for (let i = 0; i < this.locations.length; i++) {
      if (this.locations[i].id === id) {
        return this.locations[i];
      }
    }
    return false;
  }

  getActorById(id) {
    for (let i = 0; i < this.size; i++) {
      if (this.actors[i].id === id) {
        return this.actors[i];
      }
    }
    return false;
  }

  renderEvent(events) {
    let output = '';
    events.forEach(storyEvent => {
      const results = this.findRule(storyEvent);
      if (results) {
        const [ rule, actorOne, actorTwo ] = results
        output += processEvent(this, rule, actorOne, actorTwo);
      }
    });
    this.output = `${this.output}${output}`;
  }

  randomEvent() {
    let output: string = '';
    let count = 0;
    let rules: false | Rule[] = false;
    let actorOne, actorTwo;
    while (count < 100 && !rules) {
      [ actorOne, actorTwo ] = twoActors(this)
      const exclude = this.excludePrevious ? this.previousMatch : null
      rules = randomMatch(this, actorOne, actorTwo, exclude)
      count ++
    }
    if (!rules) {
      throw new Error('No matches found! Suggest run testMatches() to evaluate possible matches')
    }  

    const rule = selectAtRandom(rules);
    this.previousMatch = rule.id;
    
    if (this.logEvents && rule.name) {
      console.log(`Match on rule "${rule.name}"`)
    }

    output += processEvent(this, rule, actorOne, actorTwo);

    this.output = `${this.output}${output}`;
  }

  runStory(steps, theEvents = []) {
    this.registerTimedEvents(theEvents);
    while (this.timeIndex < steps) {
      advanceTime(this);
    }
  }

  registerTimedEvents(theEvents) {
    theEvents.forEach(event => {
      this.timedEvents[event.step] = event.event;
    });
  }

  findRule(piece: CauseTypeElement): [ Rule, Actor, Actor ] | false {
    const source = getActor(this, piece[0]);
    const action = piece[1];
    const target = getActor(this, piece[2]);
    if (source && target) {
      for (let i = 0; i < this.numRules; i++) {
        const rule = this.rules[i];
        if (checkMatch(rule, source, target, action)) {
          return [ rule, source, target ];
        }
      }
    }
    return false;
  }

  testMatches() {
    const results = {}
    this.actors.forEach(actor => {
      results[actor.name] = {}
      if (actor.locations.length) {
        console.log(actor.locations)
        actor.locations.forEach(location => {
          actor.location = location
          this.populateMatchesForActor(actor, results);
        })
      }
      this.populateMatchesForActor(actor, results);
    })
    return results
  }

  populateMatchesForActor(actor, results) {
    let localActors;
    if (actor.location) {
      localActors = this.actors.filter(actorTwo => actor.location === actorTwo.location && actor.name !== actorTwo.name)
    } else {
      localActors = this.actors.filter(actorTwo => actorTwo.name !== actor.name);
    }
    let localRules = getLocalRules(this, actor)
    const transitionRules = this.rules.filter(rule => checkTransitionMatch(rule, actor));
    
    if(!localActors.length && !results[actor.name]) {
      results[actor.name] = 'ERROR: no local actors'
    } else if (!localRules.length && !transitionRules.length && !results[actor.name]) {
      results[actor.name] = 'ERROR: no matching rules'
    } else {

      results[actor.name].TRANSITION_RULES = results[actor.name].TRANSITION_RULES 
        ? unique(results[actor.name].TRANSITION_RULES.concat(transitionRules.map(r => r.id)))
        : transitionRules.map(r => r.id);

      results[actor.name].INTERACTION_RULES = {}

      localActors.forEach(actorTwo => {
        results[actor.name].INTERACTION_RULES[actorTwo.name] = results[actor.name].INTERACTION_RULES[actorTwo.name] || []
        localRules.forEach(rule => {
          const isMatch = checkMatch(rule, actor, actorTwo)
          if (isMatch && results[actor.name].INTERACTION_RULES[actorTwo.name].indexOf(rule.id) === -1) {
            results[actor.name].INTERACTION_RULES[actorTwo.name].push(rule.name || rule.id)
          }
        })
      })

    }
  }
}
