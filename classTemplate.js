var className = (function() {
    // template info: https://github.com/sevin7676/js_oop_info/blob/master/classTemplateAnnotated.js
    var local = this,
        Class = null,
        parentClass = null,
        mixins = [];

    (function Instance() {
        Class = function(param1) {
            var _sf = {}, sf = this;
            if (parentClass) parentClass.call(this /*, args*/ );

            (function Private() {}).call(_sf);

            (function Public() {}).call(sf);
        };
    })();

    (function Prototype() {
        if (mixins.length) OOP.mixin(this, mixins);
        
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