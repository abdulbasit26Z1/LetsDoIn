from usb import *
from time import *

def main():
	# start USB
	usb = USB(0, 57600)
	
	count = 0
	while True:
		# read from USB
		while usb.inWaiting() > 0:
			print("received: " + usb.readLine())
		
		# write to USB
		print("sending: " + str(count))
		usb.write(str(count))
		count += 1

		delay(1000)

if __name__ == "__main__":
	main()