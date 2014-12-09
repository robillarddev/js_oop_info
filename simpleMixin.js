/**
 * simple mixin that tern can understand.
 * only use on simple classes that are created for the purpose of inheritance (doesnt check hasOwnProperty).
 * @param {object.prototype} destProto - destination objects prototype
 * @param {object.prototype} sourceProto - object to copy protoype from
 */
function simpleMixin(destProto, sourceProto) {
    for (var key in sourceProto) {
        destProto[key] = sourceProto[key];
    }
}