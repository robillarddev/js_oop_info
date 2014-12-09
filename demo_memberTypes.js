//simple test of private, public, priveleged, and static fields and methods (use in browser)
document.addEventListener('DOMContentLoaded', function() {
    window.t1 = new tf();
    window.t2 = new tf();
    var methodTests = function() {
        /*** privileged ***/
        t1.privilegedMethod(); //test
        //modify
        t1.privilegedMethod = function() {
            console.log('\nThis method is modified for a single instance only');
        };
        t1.privilegedMethod(); //logs the new modified method
        t2.privilegedMethod(); //logs the original method


        /*** public ***/
        tf.prototype.publicMethod = function() {
            console.log('\nThis method is modified for all instances');
        };
        t1.publicMethod();
        t2.publicMethod(); //same as t1.publicMethod()


        /*** static ***/
        tf.staticMethod(); //not invoked via instance
        //modify
        tf.staticMethod = function() {
            console.log('modified static method is the same for all instances because its not associated with an instance');
        };
    };
    var fieldTests = function() {
        console.log('\n\n\n\n Fields Tests');

        /*** privileged ***/
        t1.privilegedField = 'c'; //this only modifies a single instance
        console.log('t1.privilegedField= ' + t1.privilegedField);
        console.log('t2.privilegedField= ' + t2.privilegedField);

        /*** public ***/
        t1.publicField = 'y'; //this only modifies a single instance
        console.log('t1.publicField= ' + t1.publicField);
        console.log('t2.publicField= ' + t2.publicField);
        //CONCLUSION: public and privileged fields both function the same way in regards to instance. There may be other differences?

        /*** static ***/
        tf.staticField = 'n'; //change is global as its not related to an instance
        console.log('tf.staticField= ' + tf.staticField); //not invoked via instance
    };

    methodTests();
    fieldTests();
});

//test function (as a 'class')
function tf() {
    var self = this;
    var privateField = "a";
    
    var privateMethod = function(){
        console.log('\n hello from privateMethod');
        console.log('privateMethod can access private members. It is unique to each object instance.');
        console.log('It can also access all public and privileged members by using an alias for `this`, such as self');
        console.log('However, it can\'t be accessed by a class instance directly');
        console.log('privateField= ' + privateField);
        console.log('privilegedField= ' + self.privilegedField);
        console.log('publicField= ' + self.publicField);
    };

    //this is idential to a publicField, so it really shouldn't be called a `privileged field`. It is unique to each instance
    this.privilegedField = "b";

    this.privilegedMethod = function() {
        console.log('\n hello from privilegedMethod');
        console.log('privilegedMethod can access private, privileged, and public members. It is unique to each object instance.');
        console.log('privateField= ' + privateField);
        console.log('privilegedField= ' + this.privilegedField);
        console.log('publicField= ' + this.publicField);
        this.publicMethod();
        privateMethod();
    };
}

//this is identical to a privilegedField, it is unique to each instance
tf.prototype.publicField = "x";

tf.prototype.publicMethod = function() {
    console.log('\n hello from publicMethod');
    console.log('publicMethod can access privileged, and public members. There is only 1 instance for all objects, so overriding it will affect all `class` instances');
    console.log('publicField=' + this.publicField);
    console.log('privilegedField=' + this.privilegedField);
};

tf.staticMethod = function() {
    console.log('\n hello from staticMethod');
    console.log('staticMethod does NOT have access to any instance members (private, public, or privileged)');
};

tf.staticField = "m";