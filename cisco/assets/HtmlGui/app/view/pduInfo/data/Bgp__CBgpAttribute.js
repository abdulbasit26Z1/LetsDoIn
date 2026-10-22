//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Bgp__CBgpAttribute",{extend:"Ext.Base",statics:{data:{title:"BGP Attribute",units:"Bits",unit_marks:[8],width:16,fields:[{value:"Flag:{flag}",size:8},{value:"Type:{type}",size:8},],osi_pdu:"BGP Attribute",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});