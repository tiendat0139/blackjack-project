const express = require('express');
const cors = require('cors');
const bodyParser = require ('body-parser');

const myCasinoController = require('./controllers/MyCasinoController');
const AuthController =  require('./controllers/AuthController');
const dbConnection = require('./config/database');
const mysql = require("mysql");

// const usersRouter = require('./routes/usersRouter');

require("dotenv").config();

const app = express();
const PORT = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.post('/login', AuthController); //login
app.post('/register', AuthController); //register

app.post('/my-casino', myCasinoController); //retrieve data from database to MyCasino screen
app.post('/my-casino/upgrade', myCasinoController); //upgrade casino level and update the database
const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "blackjack",
  port: process.env.DB_PORT || "3306",
});

app.get("/my-casino", (req, res) => {
  dbConnection.query("SELECT * from users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Retrieved from database successfully! Code: 001");
      res.send(result);
    }
  });
});

app.get("/store", (req, res) => {
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

app.get("/store/category/:id", (req, res) => {
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

app.get("/category", (req, res) => {
  dbConnection.query("SELECT * from categories", (err, result) => {
    if (err) {
      console.log("Can't retrieve");
    } else {
      console.log("Retrieved from database successfully! Code: 001");
      res.send(result);
    }
  });
});

dbConnection.connect((err) => {
  if (err) {
    console.log("Error occured while connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + dbConnection.threadId);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});

module.exports.app = app;
module.exports.dbConnection = dbConnection;
