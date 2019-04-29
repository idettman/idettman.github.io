(function() {
const møpus=(function(){let n={},e=new Set,r=!1;return function(t,a){if(t){if(1==arguments.length)return e.has(t)||(e.add(t),n[t]=n[t]()),n[t];r||(n[t]=a)}else r=!0}})()
møpus('/Hero.js', function(module={exports:{}}) {
const {exports} = module
class Hero {
	name = "Zabu"
	strength = 10
	hp = 10
	static template = møpus('/fileToExport.js')
	constructor() {
		this.man = "2121"
	}
	get _name() {
		return this.name
	}
	static name = 'Hero.name'
	static nbHeroes = 'Hero.fill()'
	static get _name() {
		return this.name
	}
	static zabu = 'Hero.nbHeroes' + 10
	attack(hero) {
		hero.hp -= this.strength
	}
	static fill() {}
}
return module.exports
})
møpus('/fileToExport.js', function(module={exports:{}}) {
return module.exports
})
møpus()
møpus('/Hero.js')
})()