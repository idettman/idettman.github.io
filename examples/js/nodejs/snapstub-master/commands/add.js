'use strict';

const fs = require('fs');

const got = require('got');
const out = require('simple-output');
const parseHeaders = require('parse-headers');

const saveCmd = require('./save');

function addCmd(opts) {
	const addOptions = opts.addOptions;
	const url = opts.url;
	const methodList = addOptions.method || 'get';
	const methods = methodList.split(',');
	const customHeaders = [].concat(addOptions.header).join('\n');

	function getData() {
		let data = addOptions.data;
		let body;
		let type;

		try {
			data = fs.readFileSync(data).toString();
		} catch (e) {
		}

		try {
			body = JSON.stringify(JSON.parse(data));
			type = 'application/json';
		} catch (e) {
			body = data;
			type = 'application/x-www-form-urlencoded';
		}

		return {
			body: body,
			type: type
		};
	}

	function getOpts(method) {
		let opts = {
			headers: parseHeaders(customHeaders),
			json: !addOptions.nojson,
			method: method
		};

		// set body data, skips only TRACE method
		// https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
		if (method !== 'trace' && addOptions.data) {
			let data = getData();

			// if no method was set using data, defaults to post
			if (!addOptions.method) {
				opts.method = 'post';
			}

			// sets data and content-type for request
			opts = Object.assign({}, opts, {
				body: data.body,
				headers: Object.assign({
					'content-type': data.type
				}, opts.headers)
			});
		}
		return opts;
	}

	Promise.all(
			methods.map(name => got(url, getOpts(name.toLowerCase())))
		)
		.then(results => {
			methods.forEach((method, index) => saveCmd({
				url: url,
				stdin: results[index].body,
				saveOptions: {
					method: method,
					nojson: addOptions.nojson
				}
			}));
		})
		.catch(out.error);
}

module.exports = addCmd;

