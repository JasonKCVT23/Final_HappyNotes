const Card = require('../models/Card'); // 引入 Card 模型

// Get all cards
const GET_CARDS = async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cards' });
    }
};

// Create a new card
const POST_CARD = async (req, res) => {
    try {
        const { card_title, content, due_date, tag, fold_or_not, position, dimensions, connection } = req.body;
        const newCard = new Card({
            card_title,
            content,
            due_date,
            tag,
            fold_or_not: false, // 創建時 卡片是展開的狀態
            created_at: new Date(),
            updated_at: new Date(),
            position,
            dimensions,
            connection
        });
        const savedCard = await newCard.save();
        res.status(201).json(savedCard);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create card', details: error.message });
    }
};

// Update a card by ID
const PUT_CARD = async (req, res) => {
    try {
        const { id } = req.params;
        const { card_title, content, due_date, tag, fold_or_not, position, dimensions, connection } = req.body;
        const updatedCard = await Card.findByIdAndUpdate(
            id,
            {
                card_title,
                content,
                due_date,
                tag,
                fold_or_not,
                position,
                dimensions,
                connection,
                updated_at: new Date(),
            },
            { new: true } // Return the updated document
        );
        if (!updatedCard) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.json(updatedCard);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update card', details: error.message });
    }
};

// Delete a card by ID
const DELETE_CARD = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCard = await Card.findByIdAndDelete(id);
        if (!deletedCard) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.json({ message: 'Card deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete card' });
    }
};

module.exports = { GET_CARDS, POST_CARD, PUT_CARD, DELETE_CARD }; // 匯出 Card 控制器函數
