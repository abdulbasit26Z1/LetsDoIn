//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.ButtonPanel",{extend:"Ext.Panel",alias:["widget.buttonPanel"],config:{border:2,hidden:true,id:"id-buttons-bar",margin:5,padding:5,style:"border-color: blue; border-style: solid;",layout:{type:"vbox"},defaults:{margin:5},items:[{xtype:"button",itemId:"btnIpcQuit",text:"IpcQuit"},{xtype:"button",itemId:"mybutton1",text:"IpcAddRouter"},{xtype:"button",text:"MyButton"},{xtype:"button",text:"MyButton1"},{xtype:"button",text:"MyButton2"},{xtype:"button",text:"MyButton3"},{xtype:"button",text:"MyButton6"}],listeners:[{fn:"onMybuttonTap",event:"tap",delegate:"#btnIpcQuit"},{fn:"onMybutton1Tap",event:"tap",delegate:"#mybutton1"}]},onMybuttonTap:function(b,c,a){HtmlGui.appInstance.exit()},onMybutton1Tap:function(b,c,a){ipc.appWindow().getActiveWorkspace().getLogicalWorkspace().addDevice("0","1841")}});