const path =require('path');
const  http = require('http');
const socketIO = require('socket.io');
const express = require('express');

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

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            careateAt:new Date().getTime()
        });
    });
    // socket.on('createEmail',(newEmail)=>{
    //     console.log('createEmail',newEmail);
    // });

    // socket.on('disconnect', ()=>{
    //     console.log('User was disconnected!');
    // });
});
server.listen(port, ()=> {
    console.log(`Server in up on ${port}`);
});