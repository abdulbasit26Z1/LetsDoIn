var resourceManager = null;
var dataStoreEditor = null;
function main() {
	resourceManager = new ResourceManager();
	resourceManager.init();
	dataStoreEditor = new DataStoreEditor();
	dataStoreEditor.init();
}
	
function cleanUp() {
	dataStoreEditor.cleanUp();
}
