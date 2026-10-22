//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.editHistory.EditOpRemoveClusters",{extend:"HtmlGui.view.editHistory.EditOpAbstract",config:{clusterIds:[],uncluster:false},doEdit:function(){Ext.Array.forEach(this.getClusterIds(),function(a){HtmlGui.networkContents.removeCluster(a,this.getUncluster())},this)},addClusterId:function(a){this.getClusterIds().push(a)}});