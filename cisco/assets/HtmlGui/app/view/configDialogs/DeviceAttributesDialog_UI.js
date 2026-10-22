//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.configDialogs.DeviceAttributesDialog_UI",{extend:"Ext.Panel",alias:["widget.deviceAttributesDialog_UI"],config:{centered:true,modal:true,id:"AttributesContainer",itemId:"AttributesContainer",hideOnMaskTap:true,listeners:{hide:function(b,a){this.destroy(true)}},items:[{width:450,height:300,xtype:"container",id:"AttributesPanel",itemId:"AttributesPanel",layout:"vbox",items:[{xtype:"titlebar",docked:"top",layout:"hbox",title:"Attributes"},{xtype:"titlebar",docked:"top",style:"background:grey",items:[{xtype:"button",id:"applyButton",itemId:"applyButton",text:"Apply",hidden:false,handler:function(){Ext.getCmp("AttributesContainer").updateEngineAttributes()}}]},{xtype:"container",itemId:"left",layout:"vbox",scrollable:true,height:"100%",id:"ValuesContainer"}]}]}});