//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Vpn__CSaPayload",{extend:"Ext.Base",statics:{data:{title:"ISAKMP Security Association",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"Next Payload:{next_payload_type}",size:8},{value:"Reserved",size:8},{value:"Payload Length:{payload_length}",size:16},{value:"Domain of Interpretation:{doi}",size:32},{value:"Situation (Variable Length):{situation}",size:32},],osi_pdu:"ISAKMP Security Association",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});