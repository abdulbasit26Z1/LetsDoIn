//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.configDialogs.applets.BackboneApplet_UI",{extend:"Ext.Container",requires:["Ext.form.FieldSet","Ext.field.Radio","Ext.field.Text","Ext.Label"],config:{items:[{xtype:"fieldset",layout:"hbox",items:[{xtype:"radiofield",flex:50,id:"dhcp",label:"DHCP",labelAlign:"right",name:"dhcp"},{xtype:"radiofield",flex:50,id:"static",label:"Static",labelAlign:"right",name:"dhcp"}]},{xtype:"container",id:"IPv4AppletContainer",layout:"vbox",items:[{xtype:"textfield",id:"ipAddress",label:"IP Address"},{xtype:"textfield",id:"subnetMask",label:"Subnet Mask"},{xtype:"textfield",id:"defaultGateway",label:"Default Gateway"},{xtype:"textfield",id:"dnsServer",label:"DNS Server"},{xtype:"label",id:"status"}]}]}});