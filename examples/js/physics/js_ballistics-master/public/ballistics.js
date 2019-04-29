var degrees = Math.PI / 180

var missile = {
  welcome: function() {
    return "Hello Master";
  },
  gravity: 9.8,
  horizontal: function( speed, angle ) {
    var sum = angle * degrees;
    var answer = speed * Math.cos( sum );
    return Math.round( answer * 100) / 100;
  },

  vertical: function( speed, angle ) {
    var sum = angle * degrees;
    var answer = speed * Math.sin( sum );
    return Math.round( answer * 100 ) / 100;
  },

  distance: function( speed, time ) {
    var answer = speed * time;
    return answer;
  },

  height: function( speed, time ) {

    var answer = ( speed * time ) - ( 0.5 * this.gravity * time * time )
    return answer;
  },

  pythag: function( distance, height ) {
    var answer = Math.hypot( distance, height )
    return Math.round( answer * 100 ) / 100;
  },

  // angleCalcOA: function( height, distance ) {
  //   var fraction = height / distance;
  //   console.log( fraction )
  //   // var sum = fraction * degrees
  //   // console.log( sum )
  //   var answer = Math.atan( fraction )
    
  //   return Math.round( answer * 100 ) / 100;
  // }


  // def angle_calc_o_a( height , distance )
  //   fraction =  height / distance
  //   # binding.pry
  //   answer = Math::atan( fraction ) 
  //   answer *= 180 / Math::PI
  //   answer.round( 2 )
  // end



}


// module.exports = Missile;