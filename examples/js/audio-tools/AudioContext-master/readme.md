# AudioContext.plus
AudioContext.plus() returns an AudioContext where AudioNode.connect(...) will return a Connection object instead of void. On those you can either call connect or disconnect repeatedly. You can also create virtual connections which are not connected immediately for future usage.
 
Why?
The web-audio-api does currently not allow to disconnect single outgoing connections. The current [web-audio-api-draft] proposes a disconnect with more parameters but still, a simple connection handle would be nice.

This code has been developed in [defrac] for [audiotool] and ported to pure JS.
[defrac]:http://defrac.com
[audiotool]:http://www;audiotool.com
[web-audio-api-draft]: http://www.w3.org/TR/webaudio/