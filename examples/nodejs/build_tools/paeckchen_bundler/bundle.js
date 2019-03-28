var __paeckchen_cache__ = [];
function __paeckchen_require__(index) {
    if (!(index in __paeckchen_cache__)) {
        __paeckchen_cache__[index] = { module: { exports: {} } };
        modules[index](__paeckchen_cache__[index].module, __paeckchen_cache__[index].module.exports);
    }
    return __paeckchen_cache__[index].module;
}
var modules = [
    function _0(module, exports) {
        var __import10$0 = __paeckchen_require__(1), merge = __import10$0.exports['merge'];
        const object = [
            { 'b': 2 },
            { 'd': 4 }
        ];
        const other = [
            { 'c': 3 },
            { 'e': 5 }
        ];
        console.log(merge(object, other));
    },
    function _1(module, exports) {
        function merge(o1, o2) {
            return o1.concat(o2);
        }
        module.exports['merge'] = merge;
    }
];
__paeckchen_require__(0);
//# sourceMappingURL=bundle.js.map