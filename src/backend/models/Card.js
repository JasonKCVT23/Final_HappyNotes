const mongoose = require('../config/db');

// Define the Card Schema
const cardSchema = new mongoose.Schema({
    cardTitle: String,
    content: mongoose.Schema.Types.Mixed,
    dueDate: Date,
    tag: String,
    foldOrNot: Boolean,
    createdAt: Date,
    updatedAt: Date,
    comment: [String],
    position: {
        x: Number,
        y: Number,
    },
    dimensions: {
        width: Number,
        height: Number,
    },
    connection: [{
        toNoteId: mongoose.Schema.Types.ObjectId,
        position: Number // 0:上, 1:右, 2:下, 3:左
    }],
    connectionBy: [{
        toNoteId: mongoose.Schema.Types.ObjectId,
        position: Number // 0:上, 1:右, 2:下, 3:左
    }],
    
});

// Create the Card Model
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;