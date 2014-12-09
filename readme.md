the Selectize function that gets direction (ltr,rtl) from the input throws an error when using FireFox if Selectize is called in an iframe with display:none;

This is a [known issue](https://bugzilla.mozilla.org/show_bug.cgi?id=548397) with FireFox.

The issue can easily be solved in selectize by modifying the following code:

    dir = window.getComputedStyle ? window.getComputedStyle(input, null).getPropertyValue('direction') : input.currentStyle && input.currentStyle.direction;
    dir = dir || $input.parents('[dir]:first').attr('dir') || '';

Change to:

    var alternativeGetDir=function(){
        return input.currentStyle && input.currentStyle.direction  || $input.parents('[dir]:first').attr('dir') || '';
    };
    try{          
        dir = window.getComputedStyle ? window.getComputedStyle(input, null).getPropertyValue('direction') : alternativeGetDir();
    }
    catch(ex){
        //will throw error in FF if loaded in iframe with display:none
        dir = alternativeGetDir();
    }

