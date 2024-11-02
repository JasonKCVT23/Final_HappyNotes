const mongoose = require('../config/db');

// Define the Card Schema
const cardSchema = new mongoose.Schema({
    card_title: String,
    content: mongoose.Schema.Types.Mixed,
    due_date: Date,
    tag: String,
    fold_or_not: Boolean,
    created_at: Date,
    updated_at: Date,
    position: {
        x: Number,
        y: Number,
    },
    dimensions: {
        width: Number,
        height: Number,
    },
    connection: [{
        to_note_id: mongoose.Schema.Types.ObjectId,
        position: Number //0:上, 1:右, 2:下, 3:左
    }],
    connectionBy: [{
        to_note_id: mongoose.Schema.Types.ObjectId,
        position: Number //0:上, 1:右, 2:下, 3:左
    }],
    comment:[string]
});

// Create the Card Model
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;