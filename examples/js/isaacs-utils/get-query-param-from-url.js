/**
 * Parse a query param value from the window.location.search string.
 * Implementation comes from: https://davidwalsh.name/query-string-javascript
 *
 * @param {string} name The name of the query param you want the value for.
 * @param {string} urlSearch The search string in the URL: window.location.search
 * @return {string} The value of the "name" query param.
 */
function parseQueryParam(name, urlSearch) {
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    const results = regex.exec(urlSearch)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}