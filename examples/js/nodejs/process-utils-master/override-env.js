"use strict";

const ensureObject = require("es5-ext/object/valid-object");

module.exports = () => {
	const cache = process.env;
	process.env = new Proxy(
		{},
		{
			defineProperty(target, key, inputDescriptor) {
				return Object.defineProperty(target, key, {
					configurable: true,
					enumerable: true,
					value: `${ ensureObject(inputDescriptor).value }`,
					writable: true
				});
			}
		}
	);
	return { originalEnv: cache, restoreEnv: () => (process.env = cache) };
};
