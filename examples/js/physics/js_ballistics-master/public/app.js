// var Missile = require('./ballistics')

// var missile = new Missile();

window.onload = function() {

  var angle = 45
  var speed = 100

  var horSpeed = missile.horizontal( speed, angle )
  var vertSpeed = missile.vertical( speed, angle )

  var distance0 = missile.distance( horSpeed, 0 );
  var distance1 = missile.distance( horSpeed, 1 );
  var distance2 = missile.distance( horSpeed, 2 );
  var distance3 = missile.distance( horSpeed, 3 );
  var distance4 = missile.distance( horSpeed, 4 );
  var distance5 = missile.distance( horSpeed, 5 );
  var distance6 = missile.distance( horSpeed, 6 );
  var distance7 = missile.distance( horSpeed, 7 );
  var distance8 = missile.distance( horSpeed, 8 );
  var distance9 = missile.distance( horSpeed, 9 );
  var distance10 = missile.distance( horSpeed, 10 );
  var distance11 = missile.distance( horSpeed, 11 );
  var distance12 = missile.distance( horSpeed, 12 );
  var distance13 = missile.distance( horSpeed, 13 );
  var distance14 = missile.distance( horSpeed, 14 );
  var distance15 = missile.distance( horSpeed, 15 );

  var height0 = missile.height( vertSpeed, 0 );
  var height1 = missile.height( vertSpeed, 1 );
  var height2 = missile.height( vertSpeed, 2 );
  var height3 = missile.height( vertSpeed, 3 );
  var height4 = missile.height( vertSpeed, 4 );
  var height5 = missile.height( vertSpeed, 5 );
  var height6 = missile.height( vertSpeed, 6 );
  var height7 = missile.height( vertSpeed, 7 );
  var height8 = missile.height( vertSpeed, 8 );
  var height9 = missile.height( vertSpeed, 9 );
  var height10 = missile.height( vertSpeed, 10 );
  var height11 = missile.height( vertSpeed, 11 );
  var height12 = missile.height( vertSpeed, 12 );
  var height13 = missile.height( vertSpeed, 13 );
  var height14 = missile.height( vertSpeed, 14 );
  var height15 = missile.height( vertSpeed, 15 );


  var series = [

    {
      name: "Shot",
      color: "yellow",
      shadow: {
          color: 'yellow',
          width: 10,
          offsetX: 0,
          offsetY: 0
      },
      data: [ [distance0, height0], [distance1, height1], [distance2, height2], [distance3, height3], [distance4, height4], [distance5, height5], [distance6, height6], [distance7, height7], [distance8, height8], [distance9, height9], [distance10, height10], [distance11, height11], [distance12, height12], [distance13, height13], [distance14, height14], [distance15, height15],]
    
    } ]

    new LineChart( series );

}