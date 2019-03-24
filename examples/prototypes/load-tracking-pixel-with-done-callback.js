/**
 * Creates an image for the url and calls done callback when load is complete of fails
 * For creating tracking pixels
 * @param url
 * @param done
 */
function triggerPixel(url, done) {
    const img = new Image()
    img.addEventListener('load', done)
    img.addEventListener('error', done)
    img.src = url
}