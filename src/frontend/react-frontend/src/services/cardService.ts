// cardService.ts - Service for handling card data

import { CardData } from '@/interfaces/Card/CardData';

const API_BASE_URL = 'http://localhost:3000/api/cards'; // according to your backend API

// GET /api/cards - Get all cards
export const getAllCards = async (): Promise<CardData[]> => {
    const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch cards');
    }
    
    const data: CardData[] = await response.json();
    return data;
};

// POST /api/cards - Create a new card
export const createCard = async (card: Omit<CardData, '_id'>): Promise<CardData> => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create card');
    }

    const data: CardData = await response.json();
    return data;
};

// PUT /api/cards/:id - update the card with the specified ID
export const updateCard = async (id: string, card: Partial<CardData>): Promise<CardData> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update card');
    }

    const data: CardData = await response.json();
    return data;
};

// DELETE /api/cards/:id - delete the card with the specified ID
export const deleteCard = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete card');
    }

    return;
};
