const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const { DATABASE_URL, PORT } = require('./env');


const port = PORT || 3001;

const connection = mysql.createConnection({
    host: DATABASE_URL,
    user: 'admin',
    password: 'cloudsystem',
    database: 'cloudsystem'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database successfully');
});


app.use(cors());
app.use(express.json());

app.post('/account/signup', (req, res) => {
    const { id, password, name, email } = req.body;

    // DB 연결 가져오기
    const query = 'INSERT INTO accounts (id, password, name, email) VALUES (?, ?, ?, ?)';

    connection.query(query, [id, password, name, email], (err, results) => {
        if (err) {
            console.error('계정 생성 중 오류:', err);
            return res.status(500).json({ message: '서버 내부 오류' });
        }

        res.status(201).json({ message: '계정이 성공적으로 생성되었습니다.', id: results.insertId });
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});