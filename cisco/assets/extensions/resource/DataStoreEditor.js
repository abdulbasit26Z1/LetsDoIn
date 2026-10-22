var DataStoreEditor;
var webview;
var webviewId;
function DataStoreEditor()
{
	this.m_drawItemUuid = "";	
}

DataStoreEditor.prototype.init = function()
{
	var menu = ipc.appWindow().getMenuBar().getExtensionsPopupMenu();
	this.m_drawItemUuid = menu.insertItem('', 'Attribute Editor');
	var menuItem = menu.getMenuItemByUuid(this.m_drawItemUuid);
	menuItem.registerEvent("onClicked", this, this.menuClicked);
}
DataStoreEditor.prototype.cleanUp = function()
{
	if (this.m_drawItemUuid != "")
	{
		var menu = ipc.appWindow().getMenuBar().getExtensionsPopupMenu();
		_ScriptModule.unregisterIpcEventByID("MenuItem", this.m_drawItemUuid, "onClicked", this, this.menuClicked);
		menu.removeItemUuid(this.m_drawItemUuid);
		this.m_drawItemUuid = "";
	}
}
DataStoreEditor.prototype.menuClicked = function(src, args)
{
	if (webViewManager.getWebView(webviewId) == null)
	{
		webview = webViewManager.createWebView("DataStoreEditor","this-sm:DataStoreEditor.html", 600, 400);
		webviewId = webview.getWebViewId() ;
		webview.registerEvent("closed", this, this.windowClosed);
		webview.setGeometry(100,100,700,700);
		$wvc(webview, 'loadData');
	}

	webview.hide();
	webview.show();

	
}


