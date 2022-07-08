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

module.exports = router;
