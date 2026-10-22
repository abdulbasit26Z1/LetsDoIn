from gpio import *
from usb import *
from time import *

def main():
	pinMode(0, IN)
	pinMode(1, OUT)
	sbcBtnState = digitalRead(0)
	
	ptmata = PTmata(0, 57600)
	ptmata.pinMode(0, IN)
	ptmata.pinMode(1, OUT)
	mcuBtnState = ptmata.digitalRead(0)
	
	while True:
		while ptmata.inWaiting() > 0:
			ptmata.processInput()
		
		# if local button changes, write to remote
		newSbcBtnState = digitalRead(0);
		if newSbcBtnState != sbcBtnState:
			sbcBtnState = newSbcBtnState
			ptmata.digitalWrite(1, sbcBtnState)

		# if remote button changes, write to local
		newMcuBtnState = ptmata.digitalRead(0)
		if newMcuBtnState != mcuBtnState:
			mcuBtnState = newMcuBtnState
			digitalWrite(1, mcuBtnState)

		delay(1000)

if __name__ == "__main__":
	main()