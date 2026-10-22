//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.contextualMenus.WirelessButtonCircle",{extend:"Ext.Base",requires:["Ext.Anim"],config:{},loadStore:function(b,c){var a=[];if(!b.m_showObsoleteDevices){a=b.m_storeObsoleteDeviceIDs}b.loadLayerWithStore(b.layer2ID(),"WirelessContextButtonStore",function(d){b.handleLayer2ButtonPress(d)},c,a)}});