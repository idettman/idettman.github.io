var assert = require( 'assert' );
var Missile = require( './ballistics' );

describe( 'Link Test', function(){
  beforeEach( function() {
    missile = new Missile()
  })
  it( 'Say hello', function() { 
    assert.equal( "Hello Master", missile.welcome() );
  })
})

describe( 'Ballistics Tests', function() {
  it( 'Horizontal Speed', function() {
    assert.equal( 25, missile.horizontal( 50, 60 ) );
  })

  it( 'Vertical Speed', function() {
    assert.equal( 43.3, missile.vertical( 50, 60 ) );
  })

  it( 'Distance', function() {
    assert.equal( 25, missile.distance( 25, 1 ) );
  })

  it( 'Height', function() {
    assert.equal( 38.4, missile.height( 43.3, 1) );
  })

  it( 'Pythag', function() {
    assert.equal( 41.8, missile.pythag( 25, 33.5 ) );
  })

  it( 'Angle Tan', function() {
    assert.equal( 53.27, missile.angleCalcOA( 33.5, 25 ) );
  }) 

})
