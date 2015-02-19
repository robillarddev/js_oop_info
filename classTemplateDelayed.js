var className = (function() {
    //https://github.com/sevin7676/js_oop_info/blob/master/classTemplateDelayed.js
    var local = {},
        inherit = function(thisArg, args) {
            var parentClass = null,
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