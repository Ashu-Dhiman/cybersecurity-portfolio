define(function(require) {

    "use strict";
    var domReady = require("!domReady");
    require("login");

    var jQuery = require("jquery");
    var loginBox = require("components.loginBox");
    var jrsConfigs = require("jrs.configs");

    domReady(function(){
        isIPad() && jQuery('#frame').hide();

        if (jrsConfigs.isProVersion) {

            loginBox._initVars = function(options) {
                this._baseInitVars(options);

                this._organizationId = options.organizationId;
                this._singleOrganization = options.singleOrganization;
            };

            loginBox._processTemplate = function() {
                this._baseProcessTemplate();

                this._organizationIdLabel = this._dom.select('label[for="orgId"]')[0];
                this._organizationIdInput = $('orgId');
            };

            loginBox.initialize = function(options) {
                this._baseInitialize(options);

                if (!this._singleOrganization){
                    this._organizationIdLabel.removeClassName("hidden");
                }else if (this._organizationId != 'null' || this._singleOrganization) {
                    this._organizationIdInput.setValue(this._organizationId);
                }
            };
        }

        loginBox.initialize(jrsConfigs.loginState);

        if (isIPad()) {
            var orientation = window.orientation;
            switch (orientation) {
                case 0:
                    jQuery('#welcome').get(0).style.webkitTransform = 'scale(0.8) translate3d(-60px,0,0)';
                    jQuery('h2.textAccent').css('font-size', '14px').parent().css('width', '39%');
                    jQuery('#copy').css('width', '600px');
                    jQuery('#loginForm').css({
                        left: '524px',
                        right: ''
                    });
                    break;
                case 90:
                    jQuery('#welcome').get(0).style.webkitTransform = 'scale(1.0) translate3d(0,0,0)';
                    jQuery('h2.textAccent').css('font-size', '16px').parent().css('width', '46%');
                    jQuery('#copy').css('width', '766px');
                    break;
                case -90:
                    jQuery('#welcome').get(0).style.webkitTransform = 'scale(1.0) translate3d(0,0,0)';
                    jQuery('h2.textAccent').css('font-size', '16px').parent().css('width', '46%');
                    jQuery('#copy').css('width', '766px');
                    break;
            }
            jQuery('#frame').show();
            window.addEventListener('orientationchange', function(e) {
                var orientation = window.orientation;
                switch (orientation) {
                    case 0:
                        jQuery('#welcome').get(0).style.webkitTransform = 'scale(0.75) translate3d(-60px,0,0)';
                        jQuery('h2.textAccent').css('font-size', '14px').parent().css('width', '39%');
                        jQuery('#copy').css('width', '600px');
                        jQuery('#loginForm').css({
                            left: '524px',
                            right: ''
                        });
                        break;
                    case 90:
                        jQuery('#welcome').get(0).style.webkitTransform = 'scale(1.0) translate3d(0,0,0)';
                        jQuery('h2.textAccent').css('font-size', '16px').parent().css('width', '46%');
                        jQuery('#copy').css('width', '766px');
                        jQuery('#loginForm').css({
                            left: '',
                            right: '-10px'
                        });
                        break;
                    case -90:
                        jQuery('#welcome').get(0).style.webkitTransform = 'scale(1.0) translate3d(0,0,0)';
                        jQuery('h2.textAccent').css('font-size', '16px').parent().css('width', '46%');
                        jQuery('#copy').css('width', '766px');
                        jQuery('#loginForm').css({
                            left: '',
                            right: '-10px'
                        });
                        break;
                }
            });
        }
    });
});
