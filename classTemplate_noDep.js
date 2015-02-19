var className = (function() {
    //https://github.com/sevin7676/js_oop_info/blob/master/classTemplate_noDep.js
    var local = {};

    var Class = function() {
        var _sf = {}, sf = this;
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