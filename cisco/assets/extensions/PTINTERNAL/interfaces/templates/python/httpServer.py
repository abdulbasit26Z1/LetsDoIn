from http import *
from time import *

def onRouteRoot(url, response):
	print("Request for /");
	response.send("hello IoE")
	
def onRouteTest(url, response):
	print("Request for /test")
	response.send("test content")
	
def onRouteFile(url, response):
	print("Request for /file")
	response.sendFile("/file.txt")

def onRouteWildcard(url, response):
	print("Request for " + url)
	response.send("wildcard")

def main():
	HTTPServer.route("/", onRouteRoot)
	HTTPServer.route("/test", onRouteTest)
	HTTPServer.route("/file", onRouteFile)
	HTTPServer.route("/*", onRouteWildcard)

	# start server on port 80
	print(HTTPServer.start(80))

	# don't let it finish
	while True:
		delay(10000)

if __name__ == "__main__":
	main()