const express = require('express');
const dbConnection = require('../config/database');
const router = express.Router();

router.post('/avatar-upload', (req, res) => {

    const image = req.body.image;

    dbConnection.query('UPDATE users SET avatar = ? WHERE user_id = 1', [image], 
    (err, result) => {
        if (result){
            console.log(result);
            res.send('Upload successfully!');
        }
    })
});

router.post('/avatar', (req, res) => {
    
    const user_id = req.body.user_id;
    
    dbConnection.query('SELECT avatar FROM users WHERE user_id = ?', [user_id],
    (err, result) => {
        if(err){
            console.log(err);
        }
        if(result) {
            res.send(result);
        }
    })
})

module.exports = router;