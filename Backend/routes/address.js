const express = require('express');
const router = express.Router();
const connection = require('../db');

// 주소록 추가
router.post('/:event_id', (req, res) => {
   const { address_email, address_name, address_position } = req.body;
   const event_id = req.params.event_id;

   connection.beginTransaction((err) => {
       if (err) {
           console.error('트랜잭션 시작 오류:', err);
           return res.status(500).json({ message: '서버 내부 오류' });
       }

       // 이벤트 존재 여부 확인
       connection.query(
           'SELECT EVENT_ID FROM Event WHERE EVENT_ID = ?',
           [event_id],
           (err, eventResults) => {
               if (err) {
                   return connection.rollback(() => {
                       console.error('이벤트 조회 중 오류:', err);
                       res.status(500).json({ message: '서버 내부 오류' });
                   });
               }

               if (eventResults.length === 0) {
                   return connection.rollback(() => {
                       res.status(404).json({ message: '존재하지 않는 이벤트입니다.' });
                   });
               }

               // 이메일 중복 체크
               connection.query(
                   'SELECT * FROM Address WHERE ADDRESS_EMAIL = ?',
                   [address_email],
                   (err, existingResults) => {
                       if (err) {
                           return connection.rollback(() => {
                               console.error('이메일 중복 확인 중 오류:', err);
                               res.status(500).json({ message: '서버 내부 오류' });
                           });
                       }

                       if (existingResults.length > 0) {
                           return connection.rollback(() => {
                               res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
                           });
                       }

                       // 주소록 추가
                       connection.query(
                           'INSERT INTO Address (EVENT_ID, ADDRESS_EMAIL, ADDRESS_NAME, ADDRESS_POSITION) VALUES (?, ?, ?, ?)',
                           [event_id, address_email, address_name, address_position],
                           (err, results) => {
                               if (err) {
                                   return connection.rollback(() => {
                                       console.error('주소록 추가 중 오류:', err);
                                       res.status(500).json({ message: '서버 내부 오류' });
                                   });
                               }

                               connection.commit((err) => {
                                   if (err) {
                                       return connection.rollback(() => {
                                           console.error('커밋 중 오류:', err);
                                           res.status(500).json({ message: '서버 내부 오류' });
                                       });
                                   }
                                   res.status(201).json({
                                       message: '주소록이 추가되었습니다.',
                                       data: { event_id, address_email, address_name, address_position }
                                   });
                               });
                           }
                       );
                   }
               );
           }
       );
   });
});

// 주소록 조회
router.get('/:event_id', (req, res) => {
   const event_id = req.params.event_id;
   
   // 이벤트 존재 여부 확인
   connection.query(
       'SELECT EVENT_ID FROM Event WHERE EVENT_ID = ?',
       [event_id],
       (err, eventResults) => {
        console.log('이벤트 조회 결과:', eventResults); //로그추가
           if (err) {
               console.error('이벤트 조회 중 오류:', err);
               return res.status(500).json({ message: '서버 내부 오류' });
           }

           if (eventResults.length === 0) {
               return res.status(404).json({ message: '존재하지 않는 이벤트입니다.' });
           }

           // 해당 이벤트의 주소록만 조회
           connection.query(
               'SELECT * FROM Address WHERE EVENT_ID = ?',
               [event_id],
               (err, addresses) => {
                   if (err) {
                       console.error('주소록 조회 중 오류:', err);
                       return res.status(500).json({ message: '서버 내부 오류' });
                   }

                   res.status(200).json({
                       message: '주소록 조회 성공',
                       data: addresses
                   });
               }
           );
       }
   );
});

// 주소록 삭제
router.delete('/:event_id', (req, res) => {
   const event_id = req.params.event_id;
   const { address_email } = req.body;
   
   connection.beginTransaction((err) => {
       if (err) {
           console.error('트랜잭션 시작 오류:', err);
           return res.status(500).json({ message: '서버 내부 오류' });
       }

       // 이벤트 존재 여부 확인
       connection.query(
           'SELECT EVENT_ID FROM Event WHERE EVENT_ID = ?',
           [event_id],
           (err, eventResults) => {
               if (err) {
                   return connection.rollback(() => {
                       console.error('이벤트 조회 중 오류:', err);
                       res.status(500).json({ message: '서버 내부 오류' });
                   });
               }

               if (eventResults.length === 0) {
                   return connection.rollback(() => {
                       res.status(404).json({ message: '존재하지 않는 이벤트입니다.' });
                   });
               }

               // 주소록 삭제
               connection.query(
                   'DELETE FROM Address WHERE EVENT_ID = ? AND ADDRESS_EMAIL = ?',
                   [event_id, address_email],
                   (err, result) => {
                       if (err) {
                           return connection.rollback(() => {
                               console.error('주소록 삭제 중 오류:', err);
                               res.status(500).json({ message: '서버 내부 오류' });
                           });
                       }

                       if (result.affectedRows === 0) {
                           return connection.rollback(() => {
                               res.status(404).json({ message: '해당 이메일이 존재하지 않습니다.' });
                           });
                       }

                       connection.commit((err) => {
                           if (err) {
                               return connection.rollback(() => {
                                   console.error('커밋 중 오류:', err);
                                   res.status(500).json({ message: '서버 내부 오류' });
                               });
                           }
                           res.status(200).json({
                               message: '주소록이 삭제되었습니다.',
                               data: { event_id, address_email }
                           });
                       });
                   }
               );
           }
       );
   });
});

module.exports = router;