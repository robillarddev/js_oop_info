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
                this.baseField = 'hello from base';
                /** base method */
                this.baseMethod = function() {
                    return sf.baseField;
                    return this.baseField;
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
        mixins = [new baseConstructor()];

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


function baseClassName() {
    var self = this;
    this.baseField = 'base field';
    this.methodName = function() {
        console.log('baseField=' + this.baseField);
        console.log('childField=' + this.childField);
        console.log('self.constructor.name=' + self.constructor.name);
        console.log('this.constructor.name=' + this.constructor.name);
    };
}

function childClassName() {
    this.childField = 'child field';
}
childClassName.prototype.methodName = new baseClassName().methodName;

/*(could also do a mixin of all members)
var temp = new baseClassName();
for (var key in temp) {
    childClassName.prototype[key] = temp[key];
}*/

new childClassName().methodName();
// result:
// baseField=undefined
// childField=child field
// self.constructor.name=baseClassName
// this.constructor.name=childClassName

//'this' in base class is now a reference to 'this' of child class, which is why you should NOT use this method for ineheritance!

console.log('\n\n\n');

function className() {} //this is a 'consructor' in javascript
var instance = new className();
console.log(instance.constructor); //result: function className(){}
console.log(instance.constructor.name); //result: className

//a constructor can
function classNameWithParams(param1) {
    this.param1 = param1;
    this.test = function() {
        console.log('test');
    };
    this.test();
}


// function microMixinDelayed(thisArg,local,Class,parentClass,mixins, arg1,arg2,etc){
//     console.log('parentClass',parentClass);
//     if (parentClass) parentClass.apply(thisArg, Array.prototype.slice.call(arguments,5));
//     if (local.__mixinDone) return;
//     local.__mixinDone = true;
//     microMixin(Class.prototype, mixins, parentClass);
// }

//#region delayed mixin
var childDelayed = (function() {
    //https://github.com/sevin7676/js_oop_info/blob/master/classTemplate.js
    var local = {},
        // parentClass = baseDelayed,
        // mixins = [];
        inherit = function(thisArg, p1, p2, etc) {
            var parentClass = baseDelayed,
                mixins = [];
            if (parentClass) parentClass.apply(thisArg, Array.prototype.slice.call(arguments, 1));
            
            if (local.__done) {
                console.log('localdone',local);
                return;
            }
            local.__done = true;
            microMixin(Class.prototype, mixins, parentClass);
        };
       
    var Class = function(param1, param2) {
        var _sf = {}, sf = this;
        inherit(this, param1);
        //NOTE: this didnt work because the parent and mixins must be wrapped in a local function that is called when class is instantiated
        // microMixinDelayed(this, local, Class, parentClass, mixins, param1);
        (function Private() {}).call(_sf);
        (function Public() {
            this.childPublicFieldFromParam = param2;
        }).call(sf);
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
    
    return Class;
}());

var baseDelayed = (function() {
    //https://github.com/sevin7676/js_oop_info/blob/master/classTemplate.js
    var local = {},
        parentClass = null,
        mixins = [];

    var Class = function(param1) {
        var _sf = {}, sf = this;
        if (parentClass) parentClass.call(this /*, args*/ );
        (function Private() {}).call(_sf);
        (function Public() {
            this.basePublicField = 'base';
            this.basePublicFieldFromParam = param1;
        }).call(sf);
    };

    (function Prototype() {
        this.baseProtoMethod = function() {
            var sf = this;
            return 'baseProtoMethod';
        };
    }).call(Class.prototype);

    (function Static() {
        var _sf = local,
            sf = Class;
        (function Private() {}).call(local);
        (function Public() {}).call(Class);
    })();

    microMixin(Class.prototype, mixins, parentClass);
    return Class;
}());

var childOfChildDelayed = (function() {
    //https://github.com/sevin7676/js_oop_info/blob/master/classTemplateDelayed.js
    var local = {},
        inherit = function(thisArg, args) {
            var parentClass = childDelayed,
                mixins = [];
                
            if (parentClass) parentClass.apply(thisArg, Array.prototype.slice.call(arguments, 1));
            if (local.__done) return;
            local.__done = true;
            microMixin(Class.prototype, mixins, parentClass);
        };

    var Class = function() {
        var _sf = {}, sf = this;
        inherit(this /*, args*/ );
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
    
    return Class;
}());


var mixinOfChildDelayed = (function() {
    //https://github.com/sevin7676/js_oop_info/blob/master/classTemplateDelayed.js
    var local = {},
        inherit = function(thisArg, args) {
            var parentClass = null,
                mixins = [childDelayed];
                
            if (parentClass) parentClass.apply(thisArg, Array.prototype.slice.call(arguments, 1));
            if (local.__done) return;
            local.__done = true;
            microMixin(Class.prototype, mixins, parentClass);
        };

    var Class = function() {
        var _sf = {}, sf = this;
        inherit(this /*, args*/ );
        (function Private() {}).call(_sf);
        (function Public() {
            this.mixinOfChildDelayed_publicField='field';
        }).call(sf);
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
    
    return Class;
}());

window.t6 = new mixinOfChildDelayed('param1Value', 'param2Value');
console.log('\n\mixin of child delayed inheritance instance (t6)', t6, 'This should not be done as it doesnt work properly. Dont inherit a delayed class as a prototype mixin\n\n');

new childDelayed();//create once just to make sure second one works because we only inherit on first call
window.t4 = new childDelayed('param1Value', 'param2Value');
console.log('\n\ndelayed inheritance instance (t4)', t4, '\n\n');

//its ok for a delayed class to be inherited from, but only
window.t5 = new childOfChildDelayed('param1Value', 'param2Value');
console.log('\n\child of child of delayed inheritance instance (t5)', t5, '\n\n');

//#endregion
