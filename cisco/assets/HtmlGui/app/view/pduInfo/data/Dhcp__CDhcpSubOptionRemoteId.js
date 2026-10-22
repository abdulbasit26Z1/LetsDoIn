//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dhcp__CDhcpSubOptionRemoteId",{extend:"Ext.Base",statics:{data:{title:"Remote ID Suboption",units:"Bits",unit_marks:[4,8],width:32,fields:[{value:"OPT:{option_code:hex}",size:4},{value:"LEN:{option_length:hex}",size:4},{value:"TYPE:{remote_id_type:hex}",size:4},{value:"LEN:{remote_id_length:hex}",size:4},{value:"MAC ADDRESS:{mac_address:hex}",size:24},],osi_pdu:"Remote ID Suboption",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});