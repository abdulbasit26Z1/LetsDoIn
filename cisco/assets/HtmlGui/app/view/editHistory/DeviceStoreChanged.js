//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.editHistory.DeviceStoreChanged",{extend:"Ext.mixin.Mixin",mixinConfig:{afterHooks:{destroy:"destroy",constructor:"constructor"}},constructor:function(a){AppLogger.trace("DSC - constructor");this.listen_to_store(true);return this},listen_to_store:function(b){AppLogger.trace("DSC - listen: ",b);var a=Ext.data.StoreManager.lookup("DeviceStore"),c={updaterecord:"onStoreDeviceChanged",scope:this};if(b){a.on(c)}else{a.un(c)}},destroy:function(){AppLogger.trace("DSC - destroy");this.listen_to_store(false)}});