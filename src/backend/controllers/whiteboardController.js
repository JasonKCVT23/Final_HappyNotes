const Whiteboard = require('../models/Whiteboard'); // 引入 Whiteboard 模型

// Get all whiteboards
const GET = async (req, res) => {
    try {
      const boards = await Whiteboard.find();
      res.json(boards);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch whiteboards' });
    }
};
  
// Create a new whiteboard
const POST = async (req, res) => {
    try {
        const { whiteboardTitle, isPrivate, userId, position, dimensions, cards } = req.body;
        const newBoard = new Whiteboard({
            whiteboardTitle,
            isPrivate,
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            position,
            dimensions,
            cards,
        });
        const savedBoard = await newBoard.save();
        res.status(201).json(savedBoard);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create whiteboard', details: error.message });
    }
};

// Update a whiteboard by ID
const PUT = async (req, res) => {
    try {
        const { id } = req.params;
        const { whiteboardTitle, isPrivate, position, dimensions, cards } = req.body;
        const updatedBoard = await Whiteboard.findByIdAndUpdate(
            id,
            {
                whiteboardTitle,
                isPrivate,
                position,
                dimensions,
                cards,
                updatedAt: new Date(),
            },
            { new: true } // Return the updated document
        );
        if (!updatedBoard) {
            return res.status(404).json({ error: 'Whiteboard not found' });
        }
        res.json(updatedBoard);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update whiteboard', details: error.message });
    }
};

// Delete a whiteboard by ID
const DELETE = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBoard = await Whiteboard.findByIdAndDelete(id);
        if (!deletedBoard) {
        return res.status(404).json({ error: 'Whiteboard not found' });
        }
        res.json({ message: 'Whiteboard deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete whiteboard' });
    }
};

module.exports = { GET, POST, PUT, DELETE }; // 匯出控制器函數