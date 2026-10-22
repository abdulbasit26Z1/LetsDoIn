//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Bgp__CBgpOpen",{extend:"Ext.Base",statics:{data:{title:"BGP Open",units:"Bits",unit_marks:[8,24],width:32,fields:[{value:"Version:{version}",size:8},{value:"AS:{as}",size:16},{value:"HT:{hold_time}",size:16},{value:"ID:{speaker_id}",size:32},{value:"Length",size:8},{value:"Optional Parameter(Variable):{opt_param_length}",size:16},],osi_pdu:"BGP Open",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});