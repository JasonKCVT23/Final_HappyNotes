const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController'); 

// 獲取所有卡片
router.get('/api/cards', cardController.GET_CARDS);

// 創建新卡片
router.post('/api/cards', cardController.POST_CARD);

// 更新指定ID的卡片
router.put('/api/cards/:id', cardController.PUT_CARD);

// 刪除指定ID的卡片
router.delete('/api/cards/:id', cardController.DELETE_CARD);

module.exports = router;