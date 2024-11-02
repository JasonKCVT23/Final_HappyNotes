// frontend/src/services/whiteboardService.ts

import { WhiteboardData } from '../interfaces/WhiteboardData';

const API_BASE_URL = 'http://localhost:3000/api/whiteboards'; // according to your backend API

export const getAllWhiteboards = async (): Promise<WhiteboardData[]> => {
    const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch whiteboards');
    }

    const data: WhiteboardData[] = await response.json();
    return data;
};

export const getWhiteboardById = async (id: string): Promise<WhiteboardData> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch whiteboard');
    }

    const data: WhiteboardData = await response.json();
    return data;
};

export const createWhiteboard = async (
    whiteboard: Omit<WhiteboardData, 'id' | 'cards'>
): Promise<WhiteboardData> => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(whiteboard),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create whiteboard');
    }

    const data: WhiteboardData = await response.json();
    return data;
};

export const updateWhiteboard = async (
    id: string,
    whiteboard: Partial<WhiteboardData>
): Promise<WhiteboardData> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(whiteboard),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update whiteboard');
    }

    const data: WhiteboardData = await response.json();
    return data;
};


export const deleteWhiteboardById = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete whiteboard');
    }

};
