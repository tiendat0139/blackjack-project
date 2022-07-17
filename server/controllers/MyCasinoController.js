const express = require('express');
const dbConnection  = require('../config/database');

const router = express.Router();

router.post('/my-casino', (req, res) => {

    const user_id = req.body.params.user_id;

    dbConnection.query('SELECT * from users WHERE user_id = ?', [user_id], 
    (err, result) => {
        if (err){
            res.send({err: err});
            console.log(err);
        } 
        if (result.length > 0){
            console.log('Retrieved data from database successfully! Code: myCasinoController');
            res.send(result);
        } else {
            res.send({message: 'User not found!'});
            console.log('User not found! Error code: myCasinoController!');
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