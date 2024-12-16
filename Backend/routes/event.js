const express = require('express');
const router = express.Router();
const connection = require('../db');

// 이벤트 생성
router.post('/', (req, res) => {
    const { user_id, event_name } = req.body;

    const query = 'INSERT INTO Event (USER_ID, EVENT_NAME) VALUES (?, ?)';
    
    connection.query(query, [user_id, event_name], (err, results) => {
        if (err) {
            console.error('이벤트 생성 중 오류:', err);
            return res.status(500).json({ message: '서버 내부 오류' });
        }

        res.status(201).json({ 
            message: '이벤트가 생성되었습니다.',
            event_id: results.insertId,
            data: { user_id, event_name }
        });
    });
});

// 이벤트 조회
router.get('/:event_id', (req, res) => {
    const event_id = req.params.event_id;
    
    const query = 'SELECT * FROM Event WHERE EVENT_ID = ?';
    connection.query(query, [event_id], (err, results) => {
        if (err) {
            console.error('이벤트 조회 중 오류:', err);
            return res.status(500).json({ message: '서버 내부 오류' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: '존재하지 않는 이벤트입니다.' });
        }

        res.status(200).json({
            message: '이벤트 조회 성공',
            data: results[0]
        });
    });
});

module.exports = router;