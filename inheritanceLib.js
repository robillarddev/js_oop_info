/**
 * Performs a mixin with the passed objects.
 * Mixin can be used many times on a single object.
 * @param {object} obj - object to receive the mixin.
 * @param {object|array<object>} mixins - object(s) to mixin.
 *      Null/Undefined objects are ignored.
 * @param {object|array<object>} protoMixins - object(s) to mixin by calling [object].prototype on each item.
 *      Null/Undefined objects are ignored.
 * @returns {object} passed object
 * @note the recipient object wont receive properties for keys that is already has defined
 * @example
 *
 *      var class = function(){};
 *      microMixin(class.prototype, [class1.prototype], [class2]);
 */
function microMixin(obj, mixins, protoMixins) {
    if (!Array.isArray(mixins)) mixins = [mixins];
    if (!Array.isArray(protoMixins)) protoMixins = [protoMixins];
    for (var n = 0; n < protoMixins.length; n++) {
        var p = protoMixins[n];
        if (p == null) continue;
        mixins.push(p.prototype);
    }

    for (var i = 0; i < mixins.length; i++) {
        var m = mixins[i];
        if (m == null) continue;
        for (var key in m) {
            if (typeof obj[key] !== 'undefined' || key in obj) continue;
            obj[key] = m[key];
        }
    }
    return obj;
}