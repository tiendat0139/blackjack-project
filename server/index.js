const express = require('express');
const cors = require('cors');
// const bodyParser = require ('body-parser');
const mysql = require('mysql');
const http = require('http')
const {Server} = require('socket.io')

// const usersRouter = require('./routes/usersRouter');

require('dotenv').config();

const app = express();
const PORT = process.env.port || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));

// const dbConnection = mysql.createConnection({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USERNAME || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.DB_DATABASE || 'employeesystem',
//     port: process.env.DB_PORT || '3306'
// });

// app.get('/my-casino', (req, res) => {
//     dbConnection.query('SELECT * from users', 
//     (err, result) => {
//         if (err){
//             console.log(err);
//         } else {
//             console.log('Retrieved from database successfully! Code: 001');
//             res.send(result);
//         }
//     });
// });


// dbConnection.connect((err) => {
//     if (err) {
//         console.log('Error occured while connecting to database: ' + err.stack);
//         return;
//     }
//     console.log('Connected to database as id ' + dbConnection.threadId);
// });



// Socket.io
const {rooms, addUser, removeUser} = require('./rooms.js')

app.use(cors({
    origin: 'http://localhost3000',
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
    socket.on('join',({roomCode}) => {
        addUser(roomCode, socket.id)
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
