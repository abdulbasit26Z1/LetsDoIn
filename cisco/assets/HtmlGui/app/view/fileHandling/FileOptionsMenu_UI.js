//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.fileHandling.FileOptionsMenu_UI",{extend:"Ext.Panel",requires:["Ext.Button"],config:{centered:false,height:"",hidden:false,id:"fileOptions",left:0,top:0,modal:true,items:[{xtype:"button",id:"newNetwork",text:"New Network"},{xtype:"button",id:"loadNetwork",text:"Load Network"},{xtype:"button",id:"saveNetwork",text:"Save Network"},{xtype:"button",id:"saveAs",text:"Save As"},{xtype:"button",hidden:true,id:"onFBLogin",itemId:"onFBLogin",text:"Facebook Login"},{xtype:"button",hidden:true,id:"onFBLogout",itemId:"onFBLogout",text:"Facebook Logout"},{xtype:"button",id:"about",text:"About Packet Tracer"},{xtype:"button",id:"help",text:"Help"},{xtype:"button",id:"exit",text:"Exit"}]}});