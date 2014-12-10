/**
 * Performs a mixin with the passed objects.
 * Mixin can be used many times on a single object.
 * @param {object} obj - object to receive the mixin
 * @param {object|array<object>} mixins - object(s) to mixin to the passed proto
 * @returns {object} passed object
 * @example
 *
 *      var class = function(){};
 *      (function() {
 *          microMixin(this, [objectToMixin]);
 *      }).call(class.prototype);
 */
var microMixin = function(obj, mixins) {
    if (!Array.isArray(mixins)) mixins = [mixins];
    for (var i = 0; i < mixins.length; i++) {
        var m = mixins[i];
        if (m == null) continue;
        for (var key in m) {
            obj[key] = m[key];
        }
    }
    return obj;
};
