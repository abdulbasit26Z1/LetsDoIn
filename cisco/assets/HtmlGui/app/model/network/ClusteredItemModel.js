//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.model.network.ClusteredItemModel",{extend:"Ext.data.Model",config:{fields:[{name:"parentClusterId",type:"string",defaultValue:""},{name:"clusteredItemUuid",type:"string",defaultValue:""}]},getParentClusterId:function(){return this.get("parentClusterId")},getClusteredItemUuid:function(){return this.get("clusteredItemUuid")},setActive:function(a){HtmlGui.networkContents.getPtLogicalWorkspace().ipcCallArgsAsync("getClusterIdForItem",[this.getClusteredItemUuid()],function(b){this.set({parentClusterId:b});ipcRegisterClassEvent("LogicalWorkspace","clusterForItemChanged",this,this.onIpcClusterForItemChanged)},this)},onIpcClusterForItemChanged:function(a){if(a.eventArgs.itemUuid==this.getClusteredItemUuid()){this.set("parentClusterId",a.eventArgs.newClusterId)}}});