const mysql = require('mysql');
require('dotenv').config();

const dbConnectionInfo = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "blackjack",
  port: process.env.DB_PORT || "3306",
};

const dbConnection = mysql.createPool(
    dbConnectionInfo
)

dbConnection.on('connection', function (connection) {
    console.log('Database connection established');
  
    connection.on('error', function (err) {
      console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function (err) {
      console.error(new Date(), 'MySQL close', err);
    });
  
  });

module.exports = dbConnection;
