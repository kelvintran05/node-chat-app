var socket = io();

socket.on('connect',()=>{
    console.log('Connected to server');

    // socket.emit('createEmail',{
    //     to:'dat@gmail.com',
    //     text: 'Hey.This is kelvin'
    // });

    // socket.emit('createMessage',{
    //     from:'Andrew',
    //     text:'Yup, that works for me.'
    // });
});

socket.on('disconnect',()=> {
    console.log("Disconnected from server");
});

socket.on('newMessage',(message)=>{
    console.log('newMessage',message);
});

// socket.on('newEmail', (email)=>{
//     console.log('New email',email);
// });