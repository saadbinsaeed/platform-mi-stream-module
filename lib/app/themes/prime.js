"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = require("styled-components");

var _polished = require("polished");

const primeTheme = (0, _styledComponents.css)([".ui-widget{font-family:Roboto,Arial,sans-serif;font-size:0.9em;}.ui-widget input,.ui-widget select,.ui-widget textarea,.ui-widget button{font-family:Roboto,Arial,sans-serif;font-size:1em;}.ui-widget:active{outline:none;}.ui-widget-content{border:1px solid ", ";background:", ";color:", ";}.ui-widget-content a{color:", ";}.ui-widget-header{border:1px solid ", ";background:", ";color:", ";font-weight:bold;}.ui-widget-header a{color:", ";}.ui-widget-overlay{background:#666666;opacity:.50;filter:Alpha(Opacity=50);}.ui-state-default{border:1px solid ", ";background:", ";color:", ";}.ui-state-default a{color:", ";}.ui-state-active{border-color:", ";background:", ";color:", ";}.ui-state-active a{color:", ";}.ui-state-highlight{border-color:", ";background:", ";color:", ";}.ui-state-highlight a{color:", ";}.ui-state-focus{border-color:", ";background:", ";color:", ";}.ui-state-focus a{color:", ";}.ui-state-error{border-color:", ";background:", ";color:", ";}.ui-state-error a{color:", ";}.ui-state-disabled,.ui-widget:disabled{opacity:0.35;filter:Alpha(Opacity=35);background-image:none;cursor:default !important;}.ui-state-disabled *,.ui-widget:disabled *{cursor:default !important;}.ui-inputtext{border-color:", ";background:", ";color:", ";min-height:", ";}.ui-inputtext:hover{background:", ";color:", ";border-color:", ";}.ui-inputtext.ui-state-focus,.ui-inputtext:focus{outline:0 none;background:", ";border-color:", ";color:", ";}.ui-inputgroup .ui-inputgroup-addon{border-color:", ";background-color:", ";color:", ";}.ui-float-label input.ng-dirty.ng-invalid ~ label{color:", ";}.ui-autocomplete .ui-autocomplete-multiple-container:not(.ui-state-disabled):hover{border-color:", ";}.ui-autocomplete .ui-autocomplete-multiple-container:not(.ui-state-disabled).ui-state-focus{border-color:", ";}.ui-autocomplete-panel .ui-autocomplete-list-item:hover{border-color:", ";background:", ";color:", ";}.ui-autocomplete-panel .ui-autocomplete-list-item:hover a{color:", ";}.ui-chips > ul:not(.ui-state-disabled):hover{border-color:", ";}.ui-chips > ul:not(.ui-state-disabled).ui-state-focus{border-color:", ";}.ui-button:focus,.ui-button:enabled:hover,.ui-fileupload-choose:not(.ui-state-disabled):hover{outline:0 none;border-color:", ";background:", ";color:", ";}.ui-button:focus a,.ui-button:enabled:hover a,.ui-fileupload-choose:not(.ui-state-disabled):hover a{color:", ";}.ui-button:enabled:active,.ui-fileupload-choose:not(.ui-state-disabled):active{border-color:", ";background:", ";color:", ";}.ui-chkbox-box:not(.ui-state-disabled):not(.ui-state-active):hover{border-color:", ";background:", ";color:", ";}.ui-chkbox-box:not(.ui-state-disabled):not(.ui-state-active):hover a{color:", ";}.ui-radiobutton-box:not(.ui-state-disabled):not(.ui-state-active):hover{border-color:", ";background:", ";color:", ";}.ui-radiobutton-box:not(.ui-state-disabled):not(.ui-state-active):hover a{color:", ";}.ui-dropdown:not(.ui-state-disabled):hover{border-color:", ";background:", ";color:", ";}.ui-dropdown:not(.ui-state-disabled):hover a{color:", ";}.ui-dropdown-panel .ui-dropdown-item:not(.ui-state-highlight):hover{border-color:", ";background:", ";color:", ";}.ui-dropdown-panel .ui-dropdown-item:not(.ui-state-highlight):hover a{color:", ";}.ui-listbox .ui-listbox-header .ui-listbox-filter-container .fa{color:", ";}.ui-listbox:not(.ui-state-disabled) .ui-listbox-item:not(.ui-state-highlight):hover{border-color:", ";background:", ";color:", ";}.ui-listbox:not(.ui-state-disabled) .ui-listbox-item:not(.ui-state-highlight):hover a{color:", ";}.ui-listbox.ui-state-disabled .ui-chkbox-box:not(.ui-state-active):hover{border-color:", ";background:", ";color:", ";}.ui-multiselect:not(.ui-state-disabled):hover{border-color:", ";background:", ";color:", ";}.ui-multiselect:not(.ui-state-disabled):hover a{color:", ";}.ui-multiselect-panel .ui-multiselect-item{padding:0.3rem .6rem;}.ui-multiselect-panel .ui-multiselect-item:not(.ui-state-highlight):hover{border-color:", ";background:", ";color:", ";}.ui-multiselect-panel .ui-multiselect-item:not(.ui-state-highlight):hover a{color:", ";}.ui-multiselect-panel .ui-multiselect-close{color:", ";}.ui-multiselect-header .ui-multiselect-filter-container{width:calc(100% - 40px);}.ui-multiselect-panel .ui-multiselect-filter-container .fa{color:", ";}.ui-spinner:not(.ui-state-disabled) .ui-spinner-button:enabled:hover{border-color:", ";background:", ";color:", ";}.ui-spinner:not(.ui-state-disabled) .ui-spinner-button:enabled:hover a{color:", ";}.ui-spinner:not(.ui-state-disabled) .ui-spinner-button:enabled:active{border-color:", ";background:", ";color:", ";}.ui-selectbutton .ui-button:not(.ui-state-disabled):not(.ui-state-active):hover{border-color:", ";background:", ";color:", ";}.ui-selectbutton .ui-button:not(.ui-state-disabled):not(.ui-state-active):hover a{color:", ";}.ui-togglebutton:not(.ui-state-disabled):not(.ui-state-active):hover{border-color:", ";background:", ";color:", ";}.ui-togglebutton:not(.ui-state-disabled):not(.ui-state-active):hover a{color:", ";}.ui-paginator a:not(.ui-state-disabled):not(.ui-state-active):hover{border-color:", ";background:", ";color:", ";}.ui-paginator a:not(.ui-state-disabled):not(.ui-state-active):hover a{color:", ";}.ui-paginator a{color:", ";}.ui-datatable .ui-rowgroup-header a{color:", ";}.ui-datatable .ui-multiselect-panel .ui-multiselect-filter-container .fa{left:.140em;top:.45em;}.ui-datatable .ui-multiselect-header .ui-multiselect-close{right:.600em;top:.400em;}.ui-datatable .ui-datatable-thead .ui-state-default:not(input){background:", ";}.ui-datatable th,.ui-datatable td,.ui-datatable tr{border-color:", " !important;}.ui-datatable input{min-height:25px !important;}.ui-datatable .ui-sortable-column:not(.ui-state-active):hover{background:", " !important;color:", ";}.ui-datatable .ui-row-toggler{color:", ";}.ui-datatable tbody.ui-datatable-hoverable-rows > tr.ui-widget-content:not(.ui-state-highlight):hover{cursor:pointer;background:", ";color:", ";}.ui-orderlist .ui-orderlist-item:not(.ui-state-highlight):hover{border-color:", ";background:", ";color:", ";}.ui-orderlist .ui-orderlist-item:not(.ui-state-highlight):hover a{color:", ";}.ui-picklist .ui-picklist-item:not(.ui-state-highlight):hover{border-color:", ";background:", ";color:", ";}.ui-picklist .ui-picklist-item:not(.ui-state-highlight):hover a{color:", ";}.ui-picklist .ui-picklist-droppoint-highlight{border-color:", ";background:", ";color:", ";}.ui-picklist .ui-picklist-droppoint-highlight a{color:", ";}.ui-picklist .ui-picklist-highlight{border-color:", ";color:", ";}.ui-picklist .ui-picklist-highlight a{color:", ";}.ui-tree.ui-treenode-dragover{border-color:", ";}.ui-tree .ui-treenode-content.ui-treenode-selectable .ui-treenode-label:not(.ui-state-highlight):hover{border-color:", ";background:", ";color:", ";}.ui-tree .ui-treenode-content.ui-treenode-selectable .ui-treenode-label:not(.ui-state-highlight):hover a{color:", ";}.ui-tree .ui-treenode-content.ui-treenode-dragover{background:", ";color:", ";}.ui-tree.ui-tree-horizontal .ui-treenode-content.ui-treenode-selectable .ui-treenode-label:not(.ui-state-highlight):hover{background-color:inherit;color:inherit;}.ui-tree.ui-tree-horizontal .ui-treenode-content.ui-treenode-selectable:not(.ui-state-highlight):hover{border-color:", ";background:", ";color:", ";}.ui-tree.ui-tree-horizontal .ui-treenode-content.ui-treenode-selectable:not(.ui-state-highlight):hover a{color:", ";}.ui-treetable .ui-treetable-row.ui-treetable-row-selectable:not(.ui-state-highlight):hover{background:", ";color:", ";}.ui-organizationchart .ui-organizationchart-node-content.ui-organizationchart-selectable-node:not(.ui-state-highlight):hover{border-color:", ";background:", ";color:", ";}.ui-organizationchart .ui-organizationchart-node-content.ui-organizationchart-selectable-node:not(.ui-state-highlight):hover a{color:#ffffff;}.ui-accordion .ui-accordion-header:not(.ui-state-active):not(.ui-state-disabled):hover{border-color:", ";background:", ";color:", ";}.ui-accordion .ui-accordion-header:not(.ui-state-active):not(.ui-state-disabled):hover a{color:#ffffff;}.ui-fieldset.ui-fieldset-toggleable .ui-fieldset-legend:hover{border-color:", ";background:", ";color:", ";}.ui-fieldset.ui-fieldset-toggleable .ui-fieldset-legend:hover a{color:#ffffff;}.ui-panel .ui-panel-titlebar .ui-panel-titlebar-icon:hover{border-color:", ";background:", ";color:", ";}.ui-panel .ui-panel-titlebar .ui-panel-titlebar-icon:hover a{color:#ffffff;}.ui-tabview .ui-tabview-nav li:not(.ui-state-active):not(.ui-state-disabled):hover{border-color:", ";background:", ";color:", ";}.ui-tabview .ui-tabview-nav li:not(.ui-state-active):not(.ui-state-disabled):hover a{color:#ffffff;}.ui-dialog .ui-dialog-titlebar-icon{color:#eeeeee;}.ui-dialog .ui-dialog-titlebar-icon:hover{border-color:", ";background:", ";color:", ";}.ui-dialog .ui-dialog-titlebar-icon:hover a{color:#ffffff;}.ui-sidebar .ui-sidebar-close{color:#eeeeee;}.ui-sidebar .ui-sidebar-close:hover{border-color:", ";background:", ";color:", ";}.ui-sidebar .ui-sidebar-close:hover a{color:#ffffff;}.ui-overlaypanel .ui-overlaypanel-close:hover{border-color:", ";background:", ";color:", ";}.ui-overlaypanel .ui-overlaypanel-close:hover a{color:#ffffff;}.ui-inplace .ui-inplace-display:hover{border-color:", ";background:", ";color:", ";}.ui-inplace .ui-inplace-display:hover a{color:", ";}.ui-breadcrumb a{color:", ";}.ui-menu .ui-menuitem .ui-menuitem-link{color:#eeeeee;}.ui-menu .ui-menuitem .ui-menuitem-link:hover{border-color:", ";background:", ";color:", ";border-color:transparent;}.ui-menu .ui-menuitem .ui-menuitem-link:hover a{color:#ffffff;}.ui-menu .ui-menuitem.ui-menuitem-active > .ui-menuitem-link{border-color:", ";background:", ";color:", ";border-color:transparent;}.ui-menu .ui-menuitem.ui-menuitem-active > .ui-menuitem-link a{color:#ffffff;}.ui-tabmenu .ui-tabmenu-nav li:not(.ui-state-active):hover{border-color:", ";background:", ";color:", ";}.ui-tabmenu .ui-tabmenu-nav li:not(.ui-state-active):hover a{color:#ffffff;}.ui-steps .ui-steps-item:not(.ui-state-highlight):not(.ui-state-disabled):hover{border-color:", ";background:", ";color:", ";}.ui-steps .ui-steps-item:not(.ui-state-highlight):not(.ui-state-disabled):hover a{color:#ffffff;}.ui-panelmenu .ui-panelmenu-header:not(.ui-state-active):hover{border-color:", ";background:", ";color:", ";border-color:#2e2e2e;}.ui-panelmenu .ui-panelmenu-header:not(.ui-state-active):hover a{color:#ffffff;}.ui-panelmenu .ui-panelmenu-header:not(.ui-state-active):hover a{color:#ffffff;}.ui-panelmenu .ui-panelmenu-header.ui-state-active a{color:#ffffff;}.ui-panelmenu .ui-panelmenu-content .ui-menuitem-link{color:#eeeeee;}.ui-panelmenu .ui-panelmenu-content .ui-menuitem-link:hover{border-color:", ";background:", ";color:", ";border-color:transparent;}.ui-panelmenu .ui-panelmenu-content .ui-menuitem-link:hover a{color:#ffffff;}.ui-datepicker .ui-datepicker-header a{color:#eeeeee;}.ui-datepicker .ui-datepicker-header a:hover{border-color:", ";background:", ";color:", ";}.ui-datepicker .ui-datepicker-header a:hover a{color:#ffffff;}.ui-datepicker .ui-datepicker-calendar td:not(.ui-state-disabled) a:hover{border-color:", ";background:", ";color:", ";}.ui-datepicker .ui-datepicker-calendar td:not(.ui-state-disabled) a:hover a{color:#ffffff;}.fc .fc-toolbar .fc-prev-button .ui-icon-circle-triangle-w{margin-top:.3em;background:none !important;display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-indent:0px !important;text-align:center;}.fc .fc-toolbar .fc-prev-button .ui-icon-circle-triangle-w:before{content:\"\uF053\";}.fc .fc-toolbar .fc-next-button .ui-icon-circle-triangle-e{margin-top:.3em;background:none !important;display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-indent:0 !important;text-align:center;}.fc .fc-toolbar .fc-next-button .ui-icon-circle-triangle-e:before{content:\"\uF054\";}.ui-rating a{color:#222222;}.ui-organizationchart .ui-organizationchart-line-down{background-color:#4d4d4d;}.ui-organizationchart .ui-organizationchart-line-left{border-right:1px solid ", ";}.ui-organizationchart .ui-organizationchart-line-top{border-top:1px solid ", ";}.ui-organizationchart .ui-organizationchart-node-content{border-color:", ";}.ui-organizationchart .ui-organizationchart-node-content .ui-node-toggler{color:", ";}.ui-inputtext.ui-state-error{border-bottom-color:", ";}.ui-corner-tl{border-top-left-radius:3px;}.ui-corner-tr{border-top-right-radius:3px;}.ui-corner-bl{border-bottom-left-radius:3px;}.ui-corner-br{border-bottom-right-radius:3px;}.ui-corner-top{border-top-left-radius:3px;border-top-right-radius:3px;}.ui-corner-bottom{border-bottom-left-radius:3px;border-bottom-right-radius:3px;}.ui-corner-right{border-top-right-radius:3px;border-bottom-right-radius:3px;}.ui-multiselect .ui-multiselect-trigger.ui-corner-right,.ui-dropdown .ui-dropdown-trigger.ui-corner-right{height:100%;width:2em;vertical-align:top;}.ui-corner-left{border-top-left-radius:3px;border-bottom-left-radius:3px;}.ui-corner-all{border-radius:3px;}"], ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.widget.background, ({
  theme
}) => theme.widget.textColor, ({
  theme
}) => theme.widget.linkColor, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.widget.backgroundAlt, ({
  theme
}) => theme.widget.header.textColor, ({
  theme
}) => theme.widget.header.textColor, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.base.background, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.base.linkColor, ({
  theme
}) => theme.base.active.borderColor, ({
  theme
}) => theme.base.active.background, ({
  theme
}) => theme.base.active.textColor, ({
  theme
}) => theme.base.active.linkColor, ({
  theme
}) => theme.base.highlight.borderColor, ({
  theme
}) => theme.base.highlight.background, ({
  theme
}) => theme.base.highlight.textColor, ({
  theme
}) => theme.base.highlight.linkColor, ({
  theme
}) => theme.base.focus.borderColor, ({
  theme
}) => theme.base.focus.background, ({
  theme
}) => theme.base.focus.textColor, ({
  theme
}) => theme.base.focus.linkColor, ({
  theme
}) => theme.base.error.borderColor, ({
  theme
}) => theme.base.error.background, ({
  theme
}) => theme.base.error.textColor, ({
  theme
}) => theme.base.error.linkColor, ({
  theme
}) => theme.input.borderColor, ({
  theme
}) => theme.input.background, ({
  theme
}) => theme.input.textColor, ({
  theme
}) => theme.input.height, ({
  theme
}) => theme.input.hover.background, ({
  theme
}) => theme.input.hover.textColor, ({
  theme
}) => (0, _polished.lighten)(0.1, theme.input.hover.background), ({
  theme
}) => theme.input.focus.background, ({
  theme
}) => theme.input.focus.borderColor, ({
  theme
}) => theme.input.focus.textColor, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.base.backgroundColor, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.base.active.borderColor, ({
  theme
}) => theme.base.active.background, ({
  theme
}) => theme.base.active.textColor, ({
  theme
}) => theme.base.active.linkColor, ({
  theme
}) => theme.base.highlight.borderColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.focus.borderColor, ({
  theme
}) => theme.base.active.borderColor, ({
  theme
}) => theme.base.active.background, ({
  theme
}) => theme.base.active.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.linkColor, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.base.background, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.base.linkColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.linkColor, ({
  theme
}) => theme.base.disabled.borderColor, ({
  theme
}) => theme.base.disabled.background, ({
  theme
}) => theme.base.disabled.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.linkColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.linkColor, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.linkColor, ({
  theme
}) => theme.base.active.borderColor, ({
  theme
}) => theme.base.active.background, ({
  theme
}) => theme.base.active.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.linkColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.linkColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.linkColor, ({
  theme
}) => theme.base.hover.linkColor, ({
  theme
}) => theme.base.hover.linkColor, ({
  theme
}) => theme.widget.header.backgroundAlt, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.base.focus.background, ({
  theme
}) => theme.base.focus.textColor, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.widget.hover.background, ({
  theme
}) => theme.widget.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.linkColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.linkColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.linkColor, ({
  theme
}) => theme.base.highlight.borderColor, ({
  theme
}) => theme.base.highlight.linkColor, ({
  theme
}) => theme.base.highlight.linkColor, ({
  theme
}) => theme.base.active.borderColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.linkColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.linkColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.linkColor, ({
  theme
}) => theme.base.linkColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.active.borderColor, ({
  theme
}) => theme.base.active.background, ({
  theme
}) => theme.base.active.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.hover.borderColor, ({
  theme
}) => theme.base.hover.background, ({
  theme
}) => theme.base.hover.textColor, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.base.borderColor, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.base.textColor, ({
  theme
}) => theme.base.borderColor);
var _default = primeTheme;
exports.default = _default;