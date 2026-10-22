from tcp import *
from time import *

serverIP = "1.1.1.1"
serverPort = 1234

client = TCPClient()

def onTCPConnectionChange(type):
	print("connection changed: " + str(type))
	
def onTCPReceive(data):
	print("received from: " + data);
	client.send(data)

def main():
	client.onConnectionChange(onTCPConnectionChange)
	client.onReceive(onTCPReceive)

	print(client.connect(serverIP, serverPort))

	# don't let it finish
	while True:
		delay(10000)

if __name__ == "__main__":
	main()