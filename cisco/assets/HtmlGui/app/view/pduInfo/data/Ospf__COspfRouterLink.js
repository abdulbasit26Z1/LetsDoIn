//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ospf__COspfRouterLink",{extend:"Ext.Base",statics:{data:{title:"OSPF Router Link",units:"Bits",unit_marks:[16,24],width:32,fields:[{value:"LINK ID: {link_id}",size:16},{value:"LINK DATA: {link_data}",size:8},{value:"TYPE:{type}",size:8},{value:"METRIC:{metric}",size:32},],osi_pdu:"OSPF Router link",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});