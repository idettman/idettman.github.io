(function() {
const møpus=(function(){let n={},e=new Set,r=!1;return function(t,a){if(t){if(1==arguments.length)return (typeof t!='function'||e.has(t))||(e.add(t),n[t]=n[t]()),n[t];r||(n[t]=a)}else r=!0}})()
møpus('/Hero.js', function(module={exports:{}}) {
const {exports} = module
class Hero {
	constructor() {
		this.name = "Zabu"
		this.strength = 10
		this.hp = 10
		this.man = "2121"
	}
	get _name() {
		return this.name
	}
	attack(hero) {
		hero.hp -= this.strength
	}
}
Object.defineProperties(Hero,
Object.getOwnPropertyDescriptors({
	get _name() {
		return this.name
	},
	fill() {}
}))
Hero.template = møpus('/fileToExport.js')
Hero.name = 'Hero.name'
Hero.nbHeroes = 'Hero.fill()'
Hero.zabu = 'Hero.nbHeroes' + 10
return module.exports
})
møpus('/fileToExport.js', function(module={exports:{}}) {
return module.exports
})
møpus('/zabu.caca', `COucou tout le monde, moi c'est Zabu et je fais caca
Sinon \`ça va bien\\\` ?`)
møpus()
møpus('/Hero.js')
møpus('/zabu.caca')
})()