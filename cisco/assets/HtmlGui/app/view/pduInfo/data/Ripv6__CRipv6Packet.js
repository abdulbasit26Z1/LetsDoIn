//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ripv6__CRipv6Packet",{extend:"Ext.Base",statics:{data:{title:"Ripv6 Packet Header",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"Command: {command:hex}",size:8},{value:"Version: {version:hex}",size:8},{value:"0",size:16},],osi_pdu:"Ripv6 Packet Header",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});