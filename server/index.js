const express = require('express');
const cors = require('cors');
const bodyParser = require ('body-parser');
const mysql = require('mysql');

const posts = require('./routes/posts');
const { deck } = require('./shuffleDeck');
const { shuffle } = require('./shuffleDeck');
require('dotenv').config();

const app = express();
const PORT = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

// app.get("/deck", (req, res) => {
//     shuffle(deck);
//     res.json(deck);
// });

const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'employeesystem',
    port: process.env.DB_PORT || '3306'
});

// app.post('/create', (req, res) => {
//     const name = req.body.name;
//     const age = req.body.age;
//     const country = req.body.country;
//     const position = req.body.position;
//     const wage = req.body.wage;

//     dbConnection.query('INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)', 
//     [name, age, country, position, wage], 
//     (err, result) => {
//         if (err){
//             console.log(err);
//         } else {
//             res.send("Values Inserted");
//         }
//     });
// });


dbConnection.connect((err) => {
    if (err) {
        console.log('Error occured while connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + dbConnection.threadId);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});


module.exports = app;
