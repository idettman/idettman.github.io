var startTime = -1;
var animationLength = 2000; // Animation length in milliseconds

function doAnimation(timestamp) {
  // Calculate animation progress
  var progress = 0;

  if (startTime < 0) {
    startTime = timestamp;
  } else {
    progress = timestamp - startTime;
  }

  // Do animation ...
  if (progress < animationLength) {
    requestAnimationFrame(doAnimation);
  }
}

// Start animation
requestAnimationFrame(doAnimation);




// ---------




function redraw() {
  drawPending = false;
  // Do drawing ...
}

var drawPending = false;
function requestRedraw() {
  if (!drawPending) {
    drawPending = true;
    requestAnimationFrame(redraw);
  }
}

  
  
  