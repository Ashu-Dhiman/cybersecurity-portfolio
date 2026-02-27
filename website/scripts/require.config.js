requirejs.config({
    baseUrl: "scripts",

    enforceDefine:true, //allow to catch script load errors in IE

    map: {

        'scheduler/view/jobs': {
            'backbone': 'backbone-0.9.2'
        },
        'scheduler/view/job': {
            'backbone': 'backbone-0.9.2'
        },
        'scheduler/view/editor': {
            'backbone': 'backbone-0.9.2'
        },
        'scheduler/view/app': {
            'backbone': 'backbone-0.9.2'
        },
        'scheduler/view/editor/holidayCal': {
            'backbone': 'backbone-0.9.2'
        },
        'scheduler/view/editor/notifications': {
            'backbone': 'backbone-0.9.2'
        },
        'scheduler/view/editor/output': {
            'backbone': 'backbone-0.9.2'
        },
        'scheduler/view/editor/parameters': {
            'backbone': 'backbone-0.9.2',
            'controls.options': 'controls.base'
        },
        'scheduler/view/editor/schedule': {
            'backbone': 'backbone-0.9.2'
        },
        'scheduler/router/app': {
            'backbone': 'backbone-0.9.2'
        },
        'scheduler/model/job': {
            'backbone': 'backbone-0.9.2'
        },
        'scheduler/model/holidayCal': {
            'backbone': 'backbone-0.9.2'
        },
        'scheduler/collection/jobs': {
            'backbone': 'backbone-0.9.2'
        },
        'scheduler/collection/holidayCals': {
            'backbone': 'backbone-0.9.2'
        }
    },

    //Define dependencies between jasperserver script files

    paths:{

        //for build tool
        "jquery": "require-jquery",

        // 3rd party libs
        "prototype":"ext.utils.prototype",
        "effects":"ext.utils.effects",
        "builder":"ext.utils.builder",
        "dragdrop":"ext.utils.dragdrop",
        "dragdrop.extra": "ext.utils.dragdrop.extra",
        "touchcontroller":"ext.utils.touch.controller",
        "iscroll":"ext.utils.iscroll",
        "lodash": "common/lib/lodash-1.1.1",
        "underscore.string": "common/lib/underscore.string-2.3.0",
        "backbone-0.9.2": "config/backboneSyncSettings",
        "backbone": "config/backboneSyncSettings2",
        "xregexp": "ext.utils.xregexp.unicode.min",
        "moment": "common/lib/moment-2.1.0-patched",
        "backbone.validation": "common/lib/backbone-validation-amd-0.8.1",

        //aliases for plugins
        "bundle" : "common/plugin/bundle",
        "text" : "common/lib/requirejs-text-plugin-2.0.3",
        "domReady" : "common/lib/requirejs-domReady-2.0.1",

        //aliases for components
        "calendar2": "calendar/calendar2",
        "export.app": "export.app",
        "components.toolbar" : "components.toolbarButtons.events",
        "components.list" : "list.base",
        "components.tree" : "tree.treesupport",
        "component.repository.search" : "repository.search.actions",
        "report.view.toolbar": "jasperreports-reportViewerToolbar",
        "report.view": "report.view.runtime",

        "jquery.ui" : "jquery/js/jquery-ui-1.8.20.custom.min",
        "jquery.timepicker" : "jquery/js/jquery-ui-timepicker-addon",
        "jquery.urldecoder" : "jquery/js/jquery.urldecoder",
        "jquery.datapicker.extensions" : "jquery/js/jquery.datapicker.extensions",
        "jquery.jcryption" : "jquery/js/jquery.jcryption.min",
        "jquery.ui.mouse.touch": "jquery/ui/jquery.ui.touch-punch.min",
        "ext.jquery.jcryption" : "jquery/js/ext.jquery.jcryption",

        "wcf.scroll" : "../wcf/scroller",
        "datepicker.i18n.en" : "jquery/js/jquery.ui.datepicker-en",
        "datepicker.i18n.de" : "jquery/js/jquery.ui.datepicker-de",
        "datepicker.i18n.es" : "jquery/js/jquery.ui.datepicker-es",
        "datepicker.i18n.fr" : "jquery/js/jquery.ui.datepicker-fr",
        "datepicker.i18n.it" : "jquery/js/jquery.ui.datepicker-it",
        "datepicker.i18n.ja" : "jquery/js/jquery.ui.datepicker-ja",
        "datepicker.i18n.ro" : "jquery/js/jquery.ui.datepicker-ro",
        "datepicker.i18n.zh-CN" : "jquery/js/jquery.ui.datepicker-zh-CN",
        "datepicker.i18n.zh-TW" : "jquery/js/jquery.ui.datepicker-zh-TW",

//      Dynamic
        "csrf.guard": "../JavaScriptServlet?noext",
        "report.global": "../reportresource?resource=net/sf/jasperreports/web/servlets/resources/jasperreports-global.js",

//      Configuration
        "underscore" : "config/lodashTemplateSettings"

    },

    shim:{

        "underscore.string": {
            deps :["underscore"],
            exports: "_"
        },

        "common/lib/backbone-0.9.2-patched":{
            deps :["underscore"],
            exports:'Backbone',
            init: function () {
                var backbone = this.Backbone.noConflict();
                return backbone;
            }
        },

        "ext.utils.backbone":{
            deps :["underscore", "json3"],
            exports:'Backbone'
        },

        "mustache":{
            exports:'Mustache'
        },

        "json2":{
            exports:"JSON"
        },

        "json3":{
            exports:"JSON"
        },

        "prototype":{
            exports:"$"
        },

        "builder" : {
            deps: ["prototype"],
            exports: "Builder"
        },

        "effects":{
            deps:["prototype"],
            exports:"Effect"
        },

        "dragdrop": {
            deps: ["prototype", "effects"],
            exports: "Draggable"  // workaround for IE 'enforceDefine'
        },

        "dragdrop.extra": {
            deps: ["dragdrop", "jquery"],
            exports: "Draggable"
        },

        "touchcontroller" : {
            deps: ["jquery"],
            exports: "TouchController"
        },

        "iscroll" : {
            exports: "iScroll"
        },

        "xregexp": {
            exports: "XRegExp"
        },

        "jpivot.jaPro": {
           deps: ["prototype", "utils.common"],
           exports: "bWidth"
        },

        "wcf.scroll": {
            exports: "document"
        },

        //JasperServer Namespaces support

        "namespace":{
            deps: ["jquery.timepicker"],
            exports:"jaspersoft"
        },

        //CE modules

		"csrf.guard": {
            deps: ["core.ajax"],
            exports: "window"
        },

        "utils.common":{
            deps:["prototype", "jquery", "underscore"],
            exports:"jQuery"  // workaround for IE 'enforceDefine'
        },

        "utils.animation":{
            deps:["prototype", "effects"],
            exports:"jQuery" // workaround for IE 'enforceDefine'
        },

        "jquery.ui":{
            deps:["jquery"],
            exports: "jQuery"
        },

        "jquery.timepicker":{
            deps:["jquery", "jquery.datapicker.extensions"],
            exports: "jQuery"
        },

        "jquery.urldecoder":{
            deps:["jquery"],
            exports: "jQuery"
        },

        "tools.truncator":{
            deps:["prototype"],
            exports:"jQuery" // workaround for IE 'enforceDefine'
        },

        "tools.drag": {
            deps: ["jquery", "prototype"],
            exports: "Dragger"
        },

        "actionModel.modelGenerator": {
            deps: ["prototype", "utils.common", "core.events.bis"],
            exports: "actionModel"
        },

        "fakeActionModel.primaryNavigation":{
            exports: "primaryNavModule"
        },

        "actionModel.primaryNavigation": {
            deps: ["actionModel.modelGenerator"],
            exports: "primaryNavModule"
        },

        "core.layout":{
            deps:["jquery", "prototype", "utils.common", "dragdrop.extra", "tools.truncator", "iscroll", "components.webHelp"],
            exports:"layoutModule"
        },

        "home": {
            deps: ["prototype", "components.webHelp"],
            exports: "home"
        },

        "ajax.mock": {
            deps: ["jquery"],
            exports: "fakeResponce"
        },

        "core.ajax":{
            //TODO: it has dependency to 'jive' object in jasperreports-global.js (JasperReport)
            deps:["jquery", "prototype", "utils.common", "builder", "namespace"],
            exports:"ajax"
        },

        "core.accessibility": {
            deps:["prototype", "components.list", "actionModel.modelGenerator", "core.events.bis"],
            exports: "accessibilityModule"
        },

        "core.events.bis": {
            //use primary navigation as dependency !! circle dependency !!
            deps: ["jquery", "prototype" , "utils.common", "core.layout", "components.tooltip"],
            exports: "buttonManager"
        },

        "core.key.events": {
            deps: ["jquery", "prototype" , "utils.common", "core.layout"],
            exports: "keyManager"
        },

        "error.system": {
            deps: ["jquery", "core.layout", "utils.common"],
            exports: "systemError"
        },

        "components.templateengine":{
            deps:["namespace", "jquery", "underscore", "mustache"],
            exports:"jaspersoft.components.templateEngine"
        },

        "components.ajaxdownloader":{
            deps:["namespace", "jquery", "underscore", "backbone"],
            exports:"jaspersoft.components.AjaxDownloader"
        },

        "components.ajaxuploader":{
            deps:["namespace", "jquery", "underscore", "components.templateengine"],
            exports:"jaspersoft.components.AjaxUploader"
        },

        "components.authoritymodel" : {
            deps:["namespace", "jquery", "underscore", "backbone", "components.templateengine"],
            exports: "jaspersoft.components.AuthorityModel"
        },

        "components.authoritypickerview" : {
            deps:["namespace", "jquery", "underscore", "backbone", "components.templateengine"],
            exports: "jaspersoft.components.AuthorityPickerView"
        },

        "components.dialogs":{
            deps: ["jquery", "prototype", "underscore", "utils.common", "utils.animation", "core.layout"],
            exports:"dialogs"
        },

        "components.dialog":{
            deps: ["jquery", "underscore", "components.templateengine", "components.dialogs", "backbone"],
            exports:"jaspersoft.components.Dialog"
        },

        "components.dependent.dialog": {
            deps: ["prototype", "components.dialogs", "jquery", "components.list"],
            exports: "dialogs.dependentResources"
        },

        "components.list": {
            deps: ["jquery", "prototype", "components.layout", "touchcontroller", "utils.common", "dragdrop.extra", "core.events.bis"],
            exports: "dynamicList"
        },

        "components.layout": {
            deps: ["jquery", "underscore", "components.dialog", "components.systemnotificationview"],
            exports: "jaspersoft.components.Layout"
        },

        "components.searchBox": {
            deps: ["prototype", "utils.common", "core.events.bis"],
            exports: "SearchBox"
        },

        "components.servererrorsbackbonetrait":{
            deps:["namespace", "jquery", "underscore"],
            exports:"jaspersoft.components.ServerErrorsBackboneTrait"
        },

        "components.notificationviewtrait":{
            deps:["namespace", "jquery", "underscore", "backbone"],
            exports:"jaspersoft.components.NotificationViewTrait"
        },

        "components.statecontrollertrait":{
            deps:["namespace", "jquery", "underscore", "backbone", "components.state"],
            exports:"jaspersoft.components.StateControllerTrait"
        },

        "components.state":{
            deps:["namespace", "jquery", "underscore", "backbone", "components.servererrorsbackbonetrait"],
            exports:"jaspersoft.components.State"
        },

        "components.stateview":{
            deps:["namespace", "jquery", "underscore", "components.utils", "components.state"],
            exports:"jaspersoft.components.StateView"
        },

        "components.notificationview":{
            deps:["namespace", "jquery", "underscore", "components.notificationviewtrait"],
            exports:"jaspersoft.components.NotificationView"
        },

        "components.systemnotificationview":{
            deps:["namespace", "jquery", "underscore", "components.dialogs", "components.notificationviewtrait"],
            exports:"jaspersoft.components.SystemNotificationView"
        },

        // should not be used directly, load 'components.toolbar' instead
        "components.toolbarButtons" : {
            deps: ["jquery", "prototype"],
            exports : "toolbarButtonModule"
        },

        "messages/list/messageList": {
            deps: ["prototype", "components.list", "components.toolbar", "core.layout"],
            exports: "messageListModule"
        },

        "messages/details/messageDetails": {
            deps: ["prototype", "components.toolbar", "core.layout"],
            exports: "messageDetailModule"
        },

        "components.toolbar" : {
            deps: ["jquery", "prototype", "utils.common", "components.toolbarButtons"],
            exports : "toolbarButtonModule"
        },

        "components.tooltip" : {
            deps: ["jquery", "prototype", "utils.common", "core.layout"],
            exports : "JSTooltip"
        },

        "components.tree" : {
            deps: ["prototype", "tree.nanotree", "tree.treenode", "tree.events", "core.ajax"],
            exports: "dynamicTree"
        },

        "components.utils" : {
            deps: ["jquery", "underscore", "mustache", "components.dialogs", "core.ajax"],
            exports: "jaspersoft.components.utils"
        },

        "heartbeat": {
            deps: ["jquery"],
            exports: "checkHeartBeat"
        },

        "components.heartbeat": {
            deps: ["prototype", "core.ajax"],
            exports: "heartbeat"
        },

        "components.customTooltip": {
            deps: [],
            exports: "customTooltip"
        },

        "components.pickers": {
            deps: ["utils.common", "components.dialogs", "core.layout", "core.events.bis", "prototype", "jquery", "tree.utils"],
            exports: "picker"
        },

        "controls.core":{
            deps:["jquery", "underscore", "mustache" , "components.dialogs", "namespace", "controls.logging"],
            exports:"JRS.Controls"
        },

        "jrs.configs": {
            exports: "__jrsConfigs__"
        },

        "localContext": {
            exports: "window"
        },

        "controls.dataconverter":{
            deps:["underscore", "controls.core"],
            exports:"JRS.Controls"
        },

        "controls.datatransfer":{
            deps:["json3", "jquery", "controls.core", "backbone", "controls.dataconverter"],
            exports:"JRS.Controls"
        },

        "controls.basecontrol":{
            deps:["jquery", "underscore", "controls.core"],
            exports:"JRS.Controls"
        },

        "controls.base":{
            deps:["jquery", "underscore", "utils.common"],
            exports: "ControlsBase"
        },

        "repository.search.globalSearchBoxInit" : {
            deps: ["prototype", "actionModel.primaryNavigation", "components.searchBox"],
            exports: "globalSearchBox"
        },

        "attributes.model":{
            // TODO ZT use separate template engine instead of controls.core's in production
            deps: ["namespace", "underscore", "backbone", "components.templateengine", "controls.core"],
            exports: "jaspersoft.attributes"
        },

        "attributes.view":{
            deps: ["jquery", "underscore", "backbone", "attributes.model", "components.templateengine"],
            exports: "jaspersoft.attributes"
        },

        "export" : {
            deps:["namespace"],
            exports: "JRS.Export"
        },

        "export.statecontroller" : {
            deps:["jquery", "underscore", "backbone", "components.statecontrollertrait", "components.ajaxdownloader"],
            exports: "JRS.Export.StateController"
        },

        "export.servererrortrait" : {
            deps:["underscore", "components.servererrorsbackbonetrait"],
            exports: "JRS.Export.ServerErrorTrait"
        },

        "export.formmodel" : {
            deps:["jquery", "underscore", "backbone", "export.servererrortrait", "components.state"],
            exports: "JRS.Export.FormModel"
        },

        "export.extendedformview" : {
            deps:["jquery", "underscore", "backbone", "components.templateengine", "components.authoritymodel", "components.authoritypickerview", "components.state"],
            exports: "JRS.Export.ExtendedFormView"
        },

        "export.shortformview" : {
            deps:["jquery", "underscore", "backbone", "components.templateengine", "components.state"],
            exports: "JRS.Export.ShortFormView"
        },

        "export.app" : {
            deps: ["jquery", "underscore", "export.formmodel", "components.layout", "export.statecontroller", "components.state"],
            exports: "JRS.Export.App"
        },

        "import":{
            deps:["namespace"],
            exports: "JRS.Import"
        },

        "import.formmodel" : {
            deps: ["jquery", "underscore", "import", "backbone", "components.servererrorsbackbonetrait", "components.state"],
            exports: "JRS.Import.FormModel"
        },

        "import.extendedformview" : {
            deps:["jquery", "underscore", "import", "backbone", "components.templateengine", "components.state", "components.ajaxuploader", "components.stateview"],
            exports: "JRS.Import.ExtendedFormView"
        },

        "import.app" : {
            deps: ["jquery", "underscore", "import.formmodel", "components.layout", "components.state"],
            exports: "JRS.Import.App"
        },

        "report.view.base":{
            deps:["jquery", "underscore", "controls.basecontrol", "controls.base", "core.ajax"],
            exports: "Report"
        },

        "controls.components":{
            deps:["jquery", "underscore", "controls.basecontrol", "core.layout", "jquery.datapicker.extensions", "jquery.timepicker", "components/singleSelect/SingleSelect", "components/multiSelect/MultiSelect", "components/singleSelect/CacheableDataProvider"],
            exports:"JRS.Controls"
        },

        "controls.viewmodel":{
            deps:["jquery", "underscore", "controls.core", "controls.basecontrol"],
            exports:"JRS.Controls"
        },

        "controls.logging": {
            deps:["namespace"],
            exports:"JRS"
        },

        "controls.controller":{
            deps:["jquery", "underscore", "controls.core", "controls.datatransfer", "controls.viewmodel", "controls.components", "report.view.base", "jquery.urldecoder"],
            exports:"JRS.Controls"
        },

        "components.about":{
            deps: ["components.dialogs"],
            exports:"about"
        },

        "tree.nanotree" : {
            deps: ["prototype", "dragdrop.extra", "touchcontroller", "utils.common"],
            exports: "dynamicTree"
        },

        "tree.treenode" : {
            deps: ["prototype", "tree.nanotree"],
            exports: "dynamicTree"
        },

        "tree.events" : {
            deps: ["prototype", "tree.nanotree"],
            exports: "dynamicTree"
        },

        "tree.utils" : {
            deps: ["components.tree", "touchcontroller"],
            exports: "dynamicTree"
        },

        "jrs.runtime.shim": {
            exports: "__jrsConfigs__"
        },

        "components.webHelp": {
            deps: ["jrs.runtime.shim"],
            exports: "webHelpModule"
        },

        "components.loginBox": {
            deps:["prototype", "components.webHelp", "components.dialogs", "components.utils", "core.layout"],
            exports: "loginBox"
        },

        "components.tabs": {
            deps: ["prototype"],
            exports: "tabModule"
        },

        "login": {
            deps: ["jquery", "components.loginBox", "jrs.runtime.shim", "encryption.utils"],
            exports: "jQuery"  //workaround
        },

        "jquery.jcryption": {
            exports: "jQuery"
        },

        "ext.jquery.jcryption" : {
            deps: ["jquery.jcryption"],
            exports: "jQuery"
        },

        "encryption.utils": {
            deps: ["ext.jquery.jcryption"],
            exports: "JSEncrypter"
        },

        "tools.infiniteScroll": {
            deps: ["jquery", "prototype", "utils.common"],
            exports: "InfiniteScroll"
        },

        //Manage Common Components

        "mng.common": {
            deps: ["jquery", "prototype", "utils.common", "tools.infiniteScroll", "components.list", "components.tree", "components.toolbar"],
            exports: "orgModule"
        },

        "mng.main" : {
            deps: ["jquery", "mng.common"],
            exports: "orgModule"
        },

        "mng.common.actions": {
            deps: ["jquery", "prototype", "mng.common"],
            exports: "orgModule"
        },

        //Manage Roles Components

        "org.role.mng.main": {
            deps: ["jquery", "mng.main", "components.webHelp"],
            exports: "orgModule"
        },

        "org.role.mng.actions": {
            deps: ["org.role.mng.main"],
            exports: "orgModule"
        },

        "org.role.mng.components": {
            deps: ["jquery", "org.role.mng.main"],
            exports: "orgModule"
        },

        //Manage Users Components

        "org.user.mng.main": {
            deps: ["jquery", "mng.main"],
            exports: "orgModule"
        },

        "org.user.mng.actions": {
            deps: ["jquery", "org.role.mng.main", "org.user.mng.main", "mng.common.actions"],
            exports: "orgModule"
        },

        "org.user.mng.components": {
            deps: ["jquery", "org.user.mng.main", "mng.common.actions", "encryption.utils"],
            exports: "orgModule"
        },

        "administer.base": {
            deps: ["prototype", "underscore", "core.ajax"],
            exports: "Administer"
        },

        "administer.logging": {
            deps: ["administer.base", "core.layout", "components.webHelp", "utils.common"],
            exports: "logging"
        },

        "administer.options": {
            deps: ["administer.base", "core.layout", "components.webHelp", "utils.common"],
            exports: "Options"
        },

        //Repository, resources wizards

        "repository.search.components":{
            deps: ["repository.search.main", "prototype", "utils.common", "tree.utils"],
            exports: "GenerateResource"  //TODO: refactor it
        },

        "component.repository.search":{
            deps: ["repository.search.main","repository.search.components", "prototype", "actionModel.modelGenerator", "utils.common", "core.ajax"],
            exports: "repositorySearch"
        },

        //TODO: should go away after moving to AMD
        "repository.search.actions":{
            deps: ["repository.search.main","repository.search.components", "prototype", "actionModel.modelGenerator", "utils.common", "core.ajax"],
            exports: "repositorySearch"
        },

        "repository.search.main":{
            deps:["prototype", "actionModel.modelGenerator", "utils.common"],
            exports: "repositorySearch"
        },

        "utils.dateFormatter": {
            exports: "window"
        },

        "datepicker.i18n.en": {
            deps: ["jquery.ui"],
            exports: "jQuery"
        },

        "datepicker.i18n.de": {
            deps: ["jquery.ui"],
            exports: "jQuery"
        },

        "datepicker.i18n.es": {
            deps: ["jquery.ui"],
            exports: "jQuery"
        },

        "datepicker.i18n.fr": {
            deps: ["jquery.ui"],
            exports: "jQuery"
        },

        "datepicker.i18n.it": {
            deps: ["jquery.ui"],
            exports: "jQuery"
        },

        "datepicker.i18n.ja": {
            deps: ["jquery.ui"],
            exports: "jQuery"
        },

        "datepicker.i18n.ro": {
            deps: ["jquery.ui"],
            exports: "jQuery"
        },

        "datepicker.i18n.zh-CN": {
            deps: ["jquery.ui"],
            exports: "jQuery"
        },

        "datepicker.i18n.zh-TW": {
            deps: ["jquery.ui"],
            exports: "jQuery"
        },

        "report.global": {
            exports: "jasperreports"
        },

        "report.view": {
            //deps: ["report.view.base", "report.view.toolbar"],
            deps: ["report.view.base"],
            exports: "Report"
        },

        "controls.report": {
            deps: ["controls.controller", "report.view.base"],
            exports: "Controls"
        },

        "jquery.ui.mouse.touch": {
            deps: ["jquery", "jquery.ui"],
            exports: "jQuery"
        },

        "resource.base": {
            deps: ["prototype", "utils.common", "core.layout"],
            exports: "resource"
        },

        "resource.locate": {
            deps: ["resource.base", "jquery", "components.pickers"],
            exports: "resourceLocator"
        },

        "resource.dataSource": {
            deps: ["jquery", "underscore", "backbone", "core.ajax", "components.dialogs", "utils.common", "resource.locate"],
            exports: "window.ResourceDataSource"
        },

        "resource.dataSource.jdbc": {
            deps: ["resource.dataSource", "mustache", "components.dialog", "core.events.bis", "xregexp"],
            exports: "window.JdbcDataSourceEditor"
        },

        "resource.dataSource.jndi": {
            deps: ["resource.dataSource", "mustache", "components.dialog", "core.events.bis", "xregexp"],
            exports: "window.JndiResourceDataSource"
        },

        "resource.dataSource.bean": {
            deps: ["resource.dataSource", "mustache", "components.dialog", "core.events.bis", "xregexp"],
            exports: "window.BeanResourceDataSource"
        },

        "resource.dataSource.aws": {
            deps: ["resource.dataSource.jdbc"],
            exports: "window.AwsResourceDataSource"
        },

        "resource.dataSource.virtual": {
            deps: ["resource.dataSource", "mustache", "components.dialog", "core.events.bis", "xregexp",  "components.dependent.dialog"],
            exports: "window.VirtualResourceDataSource"
        },

        "resource.dataType": {
            deps:["resource.base", "prototype", "utils.common"],
            exports: "resourceDataType"
        },

        "resource.dataType.locate": {
            deps:["resource.locate"],
            exports: "resourceDataTypeLocate"
        },

        "resource.listOfValues.locate": {
            deps: ["resource.locate"],
            exports: "resourceListOfValuesLocate"
        },

        "resource.listofvalues": {
            deps: ["resource.base", "utils.common"],
            exports: "resourceListOfValues"
        },

        "resource.inputControl": {
            deps:["resource.base", "prototype", "utils.common"],
            exports: "addInputControl"
        },

        "resource.add.files": {
            deps:["resource.locate", "prototype", "utils.common", "core.events.bis"],
            exports: "addFileResource"
        },

        "resource.add.mondrianxmla": {
            deps:["resource.base", "components.pickers", "prototype", "utils.common"],
            exports: "resourceMondrianXmla"
        },

        "resource.query": {
            deps:["resource.base", "prototype", "utils.common"],
            exports:"resourceQuery"
        },

        "resource.report": {
            deps: ["resource.locate", "prototype", "jquery", "utils.common"],
            exports: "resourceReport"
        },

        "resource.reportResourceNaming": {
            deps: ["resource.base", "components.pickers", "prototype", "utils.common"],
            exports: "resourceReportResourceNaming"
        },

        "resource.inputControl.locate": {
            deps: ["resource.locate", "core.events.bis", "prototype"],
            exports: "inputControl"
        },

        "resource.query.locate": {
            deps: ["resource.locate", "prototype"],
            exports: "resourceQueryLocate"
        },

        "resource.analysisView": {
            deps: ["resource.base", "utils.common", "prototype"],
            exports: "resourceAnalysisView"
        },

        "resource.analysisConnection.mondrian.locate": {
            deps: ["resource.locate", "prototype"],
            exports: "resourceMondrianLocate"
        },

        "resource.analysisConnection.xmla.locate": {
            deps: ["resource.locate", "prototype"],
            exports: "resourceOLAPLocate"
        },

        "resource.analysisConnection": {
            deps: ["resource.base", "prototype", "components.pickers", "utils.common"],
            exports: "resourceAnalysisConnection"
        },

        "resource.analysisConnection.dataSource.locate": {
            deps: ["resource.locate"],
            exports: "resourceDataSourceLocate"
        },

        "addinputcontrol.queryextra": {
            deps: ["prototype", "utils.common", "core.events.bis", "core.layout"],
            exports: "addListOfValues"
        },

        "org.rootObjectModifier": {
            deps: [],
            exports: "rom_init"
        },

        "report.schedule": {
            deps: ["prototype"],
            exports: "Schedule"
        },
        "report.schedule.list": {
            deps: ["prototype"],
            exports: "ScheduleList"
        },
        "report.schedule.setup": {
            deps: ["prototype"],
            exports: "ScheduleSetup"
        },
        "report.schedule.output": {
            deps: ["prototype"],
            exports: "ScheduleOutput"
        },
        "report.schedule.params": {
            deps: ["prototype", "controls.controller", "json3"],
            exports: "ScheduleParams"
        }
    }, // define non

    //Wait before giving up on loading a script.
    waitSeconds:60
});