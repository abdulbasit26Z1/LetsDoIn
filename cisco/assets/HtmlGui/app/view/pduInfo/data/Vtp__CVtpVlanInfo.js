//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Vtp__CVtpVlanInfo",{extend:"Ext.Base",statics:{data:{title:"VTP VLAN Information",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"VLAN INFO LEN:{version}",size:8},{value:"STATUS:{status}",size:8},{value:"VLAN TYPE: {vlan_type}",size:8},{value:"VLAN NAME LEN: {vlan_name_size}",size:8},{value:"VLAN ID: {vlan_id}",size:16},{value:"MTU SIZE REVISION NUMBER:{mtu_size}",size:16},{value:"802.10 INDEX ID",size:32},{value:"VLAN NAME:{vlan_name}",size:128},],osi_pdu:"VTP VLAN Information",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});