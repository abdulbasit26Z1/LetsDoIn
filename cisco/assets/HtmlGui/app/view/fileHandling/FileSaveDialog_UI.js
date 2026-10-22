//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.fileHandling.FileSaveDialog_UI",{extend:"Ext.Panel",requires:["Ext.Label","Ext.TitleBar","Ext.field.Text","Ext.Spacer","Ext.Button"],config:{centered:false,height:"40%",left:0,minWidth:350,styleHtmlContent:true,top:0,ui:"dark",width:"100%",layout:"vbox",modal:true,items:[{xtype:"label",centered:false,hidden:true,html:"Invalid file name!",id:"lblFileNameError",style:"color:red; text-align:center"},{xtype:"titlebar",docked:"top",title:"Save File"},{xtype:"textfield",id:"fldFileName",style:"border:3; border-color:#eef; border-style:solid;",label:"File Name:"},{xtype:"spacer",minHeight:15},{xtype:"container",margin:10,layout:"hbox",items:[{xtype:"spacer"},{xtype:"button",id:"btnSave",ui:"action",text:"Save"},{xtype:"spacer",maxWidth:10},{xtype:"button",id:"btnCancel",ui:"action",text:"Cancel"}]}]}});