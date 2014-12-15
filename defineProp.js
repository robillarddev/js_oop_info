//testing various ways to define properties on objects that works with tern
//all of the methods have terrible pitfalls, using parens to invoke a function as get setter is just better...
//note that if any of these were to be used, the scope of 'this' may be wrong, and need to be fixed in side of DFP using fn.call or apply

function dfp(ops) {
    console.log('ops', ops);
    setTimeout(function() {
        delete ops.Obj[ops.Name];
        var privateValue = ops.Default;
        Object.defineProperty(ops.Obj, ops.Name, {
            get: function() {
                return ops.Get(privateValue);
            },
            set: function(v) {
                privateValue = ops.Set(v, v === privateValue);
            }
        });
    }, 0);
    return undefined;
}

function testFn() {
    /** comment above defineProperty for prop1, this works with tern but its far to verbose */
    Object.defineProperty(this, 'prop1', {
        get: function() {
            return this._prop1;
        },
        set: function(v) {
            this._prop1 = v;
        }
    });

    (function() {
        var def = 'defaultValue(and local private value)';
        /** comment above defineProperty for p4, this works with tern but its far to verbose */
        Object.defineProperty(this, 'p4', {
            get: function() {
                return def;
            },
            set: function(v) {
                def = v;
            }
        });
    }).call(this);

    /**
     * p3 def.
     * This method works but its a serious hack as it deletes this property then appends a new one after a timeout, but it works great with tern
     * Also, this could be changed to not use object literal notation
     */
    this.p3 = dfp({
        Obj: this,
        Name: 'p3',
        Default: 'p3DefaultValue',
        Get: function(v) {
            return 'get: ' + v;
        },
        Set: function(v, same) {
            console.log('v', v);
            console.log('same', same);
            return v;
        },
    });

    //bad
    // var p6 = {
    //     Obj: this,
    //     Name: 'p6',
    //     Default: 'p63DefaultValue',
    //     get: function() {
    //         return 'get: ' + v;
    //     },
    //     set: function(v) {
    //         return v;
    //     },
    // };
    // Object.defineProperty(this,'p6',p6);

   //doesn't work with tern
   dfp({
        Obj: this,
        Name: 'p7',
        Default: 'p7',
        Get: function(v) {
            return 'get: ' + v;
        },
        Set: function(v, same) {
            console.log('v', v);
            console.log('same', same);
            return v;
        },
    });
   

}


(function() {
    (function() {
        var def = 'defaultValue(and local private value)';
        /** testing same method as p4 in prototype, it works with tern */
        Object.defineProperty(this, 'p5', {
            get: function() {
                return def;
            },
            set: function(v) {
                def = v;
            }
        });
    }).call(this);
}).call(testFn.prototype);

var t = new testFn();
