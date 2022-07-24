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

// Socket.io
const {users, addUser, removeUser, addToRoom, removeFromRoom, getRoomData} = require('./users.js')
 
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
    } 
}) 

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on('join',  (username) => {   // join and all-socket has socket.id not equal
        console.log(username)
        addUser(socket.id, username)
        io.emit('all-user', users);
    })
    socket.on('join-room', ({username, roomid}) => { 
        console.log("joining room")
        addToRoom(username, roomid) 
        socket.join(roomid)
        const roomData = getRoomData(roomid)
        io.to(socket.id).emit('all-user', users)
        io.to(roomid).emit('room-data', roomData)
    }) 
    socket.on('out-room',(roomid) => {
        removeFromRoom(socket.id, roomid)
        socket.leave(roomid)
        const roomData = getRoomData(roomid)
        io.to(roomid).emit('room-data', roomData)
    })
    socket.on('send-invite', ({sender, receiverId, roomid}) => {
        io.to(receiverId).emit('invite',{sender, roomid})
    })
    socket.on('duel', (roomid) => {   // join and all-socket has socket.id not equal
        io.to(roomid).emit('enter-duel');
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
