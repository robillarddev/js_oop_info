# Javascript OOP#

## Files ##
- [Class Template](https://github.com/sevin7676/js_oop_info/blob/master/classTemplate.js)
- [Annotated Class Template](https://github.com/sevin7676/js_oop_info/blob/master/classTemplateAnnotated.js) *(with build in tests)*
- [Minimal inheritance library](https://github.com/sevin7676/js_oop_info/blob/master/inheritanceLib.js) *(required for using template)*


## Terminology ##
- **Field:** a variable that is not a function `var x = 1;`
- **Method**: a variable that is a function `var x = function(){};`
- **Member**: a method or field
- **Class**: a function intended to be reused by multiple instances by using `new`  keyword *(there are other ways to create an instance)* `function className(){ this.field=''; }`
- **Instance**: a variable assigned to an instance of a class `var x = new className();`
- **Access Modifiers**
	- **Private**: member that can **not** be invoked from a class instance
	- **Public**: member that is unique to a class instance and can be invoked from a class instance
		- *This is commonly referred to a [privileged](http://javascript.crockford.com/private.html), but I find this term to be confusing so I avoid it*
	- **Prototype**: member that is shared amongst all class instances and can be invoked from a class instance
		- *This is commonly referred to a [Public](http://javascript.crockford.com/private.html), but I disagree with this naming convention*

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
- *Can access prototype and public members by using an alias for `this`, example:*

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

## Public *(AKA Privileged)* ##
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
- Access to private, prototype, and public members
- Unique to each class instance
- Can be deleted or replaced per instance


## Prototype *(AKA Public)* ##
``` javascript 
function className() {}
//prototype field
className.prototype.fieldName = '';
//prototype method
className.prototype.methodName = function() {
    return this.fieldName;
};
```
- Can be invoked from a class instance
- Access to prototype and privileged members
- Methods are shared by all class instances *(modifying a method changes the method for all instances)*
- Fields are shared by all class instances **AND** unique to each instance *([read this](http://stackoverflow.com/a/16751343/1571103))*
	- *My opinion:  privileged fields should be avoided as the behaviour is very confusing*
 	- Example below:


``` javascript
function className() {}
//prototype field
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
- Access to static members  *( and prototype but not in the typical sense... research more)*
- Shared by all class instances and globally as this is a singleton pattern *(modifying a method changes the method globally)*



# Inheritance#
### Prototype Inheritance *(two methods for doing this)* ###
##### Mixin Prototype Inheritance #####
 - Can inherit multiple prototypes using mixins
-  If the object that is mixed in changes after its mixed in, it will have no effect on the objects that have already received the mixin *(because the mixin copies the members)*


##### Object.create Prototype Inheritance #####
 - Can only be used once per object
 - If the parent class prototype is changed, then all child classes will also be changed *(because the inheritance links to the parent class members)*
 
### Constructor Inheritance *(Instance  members)*###
 - Inherit the constructor using `[parentClass].call(this, [arguments] )` inside of the constructor
 - Can only be used once

#Mixin Class#
- A class whose purpose is to have its members mixed into another class
- The members can be written several different ways:
1. Using public instance members in the constructor, but this is **NOT** recommended as it would require the inheritance to create a new instance for the mixin resulting in unpredictable `this` behavior
2. Using prototype members
	- Will have to write out `className.prototype` to mixin from the class
	- `this` in the prototype methods will refer to `this` in the child class *(this is how prototype always works, so its expected)*
3. Using public static members
	- Can mixin by simply using `className`
	- `this` in the static methods will refer to `this` in the child class *(this may be slightly confusing when writing the mixin class in this notation)*



# Links #
 - [Naming of Prototype, Private, Privileged, and Static ](http://stackoverflow.com/a/12439637/1571103)
 - [Using this vs prototype](http://stackoverflow.com/a/310914/1571103)
 - [Basic Inheritance](http://stackoverflow.com/a/10430875/1571103)
 - Performance
	 - [My jsperf test](http://jsperf.com/sevin7-public-vs-privileged-methods)
		 - Result: Prototype is easily 100x faster. Testing creating 100 instances of my `apField` class and it took about 5ms. After changing the class and its base classes to use prototype where possible, the same 100 instances takes less than 1ms.
	 - [Performance of Prototype vs this](http://stackoverflow.com/questions/3493252/javascript-prototype-operator-performance-saves-memory-but-is-it-faster)
	 - [jsperf Prototype vs Non-Prototype](http://jsperf.com/prototype-vs-non-prototype/11)
 - OOP Patterns
	 - [Classical Inheritance in Javascript (Douglas Crockford)](http://www.crockford.com/javascript/inheritance.html)
	 - [Folding pattern](http://intrepidis.blogspot.com/2013/04/javascript-folding-pattern.html)
	 - [StackOverflow OOP Pattern](http://stackoverflow.com/a/1114121/1571103)
 - Inheritance
	 - [Ace Editor OOP Inheritance](https://github.com/ajaxorg/ace/blob/master/lib/ace/lib/oop.js#L34) *(not sure where the code came from, see [this StackOverflow question](http://stackoverflow.com/questions/21369432/why-should-we-use-object-create) about the same code*

####TODO####
- [ ] Add details about the various ways to write classes: `function className(); var className=function(); //etc...`

