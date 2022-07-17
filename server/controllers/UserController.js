const express = require('express');
const dbConnection  = require('../config/database');

const router = express.Router();

router.get('/get-user', (req, res) => {

    console.log("req: ", req);

    const user_id = req.query?.user_id;

    dbConnection.query('SELECT * from users WHERE user_id = ?', [user_id], 
    (err, result) => {
        if (err){
            res.send({err: err});
            console.log(err);
        } 
        if (result){
            res.send(result);
        } else {
            res.send({message: 'User not found!'});
            console.log('User not found! Error code: myCasinoController!');
        }
    });
});

module.exports = router