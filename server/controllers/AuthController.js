const express = require('express');
const dbConnection = require('../config/database');
const router = express.Router();

router.post('/login', (req, res) => {
    console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;

    dbConnection.query('SELECT * FROM users where nickname = ? AND password = ?', [username, password],
    (err, result) => {
        if (err) {
            res.send({err: err});
            console.log(err);
        }
        if (result) {
            res.send(result);
            console.log(`The player ${username} has just logged in`);
        } else {
            res.send({message: 'Wrong credentials'});
            console.log('A player has just failed to log in.');
        }
    })
});

router.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    console.log(`A player has just signed in with ${username, password, email}!`);

    dbConnection.query('INSERT TO users (nickname, password, email) VALUES(?,?,?)',
    (err, result) => {
        if (err){
            console.log(err);
            res.send({err: err});
        } else {
            console.log('Inserted a user into database successfully!');
        }
    })
});

module.exports = router;