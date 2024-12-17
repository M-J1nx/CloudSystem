const express = require('express');
const router = express.Router();
const connection = require('../db');
const axios = require('axios');
const nodemailer = require('nodemailer');

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

// 전체 주소록 조회
router.get('/', (req, res) => {
    // 전체 주소록 조회 쿼리
    connection.query(
        'SELECT * FROM Address', // 이벤트와 관계 없이 모든 주소록 조회
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

// user id로 내 email 주소 받아오기
router.get('/getemail/:user_id', (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json({message: '잘못된 요청입니다.', mailTitle, mailContent});
    }

    connection.query(
        'SELECT user_email FROM Company WHERE user_id = ?', [user_id],
        (err, results) => {
            if (err) {
                console.error('이메일 조회 중 오류:', err);
                return res.status(500).json({ message: '서버 내부 오류' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: '해당 사용자의 이메일을 찾을 수 없습니다.' });
            }

            // 이메일 주소 반환
            res.status(200).json({
                message: '이메일 주소 조회 성공',
                email: results[0].user_email
            });
        }
    );
})

// 주소록으로 이메일 전송 API
router.post('/sendemail/:event_id', async (req, res) => {
    const { event_id } = req.params;
    const { mailTitle, mailContent, reserveTime, user_id, gmailPassword } = req.body;

    if (!mailTitle || !mailContent) {
        return res.status(400).json({ message: '잘못된 요청입니다.', mailTitle, mailContent });
    }

    try {
        // 전송할 이메일 조회 API 호출
        const emailAddress = await axios.get(`http://localhost:3000/address/${event_id}`);

        if (!emailAddress.data || !emailAddress.data.data || emailAddress.data.data.length === 0) {
            return res.status(404).json({ message: '이메일 주소가 존재하지 않습니다.' });
        }

        // 이메일 주소 리스트 추출
        const emailList = emailAddress.data.data.map((address) => address.ADDRESS_EMAIL);

        // 발신자 이메일 조회 API 호출
        const myemailAddress = await axios.get(`http://localhost:3000/address/getemail/${user_id}`);

        if (!myemailAddress.data.email) {
            return res.status(404).json({ message: '발신자 이메일을 찾을 수 없습니다.' });
        }

        // 이메일 전송을 위한 Nodemailer 설정
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: myemailAddress.data.email,
                pass: gmailPassword,
            },
        });

        const mailOptions = {
            from: myemailAddress.data.user_email,
            to: emailList,
            subject: mailTitle,
            text: mailContent,
            sendAt: reserveTime,
        };

        // 이메일 전송
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: '이메일 전송에 실패했습니다.' });
            }

            // 이메일 전송 성공 시 전송 결과를 데이터베이스에 저장
            const query = `
                INSERT INTO Send (event_id, address_email, send_at, status)
                VALUES (?, ?, ?, ?);
            `;

            try {
                // 이메일 전송 정보를 DB에 저장
                const date = new Date().toISOString().slice(0, 19).replace('T', ' '); // 현재 시간 포맷
                const status = "true"; // 전송 성공 시 true
                for (const email of emailList) {
                    await connection.query(query, [event_id, email, date, status]);
                }

                // 성공 메시지 반환
                res.status(200).json({
                    message: '이메일이 성공적으로 전송되었습니다.',
                    info: {
                        accepted: info.accepted,
                        rejected: info.rejected,
                        envelopeTime: info.envelopeTime,
                        messageTime: info.messageTime,
                        messageSize: info.messageSize,
                        response: info.response,
                        envelope: {
                            from: info.envelope.from,
                            to: info.envelope.to
                        },
                        messageId: info.messageId
                    }
                });
            } catch (dbError) {
                console.error('이메일 전송 결과 저장 실패:', dbError);
                res.status(500).json({ message: '이메일 전송 결과 저장에 실패했습니다.' });
            }
        });

    } catch (error) {
        console.error('이메일 전송 중 오류:', error);
        res.status(500).json({ message: '서버 내부 오류' });
    }
});

// 전체 전송 결과 불러오기
router.get('/send/result', (req, res) => {
    // 이메일 전송 결과와 관련된 event_name을 가져오는 쿼리
    connection.query(
        'SELECT Send.*, Event.event_name FROM Send ' +
        'JOIN Event ON Send.event_id = Event.event_id', // Send와 Event 테이블을 event_id를 기준으로 조인
        (err, result) => {
            if (err) {
                console.error('결과 조회 중 오류:', err);
                return res.status(500).json({ message: '서버 내부 오류' });
            }

            // 데이터 반환
            res.status(200).json({
                message: '결과 조회 성공',
                data: result
            });
        }
    );
});






module.exports = router;