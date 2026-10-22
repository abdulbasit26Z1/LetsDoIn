//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.workspace.items.WorkspaceItemNamed",{extend:"HtmlGui.view.workspace.items.WorkspaceItem",getFontPixSize:function(){return 18},createNameSprite:function(){this.nameSprite=Ext.create("Ext.draw.sprite.Text",{text:"",fill:"black",fontSize:this.getFontPixSize(),textAlign:"center"});this.addSprite(this.nameSprite)},setNameSpriteOffset:function(b,c){if(b&&this.nameSprite&&this.getSpriteSize()){var a=(b.split(/\r\n|\r|\n/).length-1)*this.getFontPixSize();this.nameSprite.setAttributes({translationY:c+a})}},wrapText:function(i){if(!i){i=""}var h=10;var e=i.split(" ");var a=[];var g="";var c="";var f=0;if(h<i.length){for(var b=0;b<e.length;++b){if(e[b].length>h){a=a.concat(e[b].match(/.{1,10}/g))}else{a.push(e[b])}}for(var d=0;d<a.length;++d){if(c.length+a[d].length>h){g+=c+"\n";c=a[d]+" "}else{c+=a[d]+" "}}if(g.length&&c.length){g+=c}i=g}return i},getPacketOffset:function(){return this.getSpriteSize()*0.7},setNameHidden:function(a){if(this.nameSprite){if(a){this.nameSprite.hide()}else{this.nameSprite.show()}}}});