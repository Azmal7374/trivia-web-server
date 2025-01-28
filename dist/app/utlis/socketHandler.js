"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = socketHandler;
function socketHandler(io) {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        // Handle user joining a room
        socket.on('joinRoom', ({ roomCode, userName }) => {
            socket.join(roomCode);
            // Broadcast to the room that a user has joined
            io.to(roomCode).emit('userJoined', { userName, action: 'joined' });
            console.log(`${userName} joined room ${roomCode}`);
        });
        // Handle sending and receiving chat messages
        socket.on('chatMessage', ({ roomId, user, text }) => {
            if (!user || !text) {
                console.log('Error: Missing user or text in message.');
                return;
            }
            // Emit message to everyone in the room
            io.to(roomId).emit('newMessage', { user, text });
            console.log(`${user} in ${roomId}: ${text}`);
        });
        // Handle starting the quiz
        socket.on('startQuiz', ({ roomId }) => {
            console.log(`Quiz started in room ${roomId}`);
            io.to(roomId).emit('startQuiz');
        });
        socket.on('resetQuiz', (data) => {
            const { roomId } = data;
            io.to(roomId).emit('startQuiz');
        });
        // Handle user leaving a room
        socket.on('leaveRoom', ({ roomCode, userName }) => {
            socket.leave(roomCode);
            io.to(roomCode).emit('userLeft', { userName, action: 'left' });
            console.log(`${userName} left room ${roomCode}`);
        });
        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
}
