//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.actionBar.PkaController",{extend:"HtmlGui.view.actionBar.BaseActionbarController",config:{id:"actionBarPkaController"},constructor:function(a){this.callParent(arguments)},initialize:function(b){this.m_actionBar=b;var a=[{id:"button_instructions",h:this.onInstructions},];this.setupControlSet(a,this.getActionBar())},onInstructions:function(){var a=Ext.getCmp("MainView");if(a){a.setInstructionsDialogVisibility(!a.isInstructionsDialogVisible())}},onCheckPkaResults:function(){var b=0;var a=Ext.getCmp("id_instructions_dialog");if(a){b=a.get_percentage_complete()}this.getActionBar().setActivityCompleteValue(b)},setActivityCompleteValue:function(a){var b=Ext.getCmp("text_activityResults");if(b){b.setText(a+"%")}}});