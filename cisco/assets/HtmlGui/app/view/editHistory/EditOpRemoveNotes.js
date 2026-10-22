//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.editHistory.EditOpRemoveNotes",{extend:"HtmlGui.view.editHistory.EditOpAbstract",config:{noteIds:[]},doEdit:function(){Ext.Array.forEach(this.getNoteIds(),function(a){HtmlGui.networkContents.removeNote(a)})},addNoteUuid:function(a){this.getNoteIds().push(a)}});