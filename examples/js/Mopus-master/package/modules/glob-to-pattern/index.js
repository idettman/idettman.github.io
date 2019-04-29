
module.exports = function (glob, opts={}) {
	if (typeof glob !== 'string') {
		throw new TypeError('Expected a string');
	}

	var str = String(glob);

	// The regexp we are building, as a string.
	var reStr = ""

	var extended = !!opts.extended
	var globstar = !!opts.globstar

	// If we are doing extended matching, this boolean is true when we are inside
	// a group (eg {*.html,*.js}), and false otherwise.
	var inGroup = false

	// RegExp flags (eg "i" ) to pass in to RegExp constructor.
	var flags = typeof( opts.flags ) === "string" ? opts.flags : ""

	for (let i = 0, len = str.length; i < len; i++) {
		let c = str[i];

		switch (c) {
			case "/":
			case "$":
			case "^":
			case "+":
			case ".":
			case "(":
			case ")":
			case "=":
			case "!":
			case "|":
				reStr += "\\" + c;
				break;

			case "?":
				if (extended) {
					reStr += "."
					break
				}

			case "[":
			case "]":
				if (extended) {
					reStr += c
					break
				}

			case "{":
				if (extended) {
					inGroup = true
					reStr += "("
					break
				}

			case "}":
				if (extended) {
					inGroup = false
					reStr += ")"
					break
				}

			case ",":
				if (inGroup) {
					reStr += "|";
					break
				}
				reStr += "\\" + c
				break

			case "*":
				// Move over all consecutive "*"'s.
				// Also store the previous and next characters
				var prevChar = str[i - 1]
				var starCount = 1
				while(str[i + 1] === "*") {
					starCount++
					i++
				}
				var nextChar = str[i + 1]

				if (!globstar) {
					// globstar is disabled, so treat any number of "*" as one
					reStr += ".*"
				} else {
					// globstar is enabled, so determine if this is a globstar segment
					var isGlobstar = starCount > 1                      // multiple "*"'s
						&& (prevChar === "/" || prevChar === undefined)   // from the start of the segment
						&& (nextChar === "/" || nextChar === undefined)   // to the end of the segment

					if (isGlobstar) {
						// it's a globstar, so match zero or more path segments
						reStr += "((?:[^/]*(?:\/|$))*)"
						i++; // move over the "/"
					} else {
						// it's not a globstar, so only match one path segment
						reStr += "([^/]*)"
					}
				}
				break

			default:
				reStr += c
		}
	}

	// When regexp 'g' flag is specified don't
	// constrain the regular expression with ^ & $
	if (!flags || !~flags.indexOf('g')) {
		reStr = "^" + reStr + "$"
	}

	return new RegExp(reStr, flags)
}