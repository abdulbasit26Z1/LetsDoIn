from tcp import *
from time import *

port = 1234

server = TCPServer()
count = 0

def onTCPConnectionChange(type):
	print("connection changed: " + str(type))
	
def onTCPReceive(data):
	print("received from: " + data);
	# client.close()
	
def onTCPNewClient(client):
	client.onConnectionChange(onTCPConnectionChange)
	client.onReceive(onTCPReceive)
	global count
	count += 1
	client.send("hello " + str(count))

def main():
	server.onNewClient(onTCPNewClient)
	print(server.listen(port))

	# don't let it finish
	while True:
		delay(10000)

if __name__ == "__main__":
	main()