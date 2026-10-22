//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.editHistory.EditOpRemoveShapes",{extend:"HtmlGui.view.editHistory.EditOpAbstract",config:{shapeIds:[]},doEdit:function(){Ext.Array.forEach(this.getShapeIds(),function(a){HtmlGui.networkContents.removeShape(a)})},addShapeUuid:function(a){this.getShapeIds().push(a)}});