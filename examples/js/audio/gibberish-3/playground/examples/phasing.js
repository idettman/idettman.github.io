// Audio-rate modulation of scheduling
// Listen long enough (30 seconds?)
// and they'll all pop back into sync.

// how many strings to pluck
const count = 15

// how much to fluctuate tempo (0–1) between strings
const depth = .5

for( let i = 0; i < count; i++ ) {
  
  const k = Karplus({ 
    panVoices: true,
    pan:       i/count, 
    gain:      1/count
  })
  .connect()
    
  // Sequencer2 lets you modulate scheduling at audio-rate
  const s = Sequencer2({
    target:k, key:'note',
    values:[110 + i * 55], timings:[11025],
  }).start()
  
  // modulate tempo for every string except the first one
  if( i !== 0 )
    s.rate = Add( 1, Sine({ frequency:.1 * i, gain:depth }) )
  
}
