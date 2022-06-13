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

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blackjack' //cần tạo database tên là blackjack trước khi chạy server
});
dbConn.connect();


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// module.exports = app;