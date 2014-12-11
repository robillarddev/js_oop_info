/**
 * Performs a mixin with the passed objects.
 * Mixin can be used many times on a single object.
 * @param {object} obj - object to receive the mixin.
 * @param {object|array<object>} mixins - object(s) to mixin.
 *      Null/Undefined objects are ignored.
 * @param {object|array<object>} protoMixins - object(s) to mixin by calling [object].prototype on each item.
 *      Null/Undefined objects are ignored.
 * @returns {object} passed object
 * @example
 *
 *      var class = function(){};
 *      microMixin(class.prototype, [class1.prototype], [class2]);
 */
var microMixin = function(obj, mixins, protoMixins) {
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
            obj[key] = m[key];
        }
    }
    return obj;
};


document.addEventListener("DOMContentLoaded", function(event) {
    window.t1 = new inheritProto();
    console.log('inheritProto (t1)', t1);
    window.t2 = new inheritConstructor();
    console.log('inheritConstructor (t2) (this doesnt work properly, which the test is demostrating)', t2);
    window.t3 = new inheritStatic();
    console.log('inheritStatic (t3)', t3);
});


//#region prototype inheritance
var baseProto = (function() {
    // template info: https://github.com/sevin7676/js_oop_info/blob/master/classTemplateAnnotated.js
    var Class, local = this,
        parentClass = null,
        mixins = [];

    (function Instance() {
        Class = function() {
            var _sf = {}, sf = this;
            if (parentClass) parentClass.call(this /*, args*/ );

            (function Private() {}).call(_sf);

            (function Public() {}).call(sf);
        };
    })();

    (function Prototype() {
        if (parentClass) microMixin(this, parentClass.prototype);
        if (mixins.length) microMixin(this, mixins);
        /** base method */
        this.baseMethod = function() {
            return 'hello from base';
        };
    }).call(Class.prototype);

    return Class;
}());

var inheritProto = (function() {
    // template info: https://github.com/sevin7676/js_oop_info/blob/master/classTemplateAnnotated.js
    var Class, local = this,
        parentClass = null,
        mixins = [baseProto.prototype];

    (function Instance() {
        Class = function() {
            var _sf = {}, sf = this;
            if (parentClass) parentClass.call(this /*, args*/ );

            (function Private() {}).call(_sf);

            (function Public() {
                this.test = function() {
                    return sf.baseMethod();
                };
            }).call(sf);
        };
    })();

    (function Prototype() {
        if (parentClass) microMixin(this, parentClass.prototype);
        if (mixins.length) microMixin(this, mixins);


    }).call(Class.prototype);

    return Class;
}());
//#endregion


//#region constructor inheritance (instance)
var baseConstructor = (function() {
    // template info: https://github.com/sevin7676/js_oop_info/blob/master/classTemplateAnnotated.js
    var Class, local = this,
        parentClass = null,
        mixins = [];

    (function Instance() {
        Class = function() {
            var _sf = {}, sf = this;
            if (parentClass) parentClass.call(this /*, args*/ );

            (function Private() {}).call(_sf);

            (function Public() {
                /** base method */
                this.baseMethod = function() {
                    return 'hello from base';
                };
            }).call(sf);
        };
    })();

    (function Prototype() {
        if (parentClass) microMixin(this, parentClass.prototype);
        if (mixins.length) microMixin(this, mixins);
    }).call(Class.prototype);

    return Class;
}());

var inheritConstructor = (function() {
    // template info: https://github.com/sevin7676/js_oop_info/blob/master/classTemplateAnnotated.js
    var Class, local = this,
        parentClass = null,
        mixins = [baseConstructor];

    (function Instance() {
        Class = function() {
            var _sf = {}, sf = this;
            if (parentClass) parentClass.call(this /*, args*/ );

            (function Private() {}).call(_sf);

            (function Public() {
                this.test = function() {
                    return sf.baseMethod();
                };
            }).call(sf);
        };
    })();

    (function Prototype() {
        if (parentClass) microMixin(this, parentClass.prototype);
        if (mixins.length) microMixin(this, mixins);


    }).call(Class.prototype);

    return Class;
}());
//#endregion


//#region static inheritance
var baseStatic = (function() {
    // template info: https://github.com/sevin7676/js_oop_info/blob/master/classTemplateAnnotated.js
    var Class, local = this,
        parentClass = null,
        mixins = [];

    (function Instance() {
        Class = function() {
            var _sf = {}, sf = this;
            if (parentClass) parentClass.call(this /*, args*/ );
        };
    })();

    (function Static() {
        var _sf = local,
            sf = Class;

        (function Private() {}).call(local);

        (function Public() {
            /** base method */
            this.baseMethod = function() {
                return 'hello from base';
            };
        }).call(Class);
    })();

    return Class;
}());

var inheritStatic = (function() {
    // template info: https://github.com/sevin7676/js_oop_info/blob/master/classTemplateAnnotated.js
    var Class, local = this,
        parentClass = null,
        mixins = [baseStatic];

    (function Instance() {
        Class = function() {
            var _sf = {}, sf = this;
            if (parentClass) parentClass.call(this /*, args*/ );

            (function Private() {}).call(_sf);

            (function Public() {
                this.test = function() {
                    return sf.baseMethod();
                };
            }).call(sf);
        };
    })();

    (function Prototype() {
        if (parentClass) microMixin(this, parentClass.prototype);
        if (mixins.length) microMixin(this, mixins);


    }).call(Class.prototype);

    return Class;
}());
//#endregion


var className = (function() {
    // template info: https://github.com/sevin7676/js_oop_info/blob/master/classTemplateAnnotated.js
    var Class, local = this,
        parentClass = null,
        mixins = [];

    Class = function() {
        var _sf = {}, sf = this;
        if (parentClass) parentClass.call(this /*, args*/ );

        (function Private() {}).call(_sf);

        (function Public() {}).call(sf);
    };

    (function Prototype() {
        //this.demo = function() {var sf = this;};
    }).call(Class.prototype);

    (function Static() {
        var _sf = local,
            sf = Class;

        (function Private() {}).call(local);

        (function Public() {}).call(Class);
    })();

    microMixin(Class.prototype, mixins.push(parentClass));
    return Class;
}());
