/*
 Configures require.js to load the ammopack from unconcatenated module files.
 Used during development.
 */
(function() {
	// If the page is one of the visual tests,
	// find the URL of src/fsmpack and configure require.js.
	//! AT: ???
	var location = window.location.href.replace(/visual-test\/.*$/, '');
	if (location != window.location) {
		var path = location + 'src/ammopack';
		console.log('Configuring require to load ammopack modules from', path);
		require.config({
			paths: {
				'addons/ammopack': path
			}
		});
	}
})();
