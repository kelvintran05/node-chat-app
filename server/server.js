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

    socket.emit('newEmail',{
        from: 'kelvintran95@gmail.com',
        text: 'Hello!!!',
        createAt: 123
    });

    socket.on('createEmail',(newEmail)=>{
        console.log('createEmail',newEmail);
    });

    socket.on('disconnect', ()=>{
        console.log('User was disconnected!');
    });
});
server.listen(port, ()=> {
    console.log(`Server in up on ${port}`);
});