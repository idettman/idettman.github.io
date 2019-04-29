/**
* This is a sample source file I use to understand better how Butternut works, and what I can do with it ;)
* Let's do the fastest bundler ever !
*/



// var x351 = 12221

// export {x351}

// export {Hero}
// export {Hero as HeroBis}
// export let x, y=12
// export function myFunc() {}
// export class myClass {}
// // export default 123213
// export default 5 + 12 + 321321
// // export default function() {}
// export * from './fileToExport'
// export {a, b as b2} from './fileToExport'


// import exportParDefaut from "./fileToExport";
// import * as nom from "./fileToExport.js";
// import { export1 , export2 as alias2} from "./fileToExport.js";
// import exportParDefaut2, { export3 } from "./fileToExport.js";
// import exportParDefaut3, * as nom2 from "./fileToExport.js";
// import "./fileToExport.js";

// const {zabu} = require("./zabu.caca")


// import * as minimatch from 'minimatch'


class Hero {
// let Hero = class {
	name = "Zabu"
	strength = 10
	hp = 10
	static template = require('./fileToExport')

	constructor() {
		this.man = "2121"
	}

	get _name() {return this.name}

	static name = 'Hero.name'
	static nbHeroes = 'Hero.fill()'
	static get _name() {return this.name}
	static zabu = 'Hero.nbHeroes' + 10

	attack(hero) {
		hero.hp -= this.strength
	}

	static fill() {

	}
}

