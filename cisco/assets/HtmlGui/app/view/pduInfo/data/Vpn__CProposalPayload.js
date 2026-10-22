//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Vpn__CProposalPayload",{extend:"Ext.Base",statics:{data:{title:"ISAKMP Proposal",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"Next Payload:{next_payload_type}",size:8},{value:"Reserved",size:8},{value:"Payload Length:{payload_length}",size:16},{value:"Proposal:{proposal_number}",size:8},{value:"Protocol ID:{proposal_id}",size:8},{value:"SPI Size:{spi_size}",size:8},{value:" #Of Transforms:{transform_payload_count}",size:8},{value:"SPI (Variable Length):{spi}",size:32},],osi_pdu:"ISAKMP Proposal",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});