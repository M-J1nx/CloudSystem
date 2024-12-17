const express = require('express');
const router = express.Router();
const connection = require('../db'); 

// 회원가입 API
router.post('/signup', (req, res) => {
    const { id, password, name, email } = req.body;

    const query = 'INSERT INTO Company (user_id, user_pw, user_name, user_email) VALUES (?, ?, ?, ?)';
    
    connection.query(query, [id, password, name, email], (err, results) => {
        if (err) {
            console.error('계정 생성 중 오류:', err);
            return res.status(500).json({ message: '서버 내부 오류' });
        }

        res.status(201).json({ message: '계정이 성공적으로 생성되었습니다.'});
    });
});

// 로그인 API
router.get('/login', (req, res) => {
    const { id, password } = req.query;

    if (!id || !password) {
        return res.status(400).json({ message: '아이디와 비밀번호를 입력해주세요.' });
    }

    const query = 'SELECT * FROM Company WHERE user_id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('로그인 중 오류:', err);
            return res.status(500).json({ message: '서버 내부 오류' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: '존재하지 않는 계정입니다.' });
        }

        const user = results[0];  
        if (user.user_pw !== password) {
            return res.status(400).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
        }

        res.status(200).json({ message: '로그인 성공', userId: user.id });
    });
});

module.exports = router;
