import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import posts from './routers/posts.js';

const app = express();
const PORT = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

app.use('/posts',posts);

export const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blackjack' //cần tạo database tên là blackjack trước khi chạy server
});
dbConnection.connect((err) => {
    if (err) {
        console.log('Error occured while connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + dbConnection.threadId);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// module.exports = app;