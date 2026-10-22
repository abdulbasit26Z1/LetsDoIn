//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Cdp__CCdpFrame",{extend:"Ext.Base",statics:{data:{title:"CDP",units:"Bits",unit_marks:[1,2,4,6,8,9,10],width:32,fields:[{value:"V<br/>E<br/>R",size:1},{value:"T<br/>T<br/>L",size:1},{value:"CHK<br/>SUM",size:2},{value:"TYPE",size:2},{value:"L<br/>E<br/>N",size:2},{value:"P<br/>R<br/>O",size:1},{value:"L<br/>E<br/>N",size:1},{value:"PROTOCOL(VARIABLE)",size:10},{value:"ADR<br/>LEN",size:2},{value:"ADDRESS(VARIABLE)",size:10},],osi_pdu:"CDP Frame",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});