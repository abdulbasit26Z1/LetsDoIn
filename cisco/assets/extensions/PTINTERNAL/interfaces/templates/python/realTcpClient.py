from realtcp import *
from time import *

serverIP = "1.1.1.1"
serverPort = 1234

client = RealTCPClient()

def onTCPConnectionChange(type):
	print("connection changed: " + str(type))
	
def onTCPReceive(data):
	print("received from: " + data);

def main():
	client.onConnectionChange(onTCPConnectionChange)
	client.onReceive(onTCPReceive)

	client.connect(serverIP, serverPort)

	count = 0	
	while True:
		count += 1
		client.send("hello " + str(count))
		sleep(1000)

if __name__ == "__main__":
	main()