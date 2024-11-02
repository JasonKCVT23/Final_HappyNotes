// src/components/Whiteboard.tsx

import React, { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@/components/specific/Whiteboard/Card';
import { CardData } from '@/interfaces/CardData';
import { WhiteboardData } from '@/interfaces/WhiteboardData';
import { getAllCards, createCard, updateCard, deleteCard } from '@/services/cardService';
import { getWhiteboardById, updateWhiteboard } from '@/services/whiteboardService';

// Component for Whiteboard
const Whiteboard: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [whiteboard, setWhiteboard] = useState<WhiteboardData | null>(null);
    const [cards, setCards] = useState<CardData[]>([]);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const [contextMenu, setContextMenu] = useState<{
        x: number;
        y: number;
        action?: 'add' | 'delete';
    } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch whiteboard and associated cards data when the component mounts or id changes
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const board = await getWhiteboardById(id);
                    setWhiteboard(board);

                    // Fetch all cards and filter the ones that are part of the whiteboard
                    const allCards = await getAllCards();
                    const whiteboardCards = allCards.filter(card => board.cards.includes(card.id || ''));
                    setCards(whiteboardCards);

                    setLoading(false);
                } catch (err) {
                    console.error('Failed to fetch whiteboard data:', err);
                    setError('Failed to fetch whiteboard data');
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [id]);

    // Add a new card: Adds a new card to the whiteboard at the specified x and y coordinates
    const addCard = async (x: number, y: number) => {
        const newCardData: Omit<CardData, 'id'> = {
            cardTitle: 'New Card',
            content: 'New Note',
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: new Date(),
            tag: '',
            foldOrNot: false, // default is not folded
            position: { x, y },
            dimensions: { width: 200, height: 150 },
            connection: [],
            comments: [],
        };

        try {
            // create card
            const createdCard = await createCard(newCardData);
            setCards([...cards, createdCard]);

            if (whiteboard && whiteboard.id) {
                // update whiteboard
                const updatedCards = [...whiteboard.cards, createdCard.id].filter((cardId): cardId is string => cardId !== undefined && cardId !== null);
                const updatedBoard = await updateWhiteboard(whiteboard.id, { cards: updatedCards });
                setWhiteboard(updatedBoard);
            }

            setContextMenu(null);
        } catch (err: any) {
            console.error('Failed to add card:', err);
            alert(err.message || 'Failed to add card');
        }
    };

    // Delete a card: Deletes the currently selected card
    const deleteCardHandler = async () => {
        if (selectedCardId && whiteboard) {
            try {
                // delete card
                await deleteCard(selectedCardId);
                setCards(cards.filter((card) => card.id !== selectedCardId));

                // update whiteboard card list
                const updatedCards = whiteboard.cards.filter((cardId) => cardId !== selectedCardId);
                if(whiteboard.id) {
                    const updatedBoard = await updateWhiteboard(whiteboard.id, { cards: updatedCards });
                    setWhiteboard(updatedBoard);
                }
                setSelectedCardId(null);
                setContextMenu(null);
            } catch (err: any) {
                console.error('Failed to delete card:', err);
                alert(err.message || 'Failed to delete card');
            }
        }
    };

    // Update card content: Updates the content of a specific card
    const updateCardContentHandler = async (cardId: string, newContent: string) => {
        try {
            // update frontend
            setCards((prevCards) =>
                prevCards.map((card) =>
                    card.id === cardId ? { ...card, content: newContent, updatedAt: new Date() } : card
                )
            );

            // update backend
            await updateCard(cardId, { content: newContent, updatedAt: new Date() });
        } catch (err: any) {
            console.error('Failed to update card content:', err);
            alert(err.message || 'Failed to update card content');
        }
    };

    // Handle right-click event: Displays the context menu and sets the appropriate action (add or delete)
    const handleRightClick = (e: React.MouseEvent, cardId?: string) => {
        e.preventDefault();
        setSelectedCardId(cardId || null);
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            action: cardId ? 'delete' : 'add',
        });
    };

    // Handle keydown event: Deletes the selected card when the Delete key is pressed
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Delete' && selectedCardId) {
            deleteCardHandler();
        }
    };

    if (loading) {
        return <div className="p-5 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="p-5 text-center text-red-500">{error}</div>;
    }

    return (
        <div
            className="relative w-full h-screen bg-white outline-none"
            onContextMenu={(e) => handleRightClick(e)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <h2 className="text-2xl font-semibold mb-4">
                {whiteboard ? whiteboard.whiteboardTitle : 'Loading...'}
            </h2>

            {/* Card Rendering Section */}
            {cards.map((card) => (
                <div
                    key={card.id}
                    onContextMenu={(e) => handleRightClick(e, card.id)}
                    onClick={() => card.id && setSelectedCardId(card.id)}
                >
                    <Card {...card} onUpdateContent={updateCardContentHandler} />
                </div>
            ))}

            {/* Context Menu Section */}
            {contextMenu && (
                <div
                    className="absolute bg-gray-800 text-white p-2 rounded z-50 cursor-pointer"
                    style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
                    onClick={() => {
                        if (contextMenu.action === 'add') {
                            addCard(contextMenu.x, contextMenu.y);
                        } else if (contextMenu.action === 'delete') {
                            deleteCardHandler();
                        }
                    }}
                >
                    <div className="py-1 px-2 hover:bg-gray-700">Add Card</div>
                    {contextMenu.action === 'delete' && selectedCardId && (
                        <div className="py-1 px-2 hover:bg-gray-700">Delete Card</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Whiteboard;
