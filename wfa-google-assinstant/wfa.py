from flask import Flask
import socketio
#import socket


app = Flask(__name__)

sio = socketio.Client()
#sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#server_address = ('192.168.1.7', 8080)
#print('connecting to {} port {}'.format(*server_address))
#sock.connect(server_address)

sio.connect('http://192.168.1.7:8080')
#sio.wait()

@app.route('/on-light')
def on_light():
	print("/on-light")
	sio.emit('ledTwo')
	#try:
		#sock.sendall(b'ledTwo')	
	#finally:
		#print('finally socket')
		#sock.close()
	return "on-light"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")