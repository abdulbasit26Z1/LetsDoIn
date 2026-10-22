//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.util.NetSpaceRESTClient",{extend:"Ext.Base",requires:["HtmlGui.util.Logger"],statics:{callbackCourseList:null,callbackFileList:null},getCourseList:function(a){this.self.callbackCourseList=a;PacketTracerFrontEndBridge.RESTCall("GET","https://82252856.netacad.com/api/v1/courses","Authorization=Bearer "+getAccessToken(),"","courseList")},getFileList:function(b,a){this.self.callbackFileList=a;PacketTracerFrontEndBridge.RESTCall("GET","https://82252856.netacad.com/api/v1/courses/"+b+"/files?per_page=200&content_types[]=unknown/unknown&content_types[]=binary/octet-stream&content_types[]=application/octet-stream","Authorization=Bearer "+getAccessToken(),"","fileList")}},function(){AppLogger.info("Creating NetSpaceRESTClient...");window.NetSpaceRESTClient=Ext.create("HtmlGui.util.NetSpaceRESTClient",{});AppLogger.info("... done.")});