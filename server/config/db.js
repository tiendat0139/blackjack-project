import mysql from 'mysql';

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
//có thể sẽ không dùng file này
