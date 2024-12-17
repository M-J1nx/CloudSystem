const express = require('express');
const router = express.Router();
const connection = require('../db'); 

// 템플릿 생성 API
router.post('/', (req, res) => {
    const { templateName, mailContent } = req.body;

    const query = 'INSERT INTO Template (template_name, mail_content) VALUES (?, ?)';
    
    connection.query(query, [templateName, mailContent], (err) => {
        if (err) {
            console.error('템플릿 생성 중 오류:', err);
            return res.status(500).json({ message: '서버 내부 오류' });
        }

        res.status(201).json({ message: '템플릿이 성공적으로 생성되었습니다.'});
    });
});

// 템플릿 불러오기 API
router.get('/:template_name', (req, res) => {
    const { template_name } = req.params;

    if (!template_name) {
        return res.status(400).json({ message: '올바른 템플릿을 조회해주세요.' });
    }

    const query = 'SELECT * FROM Template WHERE template_name = ?';

    connection.query(query, [template_name], (err, results) => {
        if (err) {
            console.error('불러오기 중 오류:', err);
            return res.status(500).json({ message: '서버 내부 오류' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: '존재하지 않는 템플릿입니다.' });
        }

        const template = results[0];

        // 템플릿 정보와 함께 이미지 데이터 전송
        return res.status(200).json({
            templateName: template.template_name,
            mailContent: template.mail_content,
            mailImage: template.mail_image 
        });
    });
});

// 템플릿 목록 불러오기
router.get('/list/result', (req, res) => {
    const query = 'SELECT * FROM Template';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('불러오기 중 오류:', err);
            return res.status(500).json({ message: '서버 내부 오류' });
        }

        return res.status(200).json(
            results.map(template => ({
                id: template.template_id,
                templateName: template.template_name,
                mailContent: template.mail_content,
            }))
        );
    });
});

// 템플릿 수정 API
router.put('/:templateName/edit', (req, res) => {
    const { templateName } = req.params; // 기존 템플릿 이름 (URL에서 추출)
    const { mailContent, mailImage } = req.body; // 새로 받은 데이터

    const findIdQuery = 'SELECT template_id FROM Template WHERE template_name = ?';
    connection.query(findIdQuery, [templateName], (err, results) => {
        if (err) {
            console.error('템플릿 조회 중 오류:', err);
            return res.status(500).json({ message: '서버 내부 오류' });
        }

        if (results.length === 0) {
            console.log("No template found with name:", templateName);
            return res.status(400).json({ message: '존재하지 않는 템플릿입니다.' });
        }

        const templateId = results[0].template_id; // 기존 템플릿 ID
        console.log("Found templateId:", templateId);

        const updateQuery = `
            UPDATE Template 
            SET template_name = ?, mail_content = ?, mail_image = ?
            WHERE template_id = ?`;

        connection.query(updateQuery, [templateName, mailContent, mailImage, templateId], (err, updateResults) => {
            if (err) {
                console.error('템플릿 수정 중 오류:', err);
                return res.status(500).json({ message: '서버 내부 오류' });
            }

            if (updateResults.affectedRows === 0) {
                console.log("No rows affected for templateId:", templateId);
                return res.status(400).json({ message: '템플릿 수정에 실패했습니다.' });
            }

            console.log("Template updated successfully for templateId:", templateId);
            return res.status(200).json({ message: '템플릿이 성공적으로 수정되었습니다.' });
        });
    });
});




// 이미지 처리를 위한 multer 사용
const multer = require('multer');
const path = require('path');

// multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });

// 템플릿에 이미지 추가하는 API
router.post('/image', upload.single('image'), (req, res) => {
    const { id } = req.body;

    // 업로드된 파일 경로 확인
    if (!id || !req.file) {
        return res.status(400).json({ message: 'ID와 이미지를 제공해주세요.' });
    }

    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`; 

    const query = 'UPDATE Template SET mail_image = ? WHERE template_id = ?';
    connection.query(query, [imageUrl, id], (err) => {
        if (err) {
            console.error('이미지 저장 중 오류:', err);
            return res.status(500).json({ message: '이미지 저장 중 오류 발생' });
        }

        res.status(200).json({ message: '이미지가 성공적으로 저장되었습니다.', imageUrl });
    });
});

module.exports = router;
