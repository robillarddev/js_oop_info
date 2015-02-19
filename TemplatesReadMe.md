## Which Template to Choose ##

- **ClassTemplate**: Class that will be inherited from and it needs to inherit from other classes
- **singletonTemplate**: Class that needs a single instance
- **classTemplate_noDep**: Class that will be inherited from but does not need to inherit from other classes
- **classTemplateDelayed**: Class that needs to inherit from other classes that may not be declared above it. Must be invoked as an instance prior to any other classes inheriting from this class. *(don't inherit from this class as its parent class/mixins are not added until an instance is invoked)*
