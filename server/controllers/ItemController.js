const express = require("express");
const dbConnection = require("../config/database");

const router = express.Router();

router.get("/store", (req, res) => {
  dbConnection.query(
    "SELECT * from items LEFT JOIN categories on items.category_id = categories.category_id",
    (err, result) => {
      if (err) {
        console.log("Can't retrieve");
      } else {
        console.log("Retrieved from database successfully! Code: 001");
        res.send(result);
      }
    }
  );
});
router.get("/store/category/:id", (req, res) => {
  dbConnection.query( 
    `SELECT * from items LEFT JOIN categories on items.category_id = categories.category_id WHERE items.category_id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log("Can't retrieve");
      } else {
        console.log("Retrieved from database successfully! Code: 001");
        res.send(result);
      }
    }
  );
});

router.get("/useritem/:id", (req, res) => {
  dbConnection.query(
    `SELECT * from users LEFT JOIN users_items on users.user_id = users_items.user_id LEFT JOIN items on users_items.item_id = items.item_id WHERE users.user_id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log("Can't retrieve user item");
      } else {
        console.log("Retrieved from database successfully! Code: 001");
        res.send(result);
      }
    }
  );
});
router.get("/store/lucky/:id", (req, res) => {
  dbConnection.query(
    `SELECT number from items join users_items on items.item_id = users_items.item_id 
    where user_id = ${req.params.id} and items.item_name = 'Lucky wheel ticket'`,
    (err, result) => {
      if(err){
        console.log("Can't retrieve user item");
      } else {
        console.log("Retrieved from database successfully! Code: 001");
        res.send(result)
      }
    }
  );
});
router.put("/store/lucky", (req, res) => {
  dbConnection.query(
      `UPDATE users_items 
      SET number = ${req.body.number}
      WHERE user_id = ${req.body.userid} and item_id = 4`,
    (err, result) => {
      if(err){
        console.log("Can't retrieve user item");
      } else {
        console.log("Retrieved from database successfully! Code: 001");
        res.send(result)
      }
    }
  );
});

module.exports = router; 
