//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ndv6__CPrefixOption",{extend:"Ext.Base",statics:{data:{title:"PREFIX OPTION",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"TYPE: {option_type:hex}",size:8},{value:"LENGTH: {option_length:hex}",size:8},{value:"PREFIX LEN:{prefix_length}",size:8},{value:"L",size:1},{value:"A",size:1},{value:"RESERVED1",size:6},{value:"VALID LIFETIME:{valid_lifetime}",size:32},{value:"PREFERED LIFETIME:{preffered_lifetime}",size:32},{value:"RESERVED2",size:32},{value:"PREFIX:{prefix_ipv6}",size:128},],osi_pdu:"Prefix Option",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});