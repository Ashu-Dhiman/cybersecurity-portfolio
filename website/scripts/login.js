/*
 * Copyright (C) 2005 - 2012 Jaspersoft Corporation. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased  a commercial license agreement from Jaspersoft,
 * the following license terms  apply:
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License  as
 * published by the Free Software Foundation, either version 3 of  the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero  General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public  License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * Requires: jquery 1.4+ and jcryption 1.2
 */

// JQUERY BODYGUARD
(function (jQuery, jrsConfigs) {
    jQuery(function () {
        webHelpModule.setCurrentContext("login");

        var submitLogin = function (event) {
            if (jrsConfigs.isEncryptionOn) {      //global property from jsp page, set up in security-config.properties
                var paramsToEncrypt = {j_password:jQuery("#j_password_pseudo").val()};
                if (typeof doesAllowUserPasswordChange != 'undefined' && doesAllowUserPasswordChange) {
                    var newPass1 = jQuery("#j_newpassword1_pseudo").val();
                    var newPass2 = jQuery("#j_newpassword2_pseudo").val();
                    if (jQuery.trim(newPass1)) paramsToEncrypt.j_newpassword1 = newPass1;
                    if (jQuery.trim(newPass2)) paramsToEncrypt.j_newpassword2 = newPass2;
                }

                JSEncrypter.encryptData(paramsToEncrypt,
                    function (encData) {
                        for (var k in encData) {
                            //set hidden fields to encrypted values
                            jQuery('#' + k).val(encData[k]);

                            // hide pseudo password field contents, so that browser autocomplete
                            // is not trigger to remember the encrypted password every time.
                            jQuery('#' + k + '_pseudo').val('');
                        }

                        jQuery('#loginForm').submit();
                    });
            }
            else {
                jQuery("#j_password").val(jQuery("#j_password_pseudo").val());
                jQuery("#j_newpassword1").val(jQuery("#j_newpassword1_pseudo").val());
                jQuery("#j_newpassword2").val(jQuery("#j_newpassword2_pseudo").val());
                jQuery('#loginForm').submit();
            }

            event.preventDefault();
        }; // end submitLogin

        jQuery('#submitButton').click(submitLogin);
        jQuery('#j_username').keypress(function (event) {
            if ((event.keyCode || event.which) != 13)
                return;
            submitLogin(event);
        });
        jQuery('#j_password_pseudo').keypress(function (event) {
            if ((event.keyCode || event.which) != 13)
                return;
            submitLogin(event);
        });
        jQuery('#orgId').keypress(function (event) {
            if ((event.keyCode || event.which) != 13)
                return;
            submitLogin(event);
        });

    }); // document.ready

})(jQuery, __jrsConfigs__); // JQUERY BODYGUARD


