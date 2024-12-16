const mysql = require('mysql');
const { DATABASE_URL } = require('./env');

// MySQL 연결 설정
const connection = mysql.createConnection({
    host: DATABASE_URL,
    user: 'admin',
    password: 'cloudsystem',
    database: 'cloudsystem'
});

// DB 연결
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database successfully');
});

module.exports = connection;
