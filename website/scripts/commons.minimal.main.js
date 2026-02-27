define(function(require){

    "use strict";

    require("commons.bare.main");
    
    var domReady = require("!domReady");
    var heartbeat = require("components.heartbeat");
    var jrsConfigs = require("jrs.configs.amd");
    var aboutDialog = require("components.about");
    var webHelp = require("components.webHelp");
    var $ = require("jquery");

    domReady(function(){
        //Heartbeat
        heartbeat.initialize(jrsConfigs.heartbeatInitOptions);
        heartbeat.start();

        jrsConfigs.initAdditionalUIComponents && aboutDialog.initialize();

        //Web help
        var helpLink = $("#helpLink");
        if (helpLink) {
            helpLink.on("click", webHelp.displayWebHelp);
        }
    });

});
