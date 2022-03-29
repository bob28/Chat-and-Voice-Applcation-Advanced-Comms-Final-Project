// add all the dependencies, express, handlebars, http, socket.io 
const express = require("express");
// we go into detail what these dependecies are why they are needed in the 
// final report 
const handlebars = require("express-handlebars");
// create the express app 
const app = express();
// require the http dependency
const http = require("http").Server(app);
// socket.io 
const io = require("socket.io")(http);

// for the express handlebars. we need to show where the main handlebars file is 
const handlebar = handlebars.create({
    layoutsDir: "./views/layouts"
});

// create the front-end engine to drive the handlebars
app.engine("handlebars", handlebar.engine);
app.set("view engine", "handlebars");

// we need to be able to access our javascript file in the static folder, so 
// we need to make it a static folder so that we can access it on the server
app.use("/static", express.static('./static/'));

// the first route that we will have in this program is the index page. This is a 
// get REST call. We will send the index.handlebars file when a user goes to this
// link.
app.get("/index", (req, res) => {
    res.render("index");
});

// the redirect route that we will put in place. This is for if the user goes 
// localhost:8000 only, it will redirect to the /index route
app.get('/', function (req, res) {
    res.redirect('/index');
});

// the port that we will be using to connect to run the server on
const port = 8000;
// the dictionary that holds all of the users that have connected to the application
const listOfSockets = {};

// we reached the socket.io portion. Where we create the users, connect them 
// to the application, create the voice input settings so that they can talk, 
// change user data, and then disconnect the users
io.on("connection", function (socket) {
    // the socket id of the user
    const socketId = socket.id;
    // add the user to the dictionary
    listOfSockets[socket.id] = {};

    // this is the voice module that we will use to take in the data from the 
    // user broadcast it to the other users
    socket.on("voice", function (data) {
        // create the new data from the the data that we are getting from the 
        // user's voice data.
        var newData = data.split(";");
        // set it to audio
        newData[0] = "data:audio/ogg;";
        // add the audio format to the data
        newData = newData[0] + newData[1];
        // loop through the list of users in the dictionary
        for (const userid in listOfSockets) {
            // make sure that the user is not the same user, not muted, and online
            if (userid != socketId && !listOfSockets[userid].mute &&
                listOfSockets[userid].online)
                // send the voice to the other users in the server
                socket.broadcast.to(userid).emit("send", newData);
        }

    });
    // the data that we are get from the user, we add the data to the user's 
    // information 
    socket.on("userInformation", function (data) {
        listOfSockets[socketId] = data;
        // update the user lists
        io.sockets.emit("usersUpdate", listOfSockets);
    });

    // the disconnect module. when the user disconnects, remove them from the 
    // list of users
    socket.on("disconnect", function () {
        delete listOfSockets[socketId];
    });

});

// listen on port 8000
http.listen(port, () => console.log(`Listening on port ${port}`));


// REFERENCES

// Arora, T. (2021, March 23). Building a Video Chat App with Node.js + Socket.io + 
//     WebRTC. Level Up Coding. Retrieved March 20, 2022, from 
//     https://levelup.gitconnected.com/building-a-video-chat-app-with-node-js-
//     socket-io-webrtc-26f46b213017
// Emmanuel, F. (2021, November 8). How to Build a Realtime Group Chat Application 
//     with React and Socket.io. DEV Community ‍ ‍. Retrieved March 20, 2022, 
//     from
//     https://dev.to/divofred/how-to-build-a-realtime-group-chat-application-with-
//     react-and-socketio-2jf0
// Eseme, S. (2021, January 25). Build a real-time chat app with Vuejs, socket.IO, 
//     and Nodejs. Mastering Backend. Retrieved March 20, 2022, from 
//     https://masteringbackend.com/posts/build-a-real-time-chat-app-with-vuejs-
//     socket-io-and-nodejs/
// h_mobarakian. (2021, June 13). Create simple voice chat app with nodejs. DEV 
//     Community ‍ ‍. Retrieved March 20, 2022, from 
//     https://dev.to/hosseinmobarakian/create-simple-voice-chat-app-with-nodejs-1b70
// Nayak, A. (2021, July 19). How to Build a Chat App with ReactJS, NodeJS, and 
//     Socket.IO? Bacancy Technology. Retrieved March 20, 2022, from 
//     https://www.bacancytechnology.com/blog/how-to-build-a-chat-app
// Njoroge, E. (2021, May 5). Creating a Real Time Chat App using React and Socket 
//     IO with E2E Encryption. Section.io. Retrieved March 20, 2022, from 
//     https://www.section.io/engineering-education/creating-a-real-time-chat-app-
//     with-react-socket-io-with-e2e-encryption/
// Safak. (2021, May 26). React Instant Chat App Using Node.js and Socket.io. DEV 
//     Community ‍ ‍. Retrieved March 20, 2022, from 
//     https://dev.to/safak/react-instant-chat-app-using-node-js-and-socket-io-5c7k
// Wargowski, M., & Gold, N. (2019, November 26). How to write a video chat app 
//     using WebRTC Node.js. The Software House. Retrieved March 20, 2022, from 
//     https://tsh.io/blog/how-to-write-video-chat-app-using-webrtc-and-nodejs/