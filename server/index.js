const express = require('express');
const cors = require('cors');
const bodyParser = require ('body-parser'); 

const mysql = require('mysql');
const http = require('http')
const {Server} = require('socket.io')

const myCasinoController = require("./controllers/MyCasinoController");
const AuthController = require("./controllers/AuthController");
const ItemController = require("./controllers/ItemController");
const CategoryController = require("./controllers/CategoryController");
const PVEController = require("./controllers/PvEController")
const UserController = require("./controllers/UserController")
const dbConnection = require("./config/database");


const app = express();
const PORT = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.post("/login", AuthController); //login
app.post("/register", AuthController); //register

app.post("/my-casino", myCasinoController); //retrieve data from database to MyCasino screen
app.post("/my-casino/upgrade", myCasinoController); //upgrade casino level and update the database

app.get("/store", ItemController);
app.get("/store/category/:id", ItemController);
app.get("/category", CategoryController);
app.get("/useritem/:id", ItemController);
app.get("/store/lucky/:id", ItemController);
app.put("/store/lucky", ItemController)
app.post("/pve", PVEController);

app.get("/get-user", UserController)



// Socket.io
const {users, addUser, removeUser, addToRoom, removeFromRoom, getRoomData} = require('./socket/users.js');
const { deal, hitCard, standCard, changePattern } = require('./socket/play-pvp');

app.use(cors({
    origin: 'http://localhost:3000',
    method: ['GET', 'POST', 'PUT'],
    credentials: true
}))
const server = http.createServer(app)
const io = new Server(server, {
    cors:{ 
        origin: 'http://localhost:3000',
        allowedHeaders: ["blackjack-game"],  
        credentials: true 
    },
    allowEIO3: true
})

// io.on("connection", (socket) => {
//     console.log(socket.id)
//     socket.on('join',  (username) => {   // join and all-socket has socket.id not equal
//         console.log(username)
//         addUser(socket.id, username)
//         io.emit('all-user', users);
//     })
//     socket.on('join-room', ({username, roomid}) => {
//         console.log("joining room")
//         addToRoom(username, roomid)
//         socket.join(roomid)
//         const roomData = getRoomData(roomid)
//         io.to(roomid).emit('room-data', roomData)
//     })
//     socket.on('out-room',(roomid) => {
//         removeFromRoom(socket.id, roomid)
//         socket.leave(roomid)
//         const roomData = getRoomData(roomid)
//         io.to(roomid).emit('room-data', roomData)
//     })
//     socket.on('send-invite', ({sender, receiverId, roomid}) => {
//         io.to(receiverId).emit('invite',{sender, roomid})
//     })
// })

io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on('join-room', ({ roomId, user, pattern }) => {
        addToRoom(roomId, user, pattern)
        socket.join(roomId)
        const currentRoom = getRoomData(roomId)
        io.to(socket.id).emit('all-user', users)
        io.to(roomId).emit('room-data', currentRoom)
        console.log(currentRoom);
    })

    socket.on('start-game', ({ roomId }) => {
        const currentRoom = getRoomData(roomId)
        io.to(roomId).emit('room-data', currentRoom)
    })

    socket.on('join',  (user) => {   // join and all-socket has socket.id not equal
        addUser(user, socket.id)
        io.emit('all-user', users);
    })

    socket.on('out-room', ({ userId, roomId }) => {
        removeFromRoom(userId, roomId) 
        socket.leave(roomId)
        const roomData = getRoomData(roomId)
        io.to(roomId).emit('room-data', roomData)
    })
    
    socket.on('send-invite', ({ sender, receiverId, roomId }) => {
        io.to(receiverId).emit('invite',{sender, roomId})
    })

    socket.on('deal', ({ roomCode, cards }) => {
        deal(roomCode, cards)
        const currentRoom = getRoomData(roomCode)
        io.to(roomCode).emit("room-data", currentRoom)
    })

    socket.on('hit-card', ({ roomCode, user, card }) => {
        hitCard(roomCode, user, card)
        const currentRoom = getRoomData(roomCode)
        io.to(roomCode).emit("room-data", currentRoom)
    })

    socket.on('stand-card', ({ roomCode }) => {
        standCard(roomCode)
        const currentRoom = getRoomData(roomCode)
        io.to(roomCode).emit("room-data", currentRoom)
    })

    socket.on('change-pattern', ({ roomCode, user, pattern }) => {
        changePattern(roomCode, user, pattern)
        const currentRoom = getRoomData(roomCode)
        io.to(roomCode).emit("room-data", currentRoom)
    })
    socket.on('disconnect', () => {
        removeUser(socket.id)
        io.emit('all-user', users)
    })
})



server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});


module.exports.app = app;
// module.exports.dbConnection = dbConnection;
