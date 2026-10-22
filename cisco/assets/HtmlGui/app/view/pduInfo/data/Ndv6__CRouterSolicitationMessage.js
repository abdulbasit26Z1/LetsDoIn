//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ndv6__CRouterSolicitationMessage",{extend:"Ext.Base",statics:{data:{title:"Router Solicitation Message",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"TYPE: {option_type:hex}",size:8},{value:"CODE: {code:hex}",size:8},{value:"CHECKSUM:{checksum:hex}",size:16},{value:"RESERVED",size:32},{value:"OPTION",size:32},],osi_pdu:"Router Solicitation Message",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});