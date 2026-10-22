//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Gre__CGreHeader",{extend:"Ext.Base",statics:{data:{title:"GRE",units:"Bits",unit_marks:[16],width:32,fields:[{value:"FLAGS:{flag}",size:16},{value:"PROTOCOL TYPE:{proposal_type}",size:16},],osi_pdu:"GRE",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});