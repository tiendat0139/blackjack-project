const express = require("express");
const dbConnection = require("../config/database");

const router = express.Router();

router.get("/category", (req, res) => {
  dbConnection.query("SELECT * from categories", (err, result) => {
    if (err) {
      console.log("Can't retrieve");
    } else {
      console.log("Retrieved from database successfully! Code: 001");
      res.send(result);
    }
  });
});

module.exports = router;
