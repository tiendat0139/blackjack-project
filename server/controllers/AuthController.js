const express = require('express');
const dbConnection = require('../config/database');
const pool = require('../config/databasePostgres');
const router = express.Router();

router.post('/login', (req, res) => {

    console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;

    dbConnection.query('SELECT user_id FROM users where nickname = ? AND password = ?', [username, password],
    (err, result) => {
        if (err) {
            res.send({err: err});
            console.log(err);
        }
        if (result.length > 0) {
            res.send(result);
            console.log(`The player ${username} has just logged in`);
        } else {
            res.send({message: 'Wrong credentials'});
            console.log('A player has just failed to log in.');
        }
    })
});

router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;
    const gender = req.body.gender;
    const age = req.body.age;
    const casinoName = req.body.casinoName;
    const casinoDesc = req.body.casinoDesc;

    const values = [username, password, email, name, gender, age, casinoName, casinoDesc];
    console.log(values);
    dbConnection.query('SELECT nickname from users where nickname = ?',[username],
    (err, result) => {
        if (result.length > 0){
            res.send(false);
        } else {
            dbConnection.query('INSERT INTO users (nickname, password, mail, name, gender, age, casino_name, casino_description) VALUES (?)', [values],
            (err, result) => {
                if (err){
                    console.log(err);
                } else {
                    console.log('Inserted a user into database successfully!');
                    res.send(true);
                }
            });
        }
    }); 
});

module.exports = router;