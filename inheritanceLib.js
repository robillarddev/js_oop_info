/**
 * @description OOP methods.
 * Requires es5shim for ie8 support
 * Partically taken from Ace Editor https://github.com/ajaxorg/ace/blob/master/lib/ace/lib/oop.js#L34
 */
var OOP = {
    /**
     * Makes once class inherit from another and stores the
     * parent constructor as '$super'.
     * This can only be called once, and it should be called before setting the protoype of the child class.
     * @param {constructor} ctor - constructor of class to receive inheritance
     * @param {constructor} superCtor - constructor of parent class
     * @examle
     *      var parentClass = function(){};
     *      var class = function(){
     *          //this is required to inherit public and private instance members
     *          parentClass.call(this, [arguments]);
     *      };
     *      OOP.inherits(class, parentClass);
     *
     * This is the same as methods that copy the prototype using an intermediate object.
     * This is different from a mixin in that changing the super class prototype will
     * change the inherited class prototype.
     */
    inherits: function(ctor, superCtor) {
        ctor.$super = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    },
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
     *          OOP.mixin(this, [objectToMixin]);
     *      }).call(class.prototype);
     */
    mixin: function(obj, mixins) {
        if (!Array.isArray(mixins)) mixins = [mixins];
        for (var i = 0; i < mixins.length; i++) {
            var m = mixins[i];
            if (m == null) continue;
            for (var key in m) {
                obj[key] = m[key];
            }
        }
        return obj;
    },
};