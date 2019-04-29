//AUDIO
var effectVolume = 0.4;
var weapon1Aud = [];

for (i = 0; i < 11; i++) {
		weapon1Aud.push(new Audio("audio/weapon1.mp3") || new Audio("audio/weapon1.ogg"));
		weapon1Aud[i].volume = effectVolume / 2;
}
