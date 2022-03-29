// connect the socket to the domain and port where it is going to be hosted on
var socket = io.connect('http://' + document.domain + ':' + location.port);
// the global username variable so that we know who it is 
var userId = "";
// the socket conenct function that takes the user input and then throws it 
// to the server to process
socket.on('connect', function () {
    //emit that the user connected
    socket.emit('messages', {
        data: 'User Connected',
        socketid: socket.id
    });
    // the form in the index.html submits, then start processing the 
    // information that the user put
    $('form').on('submit', function (e) {
        // prevent the browser to executing on the element
        e.preventDefault()
        // take in the user input, name and message 
        let username = $('input.username').val();
        let userMessage = $('input.message').val();
        // make sure that the textboxes are filled or show the error
        if (!username || !userMessage) {
            $("#error").show();
            $("#error").text("Please input text in both textboxes");
        } else {
            // know who it is
            userId = username;
            // disable the input and set the value to the username so that the 
            // user cannot change it
            $(".username").prop('disabled', true);
            $(".username").val(userId);
            // if it valid, then emit the emssage
            $("#error").hide();
            var d = new Date();
            // use socket to send the information to the server with the message
            socket.emit('messages', {
                username: username,
                message: userMessage,
                time: n = d.toLocaleTimeString()
            })
        }
        // focus the message that was sent
        $('input.message').val('').focus();
    })
});

// the connection that gets the messages from the server
socket.on('recieveMessage', function (message) {
    console.log(message);
    // make sure that the message is full 
    if (typeof message.username !== 'undefined') {
        //remove the h3
        $('h3').remove();
        if (message.username == userId) {
            $('.message_holder ul').append('<li class="clearfix"><div class="message-data text-right"><span class="message-name">'+ 
            message.username +'</span> <span class = "message-data-time" >' + message.time +
            '</span> </div > <div class = '+ '"message other-message float-right" >' + message.message + 
            '</div> </li >')
            console.log("text")
            // $('.message_holder ul').append("text");
        }
        else{ 
            let text = '<li class="clearfix"><div class="message-data"><span class="message-name">'+ message.username + 
            '</span><span class="message-data-time">'+message.time + '</span></div><div class="message my-message">' +
            message.message + '</div></li>'
            $('.message_holder ul').append(text);
        }
        
        // add the element to the screen with the data that was recieved from 
        // the server with the message 
        // $('div.message_holder').append('<div><b style="color: #000">' +
        //     message.username + '</b> ' + message
        //     .message + ' ' + message.time + '</div>');
    }
})

// References

// Alla, S. (2018, May 26). Building your first Chat Application using Flask in 
// 7 minutes. codeburst. Retrieved March 27, 2022, from 
// https://codeburst.io/building-your-first-chat-application-using-flask-in-7-
// minutes-f98de4adfa5d
// Arora, T. (2021, March 23). Building a Video Chat App with Node.js + 
// Socket.io + WebRTC. Level Up Coding. Retrieved March 20, 2022, from 
// https://levelup.gitconnected.com/building-a-video-chat-app-with-node-js-socket-
// io-webrtc-26f46b213017
// Emmanuel, F. (2021, November 8). How to Build a Realtime Group Chat 
// Application with React and Socket.io. DEV Community ‍ ‍. Retrieved March 
// 20, 2022, from 
// https://dev.to/divofred/how-to-build-a-realtime-group-chat-application-with-
// react-and-socketio-2jf0
// Eseme, S. (2021, January 25). Build a real-time chat app with Vuejs, 
// socket.IO, and Nodejs. Mastering Backend. Retrieved March 20, 2022, 
// from https://masteringbackend.com/posts/build-a-real-time-chat-app-with-vuejs-
// socket-io-and-nodejs/
// h_mobarakian. (2021, June 13). Create simple voice chat app with nodejs. 
// DEV Community ‍ ‍. Retrieved March 20, 2022, from 
// https://dev.to/hosseinmobarakian/create-simple-voice-chat-app-with-nodejs-1b70
// Nayak, A. (2021, July 19). How to Build a Chat App with ReactJS, NodeJS, 
// and Socket.IO? Bacancy Technology. Retrieved March 20, 2022, from 
// https://www.bacancytechnology.com/blog/how-to-build-a-chat-app
// Njoroge, E. (2021, May 5). Creating a Real Time Chat App using React and 
// Socket IO with E2E Encryption. Section.io. Retrieved March 20, 2022, from 
// https://www.section.io/engineering-education/creating-a-real-time-chat-app-
// with-react-socket-io-with-e2e-encryption/
// Safak. (2021, May 26). React Instant Chat App Using Node.js and Socket.io. 
// DEV Community ‍ ‍. Retrieved March 20, 2022, from https://dev.to/safak/react-
// instant-chat-app-using-node-js-and-socket-io-5c7k
// Wargowski, M., & Gold, N. (2019, November 26). How to write a video chat 
// app using WebRTC Node.js. The Software House. Retrieved March 20, 2022, 
// from https://tsh.io/blog/how-to-write-video-chat-app-using-webrtc-and-nodejs/