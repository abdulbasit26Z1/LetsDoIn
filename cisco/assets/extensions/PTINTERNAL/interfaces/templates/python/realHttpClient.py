from realhttp import *
from time import *

url = "http://www.cisco.com"

def onHTTPDone(status, data):
	print("status: " + str(status))
	print("data: " + data)

def main():
	http = RealHTTPClient()
	http.onDone(onHTTPDone)
	http.get(url)

	# don't let it finish
	while True:
		delay(10000)

if __name__ == "__main__":
	main()