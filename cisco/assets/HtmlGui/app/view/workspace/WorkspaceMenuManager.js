//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.workspace.WorkspaceMenuManager",{extend:"Ext.Base",requires:[],m_menuStack:[],addMenu:function(b,a){if(b&&(-1==this.indexOfMenu(b))){this.m_menuStack.push({menuObj:b,props:null})}},checkForMenu:function(a){for(var b=0;b<this.m_menuStack.length;++b){if(this.m_menuStack.menuObj==a){return true}}return false},pop:function(){var a=this.m_menuStack.pop();if(a){a.menuObj.destroy()}},clearStack:function(){this.m_menuStack=[];this.m_storedMenu=null},indexOfMenu:function(a){for(var b=0;b<this.m_menuStack.length;++b){if(this.m_menuStack[b].menuObj==a){return b}}return -1},destroyMenu:function(b){var a=this.indexOfMenu(b);if(b&&(-1!=a)){if((this.m_menuStack.length-1)==a){this.pop()}else{this.m_menuStack[a].destroyMenu.destroy();this.m_menuStack.splice(a)}}},destroyMenus:function(){for(var a=0;a<this.m_menuStack.length;++a){this.m_menuStack[a].menuObj.destroy()}this.m_menuStack=[]}});