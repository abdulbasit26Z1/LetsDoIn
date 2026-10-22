//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.configDialogs.applets.CellTowerIntfApplet_UI",{extend:"Ext.Container",requires:["Ext.form.FieldSet","Ext.field.Text"],config:{items:[{xtype:"fieldset",layout:"vbox",title:"IP Configuration",items:[{xtype:"textfield",disabled:true,id:"ipAddTextField",label:"IP Address",readOnly:true},{xtype:"textfield",disabled:true,id:"maskTextField",label:"Subnet Mask",readOnly:true}]},{xtype:"fieldset",layout:"vbox",title:"IPv6 Configuration",items:[{xtype:"container",layout:"hbox",items:[{xtype:"textfield",flex:85,disabled:true,id:"ipv6AddTextField",label:"IPv6 Address",labelWidth:"40%",readOnly:true},{xtype:"textfield",flex:15,disabled:true,id:"prefixTextField",label:"/",labelWidth:"10%",readOnly:true}]},{xtype:"textfield",disabled:true,id:"linkLocalTextField",label:"Link Local Address",labelWidth:"40%",readOnly:true}]}]}});