const express = require('express');
const dbConnection  = require('../config/database');

const router = express.Router();

router.post('/pve', (req, res) => {

    const user_id = req.body.params.user_id;

    dbConnection.query('SELECT * from users WHERE user_id = ?', [user_id], 
    (err, result) => {
        if (err){
            res.send({err: err});
            console.log(err);
        } 
        if (result.length > 0){
            console.log('A player has just started a game!');
            res.send(result);
        } else {
            res.send({message: 'User not found!'});
            console.log('User not found! Error code: pveController!');
        }
    });
});

router.post('/pve-update', (req, res) => {
    const money = req.body.money;
    const win = req.body.win;
    const lose = req.body.lose;
    const user_id = req.body.user_id;

    dbConnection.query('UPDATE users set money = ?, win = ?, lose = ? where user_id = ?',
    [money, win, lose, user_id],
    (err, result) => {
        if (err){
            res.send({err: err});
            console.log(err);
        }
        res.send(result);
    });
})

module.exports = router;