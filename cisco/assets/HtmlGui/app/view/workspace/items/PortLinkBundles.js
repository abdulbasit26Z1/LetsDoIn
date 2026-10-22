//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.workspace.items.PortLinkBundles",{extend:"Ext.Base",uses:["HtmlGui.view.workspace.items.PortLinkBundle"],singleton:true,constructor:function(){this.callParent(arguments);this.bundles=[]},init:function(){HtmlGui.networkContents.on("contentsCleared",this.removeAll,this)},getBundle:function(c,b){var a=this.find_bundles(c,b)[0];if(!a){a=HtmlGui.view.workspace.items.PortLinkBundle.create({wsDevice1:c,wsDevice2:b});this.bundles.push(a)}return a},find_bundles:function(c,b){var a=this.bundles.filter(function(d){return d&&d.isActive()&&d.hasDevice(c)});if(a.length&&b){a=a.filter(function(d){return d&&d.isActive()&&d.hasDevice(b)})}return a},cleanup:function(){var a=this.bundles.filter(function(c){return c&&!c.isActive()});this.remove_bundles(a)},removeAll:function(){this.remove_bundles(Ext.clone(this.bundles));this.bundles=[]},remove_bundles:function(b){while(b.length){var a=b.pop();a.destroy();Ext.Array.remove(this.bundles,a)}},bundles:null});