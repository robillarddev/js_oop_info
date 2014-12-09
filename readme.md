# Javascript OOP Basics *(No Inheritance)*#

## Terminology ##
- **Field:** a variable that is not a function `var x = 1;`
- **Method**: a variable that is a function `var x = function(){};`
- **Member**: a method or field
- **Class**: a function intended to be reused by multiple instances by using `new`  keyword *(there are other ways to create an instance)* `function className(){ this.field=''; }`
- **Instance**: a variable assigned to an instance of a class `var x = new className();`

# Class Member Types #
## Private ##
``` javascript 
function className() {
    //private field
    var fieldName='';
    //private method
    var methodName = function() {
        return fieldName;
    };
}
```
- Can **not** be invoked from a class instance
- Access to private members only
- Unique to each class instance
- *Can access public and privileged members by using an alias for this, example:*

```javascript
function className() {
    var self = this;
    //public field
    this.fieldName='';
    //private method
    var methodName = function() {
        //'this' refers to `window` in this scope, so alias of self is used
        return self.fieldName;
    };
}
```

## Public ##
``` javascript 
function className() {
    //public field
    this.fieldName='';
    //public method
    this.methodName = function() {
        return this.fieldName;
    };
}
```
- Can be invoked from a class instance
- Access to private, public, and privileged members
- Unique to each class instance


## Privileged##
``` javascript 
function className() {}
//privileged field
className.prototype.fieldName = '';
//privileged method
className.prototype.methodName = function() {
    return this.fieldName;
};
```
- Can be invoked from a class instance
- Access to public and privileged members
- Methods are shared by all class instances *(modifying a method changes the method for all instances)*
- Fields are shared by all class instances **AND** unique to each instance *([read this](http://stackoverflow.com/a/16751343/1571103))*
	- *My opinion:  privileged fields should be avoided as the behaviour is very confusing*
 	- Example below:


``` javascript
function className() {}
//privileged field
className.prototype.fieldName = 'shared';

var instance = new className();
console.log(instance.fieldName);//'shared'
console.log(className.prototype.fieldName);//'shared'

className.prototype.fieldName = 'modified';
console.log(instance.fieldName);//'modified'
console.log(className.prototype.fieldName);//'modified'

instance.fieldName="overridden for instance only";
console.log(instance.fieldName);//'overridden for instance only'
console.log(className.prototype.fieldName);//'modified'
```


## Static ##
``` javascript 
function className() {}
//static field
className.fieldName = '';
//static method
className.methodName = function() {
    return className.fieldName;
};
```
- Can **not** be invoked from a class instance
	-	Invoked using the name of the class *(not the name of the instance)*
- Access to static and public members
- Shared by all class instances and globally as this is a singleton pattern *(modifying a method changes the method globally)*


# Links #
 - [Naming of Public, Private, Privileged, and Static ](http://stackoverflow.com/a/12439637/1571103)
 - [Using this vs prototype](http://stackoverflow.com/a/310914/1571103)
 - [Basic Inheritance](http://stackoverflow.com/a/10430875/1571103)
 - [Performance of Prototype vs this](http://stackoverflow.com/questions/3493252/javascript-prototype-operator-performance-saves-memory-but-is-it-faster)

####TODO####
- [ ] Add details about the various ways to write classes: `function className(); var className=function(); //etc...`
- [ ] Add information about inheritance