//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.workspace.WSInputModeEcho",{extend:"HtmlGui.view.workspace.WSInputModeAbstract",requires:["Ext.draw.sprite.Text"],eventInfo:null,echoEvent:function(b){var a="";a+=Ext.getClassName(this)+" event info: ";a+="\n\ttype: "+b.htmlgui.gesture.name;a+="\n\tpageX: "+b.pageX;a+="\n\tpageY: "+b.pageY;AppLogger.trace(a);return a},onTouchStart:function(a){this.eventInfo=Ext.create("Ext.draw.sprite.Text",{text:this.echoEvent(a),x:a.pageX,y:a.pageY,fill:"green",fontSize:12});this.getWorkspace().getSurface("main").add(this.eventInfo);this.getWorkspace().updateView();this.echoEvent(a)},onTouchEnd:function(a){if(this.eventInfo){this.getWorkspace().getSurface("main").remove(this.eventInfo,true)}this.echoEvent(a)},onTouchMove:function(a){this.echoEvent(a);if(this.eventInfo){this.eventInfo.setAttributes({text:this.echoEvent(a)});this.getWorkspace().updateView()}},onSingleTap:function(a){this.echoEvent(a)},onActivate:function(){return true},onDeactivate:function(){if(this.eventInfo){this.getWorkspace().remove(this.eventInfo,true)}}});