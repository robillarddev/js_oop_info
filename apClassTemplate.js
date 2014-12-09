/**
 * @class
 */
var className = (function() {
    //#region private static
    var example = 1;
    //#endregion

    //#region instance private and privileged
    var Class = function() {
        // inheritClassName.apply(this, arguments);//use this to inherit private and privileged members
        // private

        // privileged
    };
    //#endregion

    //#region instance shared (prototype) public
    (function() {
        this.exampleField = "";
        this.exampleMethod = function() {};
    }).call(Class.prototype);
    //#endregion

    //#region public static
    (function() {
        Class.exampleField = "";
        Class.exampleMethod = function() {};
    });
    //#endregion
    
    //simpleMixin(Class.prototype, inheritClassName.prototype);//use this to inherit prototype from another class (can use multiple)

    return Class;
})();