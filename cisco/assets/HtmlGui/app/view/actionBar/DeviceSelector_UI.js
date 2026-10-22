//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.actionBar.DeviceSelector_UI",{extend:"Ext.Panel",alias:["widget.deviceSelector"],requires:["Ext.XTemplate"],config:{centered:false,hidden:false,id:"actionbar_deviceSelector",itemId:"actionbar_deviceSelector",left:0,cls:"appletText",layout:{type:"fit"},top:0,width:"40%",height:"50%",hideOnMaskTap:true,modal:true,items:[{xtype:"list",id:"deviceSelectorListID",itemId:"deviceSelectorListID",itemTpl:"{name}",name:"deviceName",fullName:"fullName",height:"100%"}],m_ignoreNextHide:true,listeners:{hide:function(b,a){if(this.ignoreNextHide){this.m_ignoreNextHide=false}else{this.destroy(true)}}}}});