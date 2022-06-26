const express = require('express');
const dbConnection  = require('../config/database');

const router = express.Router();

router.get('/my-casino', (req, res) => {
    dbConnection.query('SELECT * from users', 
    (err, result) => {
        if (err){
            res.send({err: err});
            console.log(err);
        } 
        if (result.length > 0){
            console.log('Retrieved data from database successfully! Code: 001');
            res.send(result);
        } else {
            res.send({message: 'User not found!'});
            console.log('User not found! Error code: 001!');
        }
    });
});

router.post('/my-casino/upgrade', (req, res) => {

    dbConnection.query('UPDATE users SET level = ?', [level], 
    (err, result) => {
        if (err){
            res.send({err: err});
            console.log(err);
        }
        if (result) {
            console.log(result);
        }
    });
});

module.exports = router;