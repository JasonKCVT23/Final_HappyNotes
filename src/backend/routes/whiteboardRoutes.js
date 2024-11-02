const express = require('express');
const router = express.Router();
const whiteboardController = require('../controllers/whiteboardController');

// 獲取所有白板
router.get('/api/whiteboards', whiteboardController.GET);

// 創建新白板
router.post('/api/whiteboards', whiteboardController.POST);

// 更新指定ID的白板
router.put('/api/whiteboards/:id', whiteboardController.PUT);

// 刪除指定ID的白板
router.delete('/api/whiteboards/:id', whiteboardController.DELETE);

module.exports = router;
