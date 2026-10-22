//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.instructions.InstructionsDialogPages_UI",{extend:"Ext.Panel",alias:"widget.instructionsinstructionsdialogpages_ui",requires:["HtmlGui.view.instructions.LockedDragCarousel","Ext.carousel.Carousel"],config:{title:"Instructions",fullscreen:true,width:"",layout:"vbox",items:[{xtype:"lockedDragCarousel",cls:"appletText",flex:1}]}});