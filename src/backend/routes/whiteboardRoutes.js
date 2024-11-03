const express = require("express");
const router = express.Router();
const whiteboardController = require("../controllers/whiteboardController");

// 獲取所有白板
router.get("/", whiteboardController.GET);

// Get a whiteboard by ID
router.get("/:id", whiteboardController.GET_BY_ID);

// 創建新白板
router.post("/", whiteboardController.POST);

// 更新指定ID的白板
router.put("/:id", whiteboardController.PUT);

// 刪除指定ID的白板
router.delete("/:id", whiteboardController.DELETE);

module.exports = router;
