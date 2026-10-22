//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Eigrp__CEigrpSoftwareVersion",{extend:"Ext.Base",statics:{data:{title:"EIGRP Software Version",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"TYPE:{type}",size:16},{value:"LENGTH:{length}",size:16},{value:"IOS VERSION:{ios_version}",size:16},{value:"EIGRP VERSION: {eigrp_version}",size:16},],osi_pdu:"EIGRP Software Version",osi_summary:"Version: {eigrp_version}"}},constructor:function(a){this.initConfig(a)}});