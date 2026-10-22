//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.Assessments",{extend:"Ext.data.TreeStore",alias:["store.assessmentsStore"],requires:["HtmlGui.model.Assessment"],config:{model:"HtmlGui.model.Assessment",storeId:"assessmentsStore",defaultRootProperty:"items",root:{items:[]}}});