from realudp import *
from time import *

IP = "1.1.1.1"
PORT = 1235

def onUDPReceive(ip, port, data):
	print("received from "
		+ ip + ":" + str(port) + ":" + data);

def main():
	socket = RealUDPSocket()
	socket.onReceive(onUDPReceive)
	print(socket.begin(1235))

	count = 0	
	while True:
		count += 1
		socket.send(IP, PORT, "hello " + str(count))
		sleep(1000)

if __name__ == "__main__":
	main()