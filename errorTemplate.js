var errorName = (function() {
    //https://github.com/sevin7676/js_oop_info/blob/master/errorTemplate.js
    var parentClass = Error;
    function CustomError(message) {
        var temp = parentClass.call(this, message);
        temp.name = this.name = 'errorName';
        this.stack = temp.stack;
        this.message = temp.message;
    }
    microMixin(CustomError.prototype, null, parentClass);
    return CustomError;
}());
