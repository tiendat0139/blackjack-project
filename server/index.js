const express = require('express');
const cors = require('cors');
const bodyParser = require ('body-parser'); 

const mysql = require('mysql');
const http = require('http')
const {Server} = require('socket.io')

const myCasinoController = require('./controllers/MyCasinoController');
const AuthController =  require('./controllers/AuthController');
const dbConnection = require('./config/database');


const app = express();
const PORT = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' })); 
app.use(cors());

app.post('/login', AuthController); //login
app.post('/register', AuthController); //register

app.get('/my-casino', myCasinoController); //retrieve data from database to MyCasino screen
app.post('/my-casino/upgrade', myCasinoController); //upgrade casino level and update the database



// Socket.io
const {rooms, addUser, removeUser} = require('./rooms.js')

app.use(cors({
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
    credentials: true
}))
const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin: 'http://localhost:3000',
        allowedHeaders: ["blackjack-game"],
        credentials: true
    }
})
io.on("connection", (socket) => {
    socket.on('join',({roomCode, username}) => {
        addUser(roomCode, socket.id, username)
        socket.join(roomCode)
        const currentRoom = rooms[roomCode]
        io.to(roomCode).emit('room-data', currentRoom)
    })
    socket.on('disconnect', () => {
        removeUser(socket.id)
    })
})


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});


module.exports.app = app;
// module.exports.dbConnection = dbConnection;
