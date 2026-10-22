var templates = [
	{
		name: "Empty",
		templates: [
			{ name: "Empty - JavaScript", files: [{name:"main.js", file:"empty.txt"}] },
			{ name: "Empty - Python", files: [{name:"main.py", file:"empty.txt"}] },
			{ name: "Empty - Visual", files: [{name:"main.visual", file:"empty.txt"}] }
		]
	},
	{
		name: "JavaScript",
		templates: [
			{ name: "Blink - JavaScript", files: [{name:"main.js", file:"javascript/blink.js"}] },
			{ name: "Digital - JavaScript", files: [{name:"main.js", file:"javascript/digital.js"}] },
			{ name: "Analog - JavaScript", files: [{name:"main.js", file:"javascript/analog.js"}] },
			{ name: "UDP Socket - JavaScript", files: [{name:"main.js", file:"javascript/udp.js"}] },
			{ name: "TCP Client - JavaScript", files: [{name:"main.js", file:"javascript/tcpClient.js"}] },
			{ name: "TCP Server - JavaScript", files: [{name:"main.js", file:"javascript/tcpServer.js"}] },
			{ name: "HTTP Client - JavaScript", files: [{name:"main.js", file:"javascript/httpClient.js"}] },
			{ name: "HTTP Server - JavaScript", files: [{name:"main.js", file:"javascript/httpServer.js"}] },
			{ name: "Email - JavaScript", files: [{name:"main.js", file:"javascript/email.js"}] },
			{ name: "File - JavaScript", files: [{name:"main.js", file:"javascript/file.js"}] },
			{ name: "USB - JavaScript", files: [{name:"main.js", file:"javascript/usb.js"}] },
			{ name: "Standard PTmata - JavaScript", files: [{name:"main.js", file:"javascript/ptmataMCU.js"}] },
			{ name: "PTmata Controller - JavaScript", files: [{name:"main.js", file:"javascript/ptmataSBC.js"}] },
			{ name: "Real HTTP Client - JavaScript", files: [{name:"main.js", file:"javascript/realHttpClient.js"}] },
			{ name: "Real TCP Client - JavaScript", files: [{name:"main.js", file:"javascript/realTcpClient.js"}] },
			{ name: "Real UDP Socket - JavaScript", files: [{name:"main.js", file:"javascript/realUdp.js"}] }
		]
	},
	{
		name: "Python",
		templates: [
			{ name: "Blink - Python", files: [{name:"main.py", file:"python/blink.py"}] },
			{ name: "UDP Socket - Python", files: [{name:"main.py", file:"python/udp.py"}] },
			{ name: "TCP Client - Python", files: [{name:"main.py", file:"python/tcpClient.py"}] },
			{ name: "TCP Server - Python", files: [{name:"main.py", file:"python/tcpServer.py"}] },
			{ name: "HTTP Client - Python", files: [{name:"main.py", file:"python/httpClient.py"}] },
			{ name: "HTTP Server - Python", files: [{name:"main.py", file:"python/httpServer.py"}] },
			{ name: "Email - Python", files: [{name:"main.py", file:"python/email.py"}] },
			{ name: "USB - Python", files: [{name:"main.py", file:"python/usb.py"}] },
			{ name: "Standard PTmata - Python", files: [{name:"main.py", file:"python/ptmataMCU.py"}] },
			{ name: "PTmata Controller - Python", files: [{name:"main.py", file:"python/ptmataSBC.py"}] },
			{ name: "Real HTTP Client - Python", files: [{name:"main.py", file:"python/realHttpClient.py"}] },
			{ name: "Real TCP Client - Python", files: [{name:"main.py", file:"python/realTcpClient.py"}] },
			{ name: "Real UDP Socket - Python", files: [{name:"main.py", file:"python/realUdp.py"}] }
		]
	},
	{
		name: "Visual",
		templates: [
			{ name: "Blink - Visual", files: [{name:"main.visual", file:"visual/blink.visual"}] }
		]
	}
];
