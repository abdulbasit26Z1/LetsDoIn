//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Eigrp__CEigrpParameters",{extend:"Ext.Base",statics:{data:{title:"EIGRP Parameters",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"TYPE",size:16},{value:"TYPE",size:16},{value:"K1:{k1}",size:8},{value:"K2: {k2}",size:8},{value:"K3: {k3}",size:8},{value:"K4:{k4}",size:8},{value:"K5: {k5}",size:8},{value:"RES: {reserved}",size:8},{value:"HOLD TIME: {hold_time}",size:16},],osi_pdu:"EIGRP Parameters",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});