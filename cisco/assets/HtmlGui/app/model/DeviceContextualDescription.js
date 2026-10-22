//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.model.DeviceContextualDescription",{extend:"Ext.data.Model",config:{fields:[{allowNull:false,name:"ID",sortType:"asText",type:"string"},{allowNull:false,name:"PropertyID",sortType:"asText",type:"string"},{name:"Text",type:"string"},{allowNull:false,name:"CSS",type:"string"},{allowNull:false,name:"AlwaysInclude",type:"bool"},{allowNull:false,name:"TriggerMethod",type:"string"}]}});