//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.physical.PhysicalSceneView",{extend:"HtmlGui.view.workspace.items.WSSceneView",calcViewZoomDeviceSizeFactor:function(){this.viewZoomDeviceSizeFactor=getScreenPixelDensity();if(window.matchMedia("(max-width:17cm)").matches){this.viewZoomDeviceSizeFactor=0.6}else{if(window.matchMedia("(max-width:20cm)").matches){this.viewZoomDeviceSizeFactor=0.75}else{this.viewZoomDeviceSizeFactor=1.3}}}});