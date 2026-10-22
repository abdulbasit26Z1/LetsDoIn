from gpio import *
from time import *

def main():
	pinMode(1, OUT)
	print("Blinking")
	while True:
		digitalWrite(1, HIGH);
		delay(1000)
		digitalWrite(1, LOW);
		delay(500)

if __name__ == "__main__":
	main()