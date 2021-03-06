const path =require('path');
const  http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const {generateMessage}  = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection',(socket) => {
    console.log('New user connected!');

    // socket.emit('newEmail',{
    //     from: 'kelvintran95@gmail.com',
    //     text: 'Hello!!!',
    //     createAt: 123
    // });

    // socket.emit('newMessage',{
    //     from: 'kelvin',
    //     text:'See you then',
    //     createAt:1234
    // });

    // //socket.emit from Admin text Welcome to the chat app
    // socket.emit('newMessage',{
    //     from:'Admin',
    //     text:'Welcome to the chat app'
    // });

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));
    // //socket.broadcast.emit from Admin text New user joined
    // socket.broadcast.emit('newMessage',{
    //     from:'Admin',
    //     text: 'New user joined',
    //     createAt: new Date().getTime()
    // });

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
        // io.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createAt:new Date().getTime()
        // });
        io.emit('newMessage',generateMessage(message.from, message.text));
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt:new Date().getTime()
        // });
    });
    // socket.on('createEmail',(newEmail)=>{
    //     console.log('createEmail',newEmail);
    // });

    socket.on('disconnect', ()=>{
        console.log('User was disconnected!');
    });
});
server.listen(port, ()=> {
    console.log(`Server in up on ${port}`);
});