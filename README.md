# Chat and-Voice Applcation | Advanced Comms Final Project
Group 11's final project for Advanced Communication Masters level course at Ontario Tech University - Winter 2022. 

We will go over how to download and run these two applcations. 

## Chat application
The first step is to clone this repository. After that, the chat applcation requires you have to python installed. To do this, you can head to https://www.python.org/downloads/ and download the correct version of Python for your system. After installing, you will need to install some dependencies to run the applcation correctly. Head over to your terminal and type in the following commands: 

```
pip install flask
pip install --upgrade python-socketio==4.6.0
pip install --upgrade python-engineio==3.13.2
pip install --upgrade Flask-SocketIO==4.3.1
```
Once that is done, go into the root directory of the chat applcation ("chat_applcation") and open a terminal window in this folder. Then you can type: 
```
python main.py
```
This will run the application. Then you can go to your browser and type: `http://127.0.0.1:5000/`. This will show the running application on your browser and you can interact with the app. 
Open up 2 windows of the same URL and start typing in your messages. You will see the messages of both users on either end. 

## Voice Application
The voice application requires NodeJS to run this application. You can download NodeJS from this site: https://nodejs.org/en/download/. Download the correct version for your device. 
After that, navigate to the voice_applcation folder and open a terminal window in this folder. Type: 
```
npm install
```
Then, to run the applcation: 
```
nodemon ./server.js
```
Then, navigate to your browser again and type in `http://localhost:8000/` and you will see the application running. 
To interact with it, allow access to your mic, click on `Go online`, then click on `Open microphone` and begin speaking. You can open up another window with the same URL and you will hear yourself twice on either end. 

Both applications have links between each other. This means that you run both at the same time, you can navigate between both applcations seamlessly. 

## References
Alla, S. (2018, May 26). Building your first Chat Application using Flask in 7 minutes. codeburst. Retrieved March 27, 2022, from https://codeburst.io/building-your-   
first-chat-application-using-flask-in-7-minutes-f98de4adfa5d

Arora, T. (2021, March 23). Building a Video Chat App with Node.js + Socket.io + WebRTC. Level Up Coding. Retrieved March 20, 2022, from https://levelup.gitconnected.com/building-a-video-chat-app-with-node-js-socket-io-webrtc-26f46b213017

Emmanuel, F. (2021, November 8). How to Build a Realtime Group Chat Application with React and Socket.io. DEV Community ‍ ‍. Retrieved March 20, 2022, from https://dev.to/divofred/how-to-build-a-realtime-group-chat-application-with-react-and-socketio-2jf0

Eseme, S. (2021, January 25). Build a real-time chat app with Vuejs, socket.IO, and Nodejs. Mastering Backend. Retrieved March 20, 2022, from https://masteringbackend.com/posts/build-a-real-time-chat-app-with-vuejs-socket-io-and-nodejs/

h_mobarakian. (2021, June 13). Create simple voice chat app with nodejs. DEV Community ‍ ‍. Retrieved March 20, 2022, from https://dev.to/hosseinmobarakian/create-simple-voice-chat-app-with-nodejs-1b70

Nayak, A. (2021, July 19). How to Build a Chat App with ReactJS, NodeJS, and Socket.IO? Bacancy Technology. Retrieved March 20, 2022, from https://www.bacancytechnology.com/blog/how-to-build-a-chat-app

Njoroge, E. (2021, May 5). Creating a Real Time Chat App using React and Socket IO with E2E Encryption. Section.io. Retrieved March 20, 2022, from https://www.section.io/engineering-education/creating-a-real-time-chat-app-with-react-socket-io-with-e2e-encryption/

Safak. (2021, May 26). React Instant Chat App Using Node.js and Socket.io. DEV Community ‍ ‍. Retrieved March 20, 2022, from https://dev.to/safak/react-instant-chat-app-using-node-js-and-socket-io-5c7k

Wargowski, M., & Gold, N. (2019, November 26). How to write a video chat app using WebRTC Node.js. The Software House. Retrieved March 20, 2022, from https://tsh.io/blog/how-to-write-video-chat-app-using-webrtc-and-nodejs/
