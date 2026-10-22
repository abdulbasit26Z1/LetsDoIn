from http import *
from time import *

url = "http://1.1.1.1/test"

def onHTTPDone(status, data):
	print("status: " + str(status))
	print("data: " + data)

def main():
	http = HTTPClient()
	http.onDone(onHTTPDone)
	http.open(url)

	# don't let it finish
	while True:
		delay(10000)

if __name__ == "__main__":
	main()