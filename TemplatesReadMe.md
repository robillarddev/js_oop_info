## Which Template to Choose ##

- **ClassTemplate**: Class that will be inherited from and it needs to inherit from other classes
- **singletonTemplate**: Class that needs a single instance
- **classTemplate_noDep**: Class that will be inherited from but does not need to inherit from other classes
- **classTemplateDelayed**: Class that needs to inherit from other classes that may not be declared above it. Don't use this class as a prototype mixin for other classes (but can use as a parentClass as long as the child class is also used the delayed template).
