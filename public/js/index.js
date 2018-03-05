var socket = io();

socket.on('connect',()=>{
    console.log('Connected to server');

    socket.emit('createEmail',{
        to:'dat@gmail.com',
        text: 'Hey.This is kelvin'
    });
});

socket.on('disconnect',()=> {
    console.log("Disconnected from server");
});

socket.on('newEmail', (email)=>{
    console.log('New email',email);
});