//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
console.log("ipcHelper.js ==============================");function addSimplePdu(a,b){var c=a.getDevice().getName();var d=b.getDevice().getName();ipc.ipcCallSeqAsync("appWindow.getUserCreatedPDU.addSimplePdu",[c,d])}console.log("ipcHelper.js ==============================");