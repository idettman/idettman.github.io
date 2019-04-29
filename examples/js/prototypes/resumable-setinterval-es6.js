'use strict'

export default class IntervalTimer{
  constructor(name, callback, interval, maxFires = null){
    this.remaining = 0;
    this.state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed

    this.name = name;
    this.interval = interval; //in ms
    this.callback = callback;
    this.maxFires = maxFires;
    this.pausedTime = 0; //how long we've been paused for

    this.fires = 0;
  }

  proxyCallback(){
    if(this.maxFires != null && this.fires >= this.maxFires){
      this.stop();
      return;
    }
    this.lastTimeFired = new Date();
    this.fires++;
    this.callback();
  }

  start(){
    this.log.info('Starting Timer ' + this.name);
    this.timerId = setInterval(() => this.proxyCallback(), this.interval);
    this.lastTimeFired = new Date();
    this.state = 1;
    this.fires = 0;
  }

  pause(){
    if (this.state != 1 && this.state != 3) return;

    this.log.info('Pausing Timer ' + this.name);

    this.remaining = this.interval - (new Date() - this.lastTimeFired) + this.pausedTime;
    this.lastPauseTime = new Date();
    clearInterval(this.timerId);
    clearTimeout(this.resumeId);
    this.state = 2;
  }

  resume(){
    if (this.state != 2) return;

    this.pausedTime += new Date() - this.lastPauseTime;
    this.log.info(`Resuming Timer ${this.name} with ${this.remaining} remaining`);
    this.state = 3;
    this.resumeId = setTimeout(() => this.timeoutCallback(), this.remaining);
  }

  timeoutCallback(){
    if (this.state != 3) return;

    this.pausedTime = 0;
    this.proxyCallback();
    this.start();
  }

  stop(){
    if(this.state === 0) return;

    this.log.info('Stopping Timer %s. Fired %s/%s times', this.name, this.fires, this.maxFires);
    clearInterval(this.timerId);
    clearTimeout(this.resumeId);
    this.state = 0;
  }

  //set a new interval to use on the next interval loop
  setInterval(newInterval){
    this.log.info('Changing interval from %s to %s for %s', this.interval, newInterval, this.name);

    //if we're running do a little switch-er-oo
    if(this.state == 1){
      this.pause();
      this.interval = newInterval;
      this.resume();
    }
    //if we're already stopped, idle, or paused just switch it
    else{
      this.interval = newInterval;
    }
  }

  setMaxFires(newMax){
    if(newMax != null && this.fires >= newMax){
      this.stop();
    }
    this.maxFires = newMax;
  }
}
