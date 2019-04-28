// https://www.npmjs.com/package/speak-tts

speech.speak({
    text: 'Hello, how are you today ?',
    queue: false, // current speech will be interrupted,
    listeners: {
        onstart: () => {
            console.log("Start utterance")
        },
        onend: () => {
            console.log("End utterance")
        },
        onresume: () => {
            console.log("Resume utterance")
        },
        onboundary: (event) => {
            console.log(event.name + ' boundary reached after ' + event.elapsedTime + ' milliseconds.')
        }
    }
}).then(() => {
    console.log("Success !")
}).catch(e => {
    console.error("An error occurred :", e)
})

/*
Set the rate :

Speech.setRate(1) 
Set the volume :

Speech.setVolume(1) 
Set the pitch :

Speech.setPitch(1) 
Speech.setVoice('Fiona') // you can pass a SpeechSynthesisVoice as returned by the init() function or just its name

*/