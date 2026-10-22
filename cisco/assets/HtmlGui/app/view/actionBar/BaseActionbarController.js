//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.actionBar.BaseActionbarController",{extend:"Ext.Base",config:{},m_actionBar:null,setupControlSet:function(a,b){var c=this;a.forEach(function(f){var d=b.getObject(f.id);if(d){d.setHandler(f.h);d.setScope(this)}else{AppLogger.warn("Error, control not found: "+f.id)}},this)},hideAll:function(){var a=this.getItems().items;for(var b=0;b<a.length;++b){a[b].setHidden(true)}},getObject:function(a){return this.query("#"+a)[0]},get_cmp:function(a){return this.getActionBar().query("#"+a)[0]},getActionBar:function(){var a=getActionBar();if(!a){a=this.m_actionBar}return a}});