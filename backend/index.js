require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Replace with your frontend URL in production
        methods: ['GET', 'POST'],
    },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api', require("./routes/user"))

// In-memory message store
// const messages = [];

// // REST API Routes
// app.get('/api/chat', (req, res) => {
//     res.json(messages);
// });

// app.post('/api/chat', (req, res) => {
//     const { username, text } = req.body;

//     if (!username || !text) {
//         return res.status(400).json({ error: 'Username and text are required' });
//     }

//     const message = { id: Date.now(), username, text, timestamp: new Date() };
//     messages.push(message);
//     res.status(201).json(message);
// });

// Socket.io for real-time communication
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send existing messages to the newly connected user
    socket.emit('chatHistory', messages);

    // Handle incoming messages
    socket.on('sendMessage', (message) => {
        const chatMessage = { id: Date.now(), ...message, timestamp: new Date() };
        messages.push(chatMessage);

        // Broadcast the message to all connected clients
        io.emit('receiveMessage', chatMessage);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));