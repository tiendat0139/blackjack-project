const express = require('express');
const dbConnection  = require('../config/database');

const router = express.Router();

router.get('/get-user', (req, res) => {
    const user_id = req.query.user_id;

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

router.post('/update-win', (req, res) => {
    const user_id = req.body.user_id
    const newCoin = req.body.newCoin

    let oldWin

    dbConnection.query(`update users set money = ${newCoin} where user_id = ${user_id}`,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result) {
                console.log("Cập nhật số dư thành công!");
            }
        }
    )

    dbConnection.query('select win from users where user_id = ?', [user_id],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result) {
                oldWin = result[0].win
                const sql = `update users set win = ${oldWin + 1} where user_id = ${user_id}`
                dbConnection.query(sql,
                    (err, result) => {
                        if (err) {
                            res.send({ err: err })
                            console.log(err);
                        }
                        if (result) {
                            res.send(result)
                            console.log("Update win ok!");
                        } else {
                            res.send({ message: "Update win failured!" })
                            console.log("Update win failured!");
                        }
                })
            } else {
                console.log("Wrong something!");
            }
        })
    
    
})

router.post('/update-lose', (req, res) => {
    const user_id = req.body.user_id
    const newCoin = req.body.newCoin

    let oldLose

    dbConnection.query(`update users set money = ${newCoin} where user_id = ${user_id}`,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result) {
                console.log("Cập nhật số dư thành công!");
            }
        }
    )

    dbConnection.query('select lose from users where user_id = ?', [user_id],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result) {
                oldLose = result[0].lose
                const sql = `update users set lose = ${oldLose + 1} where user_id = ${user_id}`
                dbConnection.query(sql,
                    (err, result) => {
                        if (err) {
                            res.send({ err: err })
                            console.log(err);
                        }
                        if (result) {
                            res.send(result)
                            console.log("Update lose ok!");
                        } else {
                            res.send({ message: "Update lose failured!" })
                            console.log("Update lose failured!");
                        }
                })
            } else {
                console.log("Wrong something!");
            }
        })
})

module.exports = router