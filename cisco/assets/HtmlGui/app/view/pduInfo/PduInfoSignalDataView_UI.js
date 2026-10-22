//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.PduInfoSignalDataView_UI",{extend:"Ext.Container",requires:["Ext.XTemplate"],config:{layout:"vbox",data:{details_caption:"PT Signal Type",details_html:"PDU details table goes here "},tpl:['<div class="cpisdv_ui_root" style="margin-left:{details_offset}px;">','    <div class="cpisdv_ui_caption">',"        {details_caption}","    </div>",'    <div class="cpisdv_ui_details">',"        {details_html}","    </div>","</div>",""]}});