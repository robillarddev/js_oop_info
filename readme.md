# Javascript OOP Basics #

## Terminology ##
- **Field:**: a variable that is not a function `var x = 1;`
- **Method**: a variable that is a function `var x = function(){};`
- **Member**: a method or field
- **Class**: a function intended to be reused by multiple instances by using `new`  keyword *(there are other ways to create an instance)* `function className(){ this.field=''; }`
- **Instance**: a variable assigned to an instance of a class `var x = new className();`
- **Access Modifiers**
	- *Javascript does not have access modifier keywords, instead the access level of a member is determined by the way the code is laid out. The class template in this repository shows how to lay out members to achieve the access levels listed below*
	- **Private**: member that can **not** be invoked from a class instance
	- **Public**: member that is unique to a class instance and can be invoked from a class instance
		- *This is commonly referred to a [privileged](http://javascript.crockford.com/private.html), but I find this term to be confusing so I avoid it*
	- **Prototype**: member that is shared amongst all class instances and can be invoked from a class instance
		- *This is commonly referred to a [Public](http://javascript.crockford.com/private.html), but I disagree with this naming convention*
- **Constructor**:  The function that defines an object
	- A [Javascript constructor](http://zeekat.nl/articles/constructors-considered-mildly-confusing.html) is **not** the same as a constructor in C#, Java, etc..
	- In most languages a constructor is a method that is used to create an object and initialize the state of the object:
	
```c#
class className
{
	//a constructor in C#
    public className(string param1)
    {
		//some code that is used to initialize the class
    }
}
```

- In Javascript a constructor is simply a function with a name:

``` javascript
function className(){}//this is a 'consructor' in javascript
var instance = new className();
console.log(instance.constructor);//result: function className(){}
console.log(instance.constructor.name);//result: className
```
- A C#/Java like constructor can be implemented by simply executing a function inside of the constructor *(more than one function can be executed if desired)*
```javascript
function classNameWithParams(param1){
    this.param1 = param1;//a constructor can accept parameters
    this.testMethod = function(){
        console.log('param1: '+ this.param1);
    };
    this.testMethod();//a constructor can invoke methods, make sure that the invocation of the method is below the definition of all used members
}
var instance = new classNameWithParams('param1 value');//logs: param1: param1 value
```

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

 - It is also possible to mixin the parent constructor, however this does **NOT** work properly, this example is to show why you should **NOT** do this
 
``` javascript
//DO NOT DO THIS
function baseClassName() {
    var self = this;
    this.baseField = 'base field';
    this.methodName = function() {
        console.log('baseField=' + this.baseField);
        console.log('childField=' + this.childField);
        console.log('self.constructor.name=' + self.constructor.name);
        console.log('this.constructor.name=' + this.constructor.name);
    };
}
function childClassName() {
    this.childField = 'child field';
}
childClassName.prototype.methodName = new baseClassName().methodName;
/*(could also do a mixin of all members)
var temp = new baseClassName();
for (var key in temp) {
    childClassName.prototype[key] = temp[key];
}*/

new childClassName().methodName();
// result:
// baseField=undefined
// childField=child field
// self.constructor.name=baseClassName
// this.constructor.name=childClassName

//'this' in base class is now a reference to 'this' of child class, which is why you should NOT use this method for ineheritance!
```
 

##Prototype Inheritance##
- Inherits the prototype members *(prototype members are always public)*

### Linking to Parent Prototype ###
- Can only be done once per class
- Changing the prototype of a class whose prototype has been inherited will affect all child classes
- Performance is excellent because the child class simply references the parent class prototype

``` javascript
function baseClassName() {}
baseClassName.prototype.methodName = function() {
    return 'baseClass';
};

function childClassName() {}
//the preferred mehod (requires es5):
childClassName.prototype = Object.create(baseClassName.prototype, {
    constructor: {
        value: childClassName,
        writable: true,
        configurable: true
    }
});

//another way to write the inheritance portion:
childClassName.prototype = baseClassName.prototype;//BAD
//however, doing this is bad because it will mess up the constructor reference

//The correct way to use this method is:
var tempCtor = function() {};
tempCtor.prototype = baseClassName.prototype;
childClassName.prototype = new tempCtor();
childClassName.prototype.constructor = childClassName;

```

### Copying the Parent Prototype ###

- Commonly referred to as a `Mixin`
- Can be done multiple times per class
- Performance is not as good as linking because this creates a copy of each member
- Changing the prototype of the a class whose prototype has been inherited using this method will have no affect on child classes
	- [More about Mixins](http://peter.michaux.ca/articles/mixins-and-constructor-functions)

```javascript
function baseClassName() {}
baseClassName.prototype.methodName = function() {
    return 'baseClass';
};
function childClassName() {}
childClassName.prototype.methodName = baseClassName.prototype.methodName;

//the above method can simpliefied into a 'mixin' function that will
//copy all of the prototype members
for (var key in baseClassName.prototype) {
    //optionally add: if(baseClassName.prototype.hasOwnProperty(key))
    //this will prevent any mixed members from baseClassName from getting copied
    childClassName.prototype[key] = baseClassName.prototype[key];
}
```

##Static Inheritance##
- Inherits the public static members
- Works exactly the same as Prototype Inheritance (can use linking or copying)
	- Use `baseClassName` instead of `baseClassName.prototype` in the prototype Inheritance examples *(this will copy the static `baseClassName` members  to `childClassName.prototype`. It is also possible to copy the `baseClassName` members to the static members the child class by simply using `childClassName` for the mixin)*.

##Combining Inheritance##

- A single class can inherit any combination of  Constructor, Prototype, and Static Members from another class.
- A single class may inherit Prototype and Static Members from an unlimited number of classes when using the copy inheritance method

#Methods for Writing a Class#

##Links##
- [Performance Comparison](http://jsperf.com/closure-function-declaration-vs-function-expression/3)
- [Long explanation](http://stackoverflow.com/questions/336859/var-functionname-function-vs-function-functionname)


##Named Function Expression##
```javascript
var className = function(){}
```
- Ordering of the code matters
```javascript
f1();// Error
var f1 = function() {};

var f2 = function() {};
f2();// Pass
```


##Function Declaration##
```javascript
function className(){}
```
- Ordering of code does not matter
	- *I prefer this method because I don't want the order of code to matter for my classes, however the templates in this repo can't use this method*
- Not allowed to appear inside of block statements such as `if`, `while`, `for`
	- *Currently this is only enforced in strict mode, but expect it to be standard soon*





#Class Template#
*This repo includes templates*

##Creating Mixin Classes Using the Template##

 - A *Mixin Class* is a class whose sole purpose is to be mixed in with other classes
 - Use the class template, and use the prototype members
 - Private static members can also be used 
 - Don't use public static members (it would allow for excluding .prototype when doing the mixin, but it causes
   confusion as about the meaning  of `sf` as its is inconsistent with normal class static members
 - Be aware that the mixin class can't define public members, so using public members requires adding them to the class dynamically

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
	 

####TODO####
- [ ] Add details about the various ways to write classes: `function className(); var className=function(); //etc...`
