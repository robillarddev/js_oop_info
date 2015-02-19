## Which Template to Choose ##

- **ClassTemplate**: Class that will be inherited from and it needs to inherit from other classes
- **singletonTemplate**: Class that needs a single instance
- **classTemplate_noDep**: Class that will be inherited from but does not need to inherit from other classes
- **classTemplateDelayed**: Class that needs to inherit from other classes that may not be declared above it. Must be invoked as an instance prior to any other classes inheriting this classe's protoype as a mixin *(this is not an issue if the child inherits from this as a parent class).*
