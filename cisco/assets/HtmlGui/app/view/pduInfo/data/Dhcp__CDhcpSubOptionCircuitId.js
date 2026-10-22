//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dhcp__CDhcpSubOptionCircuitId",{extend:"Ext.Base",statics:{data:{title:"Circuit ID Suboption",units:"Bits",unit_marks:[4,8],width:32,fields:[{value:"OPT:{option_code:hex}",size:4},{value:"LEN:{option_length:hex}",size:4},{value:"TYPE:{circuit_id_type:hex}",size:4},{value:"LEN:{circuit_id_length:hex}",size:4},{value:"VLAN NUM:{vlan_field:hex}",size:8},{value:"MOD:{module_filed:hex}",size:4},{value:"PORT:{port_field:hex}",size:4},],osi_pdu:"Circuit ID Suboption",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});