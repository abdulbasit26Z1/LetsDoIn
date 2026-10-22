//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.workspace.LicensePage",{extend:"Ext.Panel",alias:["widget.licensepage"],config:{id:"LicensePage",itemId:"LicensePage",width:"60%",height:"80%",scrollable:true,modal:true,centered:true,items:[{xtype:"titlebar",docked:"top",id:"licenseTitleBar",itemId:"licenseTitleBar",title:"License"},{xtype:"button",height:50,id:"license_close",itemId:"license_close",text:"Close",docked:"bottom"}]},load:function(c,a){Ext.Ajax.request({url:a,success:function(d){Ext.getCmp("LicensePage").setHtml(d.responseText)},failure:function(d){var e=d.responseText;showAlertUtil("Error",e,Ext.emptyFn)}});var b=this;b.down("titlebar").setTitle(c);this.get_cmp("license_close").element.on("singletap",function(){b.onClose()},this)},onClose:function(){this.destroy()},get_cmp:function(a){return this.query("#"+a)[0]}});