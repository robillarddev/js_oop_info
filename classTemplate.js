var className = (function() {
    // https://github.com/sevin7676/js_oop_info/blob/master/classTemplateAnnotated.js
    var local = this,
        Class = null,
        parentClass = null,
        mixins = [];

    (function Instance() {
        Class = function(param1) {
            var _sf = {};
            var sf = this;
            if (parentClass) parentClass.call(this /*, args*/ );

            (function Private() {

            }).call(_sf);

            (function Public() {
               
            }).call(sf);
        };
    })();

    (function Prototype() {
        if (mixins.length) OOP.mixin(this, mixins);
    
        this.methodName = function() {
            var sf = this;
        };
    }).call(Class.prototype);

    (function Static() {
        (function Private() {
            var _sf = this;
            var sf = Class;
        }).call(local);

        (function Public() {
            var _sf = local;
            var sf = this;
        }).call(Class);
    })();

    return Class;
}());