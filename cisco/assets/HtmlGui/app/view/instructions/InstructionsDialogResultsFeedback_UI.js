//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.instructions.InstructionsDialogResultsFeedback_UI",{extend:"Ext.Container",alias:"widget.InstructionsDialogResultsFeedback_UI",requires:["Ext.Panel"],config:{centered:false,id:"id-dres-feedback-view",itemId:"id-dres-feedback-view",style:"font-size:17px;",layout:"vbox",items:[{xtype:"panel",flex:1,border:"",cls:"appletText",html:"No feedback page text present.",id:"feedback_page",itemId:"feedback_page",padding:10,style:"border: 1px solid black;",layout:"vbox",scrollable:"vertical"}]}});