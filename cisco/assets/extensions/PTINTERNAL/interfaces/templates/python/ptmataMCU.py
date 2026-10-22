from usb import *
from time import *

def main():
	ptmata = PTmata(0, 57600)
	
	while True:
		while ptmata.inWaiting() > 0:
			ptmata.processInput()
		
		ptmata.readAndReportData()

		delay(1000)

if __name__ == "__main__":
	main()