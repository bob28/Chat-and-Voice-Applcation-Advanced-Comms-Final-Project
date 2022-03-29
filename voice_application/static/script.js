// create the user model with the details of the user
const userDetails = {
  micOn: false,
  online: false,
  mute: false,
  // generate a random username
  username: "user#" + Math.floor(Math.random() * 999),
};

// set the delay that we want when broadcasting audio
const time = 800;

// get all of the information from the divs on the page
const listofUsersDiv = document.getElementById("listOfUsers");
const changeUsernameInput = document.getElementById("username");
const usernameDiv = document.getElementById("usernameDiv");
const usernameLabel = document.getElementById("usernameLabel");

// put the current details into the label and textboxes if the user wants to 
// change it 
changeUsernameInput.value = userDetails.username;
usernameLabel.innerText = "Your username is: " + userDetails.username;

// on window onload, call the main function with the timeout of 800ms 
window.onload = (e) => {
  main();
};

// create the socket object and call the userInformation module in the server
var socket = io("ws://localhost:8000");
socket.emit("userInformation", userDetails);

// the main function
function main() {
  // get the microphone access from the user's browser 
  navigator.mediaDevices.getUserMedia({
    audio: true
  }).then((stream) => {
    // create the mediarecorder object
    var mediaRecorder = new MediaRecorder(stream);
    // start recoording
    mediaRecorder.start();
    // create the list of the audio
    var audioList = [];
    // when there is data flowing in, add it to the list
    mediaRecorder.addEventListener("dataavailable", function (event) {
      audioList.push(event.data);
    });
    // when the recorder stops recording
    mediaRecorder.addEventListener("stop", function () {
      // create a audio blob object
      var blob = new Blob(audioList);
      // reset the variable
      audioList = [];
      // file reader is needed because we have to be able to read the audio blob
      // and return back the voice 
      var fileReader = new FileReader();
      // read the blob
      fileReader.readAsDataURL(blob);
      fileReader.onloadend = function () {
        // make sure that the user's microphone is active and online
        if (!userDetails.micOn || !userDetails.online) return;
        var base64 = fileReader.result;
        // send back the string back to the server to broadcast it to the other 
        // users
        socket.emit("voice", base64);

      };
      // the starting of the recorder usernameLabel
      mediaRecorder.start();
      setTimeout(function () {
        mediaRecorder.stop();
      }, time);
    });
    // the ending of the recorder based on the delay that we want
    setTimeout(function () {
      mediaRecorder.stop();
    }, time);
  });

  // the socket send function event that will create new audio from the recorder 
  // and then play the audio. 
  socket.on("send", function (data) {
    var audio = new Audio(data);
    audio.play();
  });

  // this is for the users list on the page. We have to update the list of 
  // users when someone joins or leaves
  socket.on("usersUpdate", function (data) {
    // get the div ready 
    listofUsersDiv.innerHTML = '';
    // loop through the user datas
    for (const i in data) {
      if (!Object.hasOwnProperty.call(data, i)) continue;
      // create the element, add it to the list, 
      const element = data[i];
      // create the li element
      const li = document.createElement("li");
      li.innerText = element.username;
      // append the list to the page 
      listofUsersDiv.append(li);

    }
  });
}

// when the user clicks on their usernamem, show the textbox 
usernameLabel.onclick = function () {
  usernameDiv.style.display = "block";
  usernameLabel.style.display = "none";
}

// when the user clicks on the online button, toggle if the user is online or not
function switchConnection(e) {
  userDetails.online = !userDetails.online;
  changeButton(e, userDetails.online);
  // update the user information to the rest of the users
  broadcastUserInfo();
}

// the toggle mute function which mutes the user
function switchMute(e) {
  userDetails.mute = !userDetails.mute;
  changeButton(e, userDetails.mute);
  // update the user information to the rest of the users
  broadcastUserInfo();
}

// toggle the min and offc o
function switchMic(e) {
  userDetails.micOn = !userDetails.micOn;
  changeButton(e, userDetails.micOn);
  // update the user information to the rest of the users
  broadcastUserInfo();
}

// the change username function. get the value from the textbox, then set 
// user object to the new username. also stop showing the textbox
function changeUsername() {
  userDetails.username = changeUsernameInput.value;
  usernameLabel.innerText = "Your new username is: " + userDetails.username;
  usernameDiv.style.display = "none";
  usernameLabel.style.display = "block";
  // update the user information to the rest of the users
  broadcastUserInfo();
}

// the toggle for the buttons to make them different colours
function changeButton(target, bool) {
  const classList = target.classList;
  
  if (classList.contains("mute") && bool){ 
    console.log(bool)
    document.getElementsByClassName('mute').innerHTML  = 'Hide';
  }
  else{ 
    document.getElementsByClassName('mute').innerHTML  = "Mute yourself";
  }
  // add and remove classes depending on the choice
  classList.remove("on");
  classList.remove("off");
  if (bool)
    return classList.add("on");
  classList.add("off");
}

// broadcast the user's details on the socket
function broadcastUserInfo() {
  socket.emit("userInformation", userDetails);
}

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