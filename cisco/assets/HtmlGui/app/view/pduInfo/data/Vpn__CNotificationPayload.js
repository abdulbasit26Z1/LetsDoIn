//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Vpn__CNotificationPayload",{extend:"Ext.Base",statics:{data:{title:"ISAKMP Notification",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"Next Payload:{next_payload_type}",size:8},{value:"Reserved",size:8},{value:"Payload Length:{payload_length}",size:16},{value:"Domain of Interpretation (DOI):{doi}",size:32},{value:"Protocol ID",size:8},{value:"SPI Size",size:8},{value:"Notify Message Type:{notify_type}",size:16},{value:"Security Parameter Index:{spi}",size:32},{value:"Notification Data:{data}",size:32},],osi_pdu:"ISAKMP Notification",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});