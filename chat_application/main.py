# import the dependencies 
from flask import Flask, render_template
from flask_socketio import SocketIO

# create the flask app which runs the flask backend server. 
app = Flask(__name__)
# configure the secret key for flask
app.config['SECRET_KEY'] = 'fi(oov+3@RN7JF%'
# add socketio to the flask app as this will allow us to connect/disconnect 
# to the server
socketio = SocketIO(app)

# the code under here is for the app routes, using GET and POST calls to 
# send the message, and 
# the first route that is the home route. When the user goes to localhost:8000, 
# they will be shown the index.html file
@app.route('/' , methods=['GET', 'POST'])
def index():
    # show the index file
    return render_template('index.html')

# the message received callback function that will be called when there is 
# a message that is sent by a use r 
def message(methods=['GET', 'POST']):
    print('message recieve')

# the message handler functionm that ties in the front-end to the backend. 
# This allows us to get the message from the front-end, and then add it to the 
# server for everyone to see. 
@socketio.on('messages')
def messageHandler(json, methods=['GET', 'POST']):
    print('Message: ' + str(json))
    # the emit function takes the the json that was sent and emits it across 
    # all clients
    socketio.emit('recieveMessage', json, callback=message)

# the main run
if __name__ == '__main__':
    # when the program runs, we will run the socketio connection which will 
    # create and run the flask app 
    socketio.run(app, debug=True)

# References

# Alla, S. (2018, May 26). Building your first Chat Application using Flask in 
# 7 minutes. codeburst. Retrieved March 27, 2022, from 
# https://codeburst.io/building-your-first-chat-application-using-flask-in-7-
# minutes-f98de4adfa5d
# Arora, T. (2021, March 23). Building a Video Chat App with Node.js + 
# Socket.io + WebRTC. Level Up Coding. Retrieved March 20, 2022, from 
# https://levelup.gitconnected.com/building-a-video-chat-app-with-node-js-socket-
# io-webrtc-26f46b213017
# Emmanuel, F. (2021, November 8). How to Build a Realtime Group Chat 
# Application with React and Socket.io. DEV Community ‍ ‍. Retrieved March 
# 20, 2022, from 
# https://dev.to/divofred/how-to-build-a-realtime-group-chat-application-with-
# react-and-socketio-2jf0
# Eseme, S. (2021, January 25). Build a real-time chat app with Vuejs, 
# socket.IO, and Nodejs. Mastering Backend. Retrieved March 20, 2022, 
# from https://masteringbackend.com/posts/build-a-real-time-chat-app-with-vuejs-
# socket-io-and-nodejs/
# h_mobarakian. (2021, June 13). Create simple voice chat app with nodejs. 
# DEV Community ‍ ‍. Retrieved March 20, 2022, from 
# https://dev.to/hosseinmobarakian/create-simple-voice-chat-app-with-nodejs-1b70
# Nayak, A. (2021, July 19). How to Build a Chat App with ReactJS, NodeJS, 
# and Socket.IO? Bacancy Technology. Retrieved March 20, 2022, from 
# https://www.bacancytechnology.com/blog/how-to-build-a-chat-app
# Njoroge, E. (2021, May 5). Creating a Real Time Chat App using React and 
# Socket IO with E2E Encryption. Section.io. Retrieved March 20, 2022, from 
# https://www.section.io/engineering-education/creating-a-real-time-chat-app-
# with-react-socket-io-with-e2e-encryption/
# Safak. (2021, May 26). React Instant Chat App Using Node.js and Socket.io. 
# DEV Community ‍ ‍. Retrieved March 20, 2022, from https://dev.to/safak/react-
# instant-chat-app-using-node-js-and-socket-io-5c7k
# Wargowski, M., & Gold, N. (2019, November 26). How to write a video chat 
# app using WebRTC Node.js. The Software House. Retrieved March 20, 2022, 
# from https://tsh.io/blog/how-to-write-video-chat-app-using-webrtc-and-nodejs/