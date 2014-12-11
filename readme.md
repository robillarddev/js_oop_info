# Javascript OOP Basics *(No Inheritance)*#

## Terminology ##
- **Field:** a variable that is not a function `var x = 1;`
- **Method**: a variable that is a function `var x = function(){};`
- **Member**: a method or field
- **Class**: a function intended to be reused by multiple instances by using `new`  keyword *(there are other ways to create an instance)* `function className(){ this.field=''; }`
- **Instance**: a variable assigned to an instance of a class `var x = new className();`
- **Access Modifiers **
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
- *Can access prototype and public members by using an alias for this, example:*

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

#Inheritance#

##Constructor Inheritance##
 - Inherit the class constructor (public instance members)
 - Can only be done once per class
 - Performance is slow because all parent class members are copied to the child class
 
``` javascript
function baseClassName(param1) {
    var fieldName = param1;
    this.methodName = function() {
        return fieldName;
    };
}

function childClassName(param1) {
    baseClassName.call(this, param1); //params are optional
    this.childMethodName = function() {
        return this.methodName(); //call inherited method
    };
    
    //private members from parent are not accessible, so the code below is wrong:
    //result: childFieldName= undefined
    var childFieldName = fieldName;
}
```
 

##Prototype Inheritance##



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
	 - [Ace Editor OOP Inheritance](https://github.com/ajaxorg/ace/blob/master/lib/ace/lib/oop.js#L34)
		 - *(not sure where the code came from, see [this StackOverflow question](http://stackoverflow.com/questions/21369432/why-should-we-use-object-create) about the same code*
	 - Inheritance Methods
		 - Prototype Inheritance
			 - Inherit the prototype of an object using a mixin
	 			 - Can inherit multiple prototypes using mixins
			 - Inherit the prototype of an object using Object.create
				 - Can only be used once
		 - Constructor Inhertiance
			 - Inherit the constructor using `[parentClass].call(this, [arguments] )` inside of the constructor
				 - Can only be used once

####TODO####
- [ ] Add details about the various ways to write classes: `function className(); var className=function(); //etc...`
- [ ] Add information about inheritance