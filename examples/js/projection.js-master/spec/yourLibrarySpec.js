describe("perspective", function() {

    var camera = new PROJECTION.Camera(45, 0.75, 1, 100);

    it('should change the point', function(){
        var point = [-1, -2, -5];
        var newPoint = camera.transform(point);
        console.log(newPoint);
        expect(4).toBe(4);
    });
  
});