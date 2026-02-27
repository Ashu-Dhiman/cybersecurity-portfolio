/*
 * Copyright (C) 2005 - 2012 Jaspersoft Corporation. All rights reserved.
 * http://www.jaspersoft.com.
 * Licensed under commercial Jaspersoft Subscription License Agreement
 */

//JasperServer namespace  mess


jQuery.noConflict();
/*
 *  One of Jasperserver namespaces.
 */
var JRS = {
    vars: {
        element_scrolled: false,
        ajax_in_progress: false,
        current_flow: null,
        contextPath: __jrsConfigs__.contextPath
    },
    i18n : {}
};

var Calendar = {};


var isEncryptionOn = false;

function isProVersion(){
    return __jrsConfigs__.isProVersion;
}


var jaspersoft = {

    components:{},
    i18n:{}

};


if(typeof(JRS) == "undefined"){
    JRS = {
        Mocks : {}
    };
}

if (typeof(JRS.vars) == "undefined"){
    JRS.vars = {
        element_scrolled: false,
        ajax_in_progress: false,
        current_flow: null
    };
}

//TODO: move closer to Import/Export
if (typeof(JRS.Export) == "undefined"){
    JRS.Export = {i18n : {
        "file.name.empty": "export.file.name.empty",
        "file.name.too.long":"export.file.name.too.long",
        "file.name.not.valid":"export.file.name.not.valid",
        "export.select.users":"export.select.users",
        "export.select.roles":"export.select.roles",
        "export.session.expired":"export.session.expired",
        "error.timeout":"export.file.name.empty"
    }, configs:{
        TIMEOUT : 1200000,
        DELAY: 3000
    }};
}

if (typeof(localContext) == "undefined"){
    localContext = { }
}

//TODO: move to common module
if (__jrsConfigs__.calendar){

    jQuery.timepicker.setDefaults(__jrsConfigs__.calendar.timepicker);

    JRS.i18n["bundledCalendarFormat"] = __jrsConfigs__.calendar.i18n.bundledCalendarFormat;
    JRS.i18n["bundledCalendarTimeFormat"] = __jrsConfigs__.calendar.i18n.bundledCalendarTimeFormat;
}

