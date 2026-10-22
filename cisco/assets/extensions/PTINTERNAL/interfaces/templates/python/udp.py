from udp import *
from time import *

def onUDPReceive(ip, port, data):
	print("received from "
		+ ip + ":" + str(port) + ":" + data);

def main():
	socket = UDPSocket()
	socket.onReceive(onUDPReceive)
	print(socket.begin(1235))

	count = 0	
	while True:
		count += 1
		socket.send("1.1.1.1", 1235, "hello " + str(count))
		delay(5000)

if __name__ == "__main__":
	main()