(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as anonymous module.
        //TODO: find out more intellijent solution (i18n common solution)
        //such functionality should be on the server
        function generateModuleName(prefix, userLocale, avaliableLocales){
            //can't use underscore because it's not loaded yet
            function contains(value){
                for (var i = 0; i < avaliableLocales.length; i++){
                    var locale = avaliableLocales[i];
                    if (locale == value){
                        return true;
                    }
                }
                return;
            }

            var postfix = "en";

            if (userLocale){
                if (contains(userLocale)){
                    postfix = userLocale;
                }else if (contains(userLocale.substring(0,2))){
                    postfix = userLocale.substring(0,2);
                }
            }

            return prefix + postfix.replace("_", "-");

        }

        var dataPickerModule = generateModuleName(
            "datepicker.i18n.",
            // TODO: refactor this somehow in order not to use global var
            __jrsConfigs__.userLocale,
            __jrsConfigs__.avaliableLocales
        );

        define(["jquery", "jquery.ui", dataPickerModule], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function (jQuery) {
    jQuery.datepicker.movePickerRelativelyToTriggerIcon = function (input, inst) {
        var offset = jQuery(input).offset().left;
        var width = parseFloat(inst.dpDiv.css("width").replace("px", ""));
        var move = offset + input.offsetWidth + width < jQuery(window).width();
        inst.dpDiv.css({
            marginLeft:move ? input.offsetWidth + "px" : 0
        });
    };
}));