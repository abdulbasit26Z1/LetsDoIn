//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.fileHandling.GetFilesWait_UI",{extend:"Ext.Panel",config:{centered:true,id:"GetFilesWait",styleHtmlContent:true,width:"35%",height:"40%",cls:"appletText",ui:"dark",layout:{type:"vbox"},modal:true,items:[{xtype:"titlebar",docked:"top",title:"Wait"},{xtype:"component",id:"messageID",itemId:"messageID",centered:true,html:"Accessing, please wait."},{xtype:"spacer",minHeight:"10%"},{xtype:"image",centered:false,height:40,id:"waitImgID",src:"resources/images/running_40.gif"},{xtype:"toolbar",docked:"bottom",id:"buttonContainer",itemId:"buttonContainer",layout:"hbox",items:[{xtype:"spacer"},{xtype:"button",flex:100,hidden:false,id:"btnCancelGetFiles",text:"Cancel"}]}]}});