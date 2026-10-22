//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Netflow__CNFTemplate",{extend:"Ext.Base",statics:{data:{title:"Template Flowset",units:"Bits",unit_marks:[16],width:32,fields:[{value:"Flowset ID = 0 ",size:16},{value:"Length:{feild_count}",size:16},{value:"Template ID:{template_id}",size:16},{value:"Count:{feild_count}",size:16},],osi_pdu:"Netflow Template Flowset",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});