// class Template (annotated)
// Goals:
//      everything must work with tern, so no fancy OOP libraries are allowed
//          why: renaming, find refs, jump to, code completion!
//          test: past all of this code in the ace tern demo: http://sevin7676.github.io/Ace.Tern/demo.html
//
//      clearly separate and name different types of members without using comments
//          why: make it easier to understand a large class because javascript lacks proper modifer keywords
//
//      clearly define inheritance at the top of the class
//          why: (obvious) you shouldn't have to dig through the class to figure out what its inheriting from
//
//      wrap the entire class in a single block
//          why: (obvious) cleaner code
//
//      use the same variable names inside of each block for accessing public and private members relative to the blocks scope
//          why: consistency and make it easier to move code between different blocks if needed
//          pitfalls: have to redfine 'var sf=this' inside of each method in the prototype block to keep this consistent (this is optoinal)
//
//      use the same notation for each block (meaning never use object literal notation).
//          why: consistency and make it easier to move code between different blocks if needed
//
//      keep things as simple as possible
//          why: (obvious)
//          pitfalls: this is the simplest template I could come up with that does everything needed, but its still not all that simple
//
//      minimize external code required to craete the class or perform inheritance operations
//          why: (obvious)
//          pitfalls: requires two separate methods for inhertiance
//


// microMixin class is used for inheritance only. You only need once instance of it
// The reason we use a mixin for inhertiance is because tern doesn't understand Object.create inheritance for the prototype and I don't care about a class linking to its parent class' prototype

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
        log('mixins', mixins, 'this', m);
        if (m == null) continue;
        for (var key in m) {
            obj[key] = m[key];
        }
    }
    return obj;
};


/**
 * @class change 'className' to the name of your class
 */
var className = (function() {
    /** local scope, used for private static vars */
    var local = this,
        /** optionally set this to a parent class to inherit prototype and constructor from */
        parentClass = null,
        /** optionally set this to one or more classes to mixin to this classes prototype */
        mixins = [];

    // when working inside of one of the code blocks, use the following vars:
    // 'sf' - reference public members of the block
    // '_sf' - reference private member of the block

    /**
     * Class represents the class in this scope.
     * It starts with an upper case 'C' becase 'class' is reserved in ES6.
     * Members defined inside of class are unique to each class instance.
     */
    var Class = function(param1) {
        var _sf = {}, sf = this;
        if (parentClass) parentClass.call(this /*optionally pass args*/ ); //inherit the constructor of parent class if specified

        (function Private() {
            /** private field */
            this.privateExampleField = 'private field; ';
            /** private method */
            this.privateExampleMethod = function() {
                // use '_sf' to access private members
                // use 'sf' to access public and prototype members
                return 'private instance members can access private, public, and prototype members. \n\n' + _sf.privateExampleField + sf.publicExampleField + sf.prototypeExampleField + '\n\n (private can only access public and prototype because we are using an alias for \'this\', because \'this\' inside of a private member refers to the global scope) ';
            };

        }).call(_sf);

        (function Public() {
            /** public field, example of how to work with parameters on the constructor*/
            this.param1 = param1;
            /** public field */
            this.publicExampleField = 'public field; ';
            /** public method **/
            this.publicExampleMethod = function() {
                // use '_sf' to access private members
                // use 'sf' to access public and prototype members
                return 'public instance members can access private, public, and prototype members\n\n' + _sf.privateExampleMethod();
            };
        }).call(sf);
    };

    (function Prototype() {
        //NOTE: I don't recommend using fields in the prototype as their scope is very confusing! see http://stackoverflow.com/questions/16751230/why-declare-properties-on-the-prototype-for-instance-variables-in-javascript/16751343#16751343
        /** prototype field */
        this.prototypeExampleField = 'prototype field; ';
        /** prototype method **/
        this.prototypeExampleMethod = function() {
            // use 'this' to access public and prototype members
            // if you want to be consistent with the other blocks, you can define 'sf' inside of each prototype method for accessing local public scope
            // unfortunately its not possible to define 'sf' at the top of the prototype block
            var sf = this; //define local var sf is required if you want to use a nested functions that uses local scope, example below:
            var inner = function() {
                return sf.publicExampleField;
            };
            return 'prototype members can access public and prototype members. \n\n' + inner() + this.prototypeExampleField + '\n\n(prototype members are shared across all instances, so modifying the prototype will modify it for all instances, because of this prototype members provide vastly superior performance to public members)';
        };
    }).call(Class.prototype);

    (function Static() {
        var _sf = local,
            sf = Class;
        (function Private() {
            /** private static field */
            this.privateStaticExampleField = 'private static; ';
            /** private static method **/
            this.privateStaticMethod = function() {
                // use '_sf' to access private static
                // use 'sf' to access public static
                return 'private static members can access public static and private static members. \n\n' + sf.publicStaticExampleField + '\n\n(private static members can be accessed locally in the entire class block by their name without any type prefix)';
            };
            //NOTE: if definig static members for a class that will be used as a mixin,
            //      then you will want to add 'var sf = this;' to the first line of each mixin function
            //      if the function needs to access the class instance members as the 'sf' in this scope by default
            //      is a reference to the static members of the class
        }).call(local);

        (function Public() {
            /** public static field */
            this.publicStaticExampleField = 'public static; ';
            /** public static method **/
            this.publicStaticExampleMethod = function() {
                // use '_sf' to access private static
                // use 'sf' to access public static
                return 'public static members can access public static and private static members. \n\n' + _sf.privateStaticMethod() + '\n\n(public static members are invoked using \'Class.[memberName]\')\n(public static members can be accessed by all instance member types)';
            };
        }).call(Class);
    })();

    microMixin(Class.prototype, mixins, parentClass);
    return Class;
}());


//test code for running in browser
document.addEventListener("DOMContentLoaded", function(event) {
    var t = new className('parameter one');
    console.log('t.param1(passed via constructor)=' + t.param1);
    console.log('\n\n\nt.publicExampleMethod()=\n' + t.publicExampleMethod());
    console.log('\n\n\nt.prototypeExampleMethod()=\n' + t.prototypeExampleMethod());
    console.log('\n\n\ntestClass.publicStaticExampleMethod()=\n' + className.publicStaticExampleMethod());
});