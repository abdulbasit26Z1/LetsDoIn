//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Vpn__CIkePdu",{extend:"Ext.Base",statics:{data:{title:"ISAKMP",units:"Bits",unit_marks:[],width:32,fields:[{value:"INITIATOR COOKIE:{init_cookie}",size:64},{value:"RESPONDER COOKIE:{resp_cookie}",size:64},{value:"NEXT PAYLOAD:{next_payload}",size:8},{value:"VERSION:{version_number}",size:8},{value:"EXCHANGE TYPE:{exchange_type}",size:8},{value:"FLAGS:{flag}",size:8},{value:"MESSAGE ID:{msg_id}",size:32},{value:"LENGTH:{msg_length}",size:32},],osi_pdu:"ISAKMP",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});