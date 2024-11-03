// src/components/Whiteboard.tsx

import React, { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@/components/specific/Whiteboard/Card';
import { CardData } from '@/interfaces/CardData';
import { WhiteboardData } from '@/interfaces/WhiteboardData';
import { getAllCards, createCard, updateCard, deleteCard } from '@/services/cardService';
import { getWhiteboardById, updateWhiteboard } from '@/services/whiteboardService';
import { WhiteboardUpdateData } from '@/interfaces/WhiteboardUpdateData';

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
                    // Fetch the whiteboard data by ID
                    const whiteboard = await getWhiteboardById(id);
                    setWhiteboard(whiteboard);

                    if (whiteboard && whiteboard._id) {
                        setWhiteboard(whiteboard);
                    } else {
                        console.error("Whiteboard data does not have an ID");
                    }
                    // Ensure whiteboard.cards is an array, or set it to an empty array
                    if (!Array.isArray(whiteboard.cards)) {
                        whiteboard.cards = []; 
                    }

                    // Set the cards for rendering
                    setCards(whiteboard.cards || []);
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

    // Add a new card at the specified x and y coordinates
    const addCard = async (x: number, y: number) => {
        // early return if whiteboard is not loaded or ID is undefined
        if (!whiteboard || !whiteboard._id) {
            console.error("Whiteboard is not loaded or ID is undefined");
            return; 
        }

        const newCardData: Omit<CardData, '_id'> = {
            cardTitle: 'New Card',
            content: 'New Note',
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: new Date(),
            tag: '',
            foldOrNot: false, 
            position: { x, y },
            dimensions: { width: 200, height: 150 },
            connection: [],
            comments: [],
        };

        try {
            // Create a new card and add it to the state
            const createdCard = await createCard(newCardData);
            console.log("Created Card:", createdCard);
            setCards([...cards, createdCard]);
            console.log("Whiteboard:", whiteboard);
            console.log("Whiteboard ID:", whiteboard ? whiteboard._id : "No ID");


            if (whiteboard && whiteboard._id && createdCard) {
                if (createdCard._id) {
                    // Update whiteboard with the new card's ID
                    const existingCardIds: string[] = whiteboard.cards
                    .map((card: CardData) => card._id)
                    .filter((id): id is string => id !== undefined);
                    
                    const updatedCardIds: string[] = [...existingCardIds, createdCard._id];
                
                    // Update the whiteboard's cards in the backend
                    const updatedWhiteboard = await updateWhiteboard(whiteboard._id, { cards: updatedCardIds });
                    
                    setWhiteboard(updatedWhiteboard);
                    setCards(updatedWhiteboard.cards);
                }
            }
            setContextMenu(null);
        } catch (err: any) {
            console.error('Failed to add card:', err);
            alert(err.message || 'Failed to add card');
        }
    };

    // Delete a card: Deletes the currently selected card
    const deleteCardHandler = async (cardId: string) => {
        if (cardId && whiteboard) {
            try {
                // Delete the card and update the state
                await deleteCard(cardId);
                setCards(cards.filter((card) => card._id !== selectedCardId));

                // Update the whiteboard's card list in the backend
                const updatedCardIds: string[] = whiteboard.cards
                    .filter((card: CardData) => card._id !== selectedCardId)
                    .map((card: CardData) => card._id)
                    .filter((id): id is string => id !== undefined);

                if(whiteboard._id) {
                    const updatedBoard = await updateWhiteboard(whiteboard._id, { cards: updatedCardIds });
                    setWhiteboard(updatedBoard);
                }
                if(selectedCardId === cardId){
                    setSelectedCardId(null);
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
    const updateCardHandler = async (cardId: string, updatedFields: Partial<CardData>) => {
        try {
            // Update the card's content locally
            setCards((prevCards) => {
                if (!whiteboard) return prevCards;
                const updatedCards = prevCards.map((card) =>
                    card._id === cardId ? { ...card, ...updatedFields } : card
                );
                return updatedCards;
            });

            // Update the card in the backend
            await updateCard(cardId, updatedFields);
        } catch (err: any) {
            console.error('Failed to update card content:', err);
            alert(err.message || 'Failed to update card content');
        }
    };

    // Display the context menu for adding or deleting cards
    const handleRightClick = (e: React.MouseEvent, cardId?: string) => {
        e.preventDefault();
        setSelectedCardId(cardId || null);
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            action: cardId ? 'delete' : 'add',
        });
    };

    // Handle keydown events to delete the selected card
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Delete' && selectedCardId) {
            deleteCardHandler(selectedCardId);
        }
    };

    const handleSelectCard = (cardId: string) => {
        setSelectedCardId(cardId);
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
                <Card
                key={card._id}
                {...card}
                onUpdateCard={updateCardHandler}
                onDelete={deleteCardHandler} 
                isSelected={card._id === selectedCardId} 
                onSelect={handleSelectCard} 
            />
            ))}

            {/* Display the context menu for adding or deleting cards */}
            {contextMenu && (
                <div
                    className="absolute bg-gray-800 text-white p-2 rounded z-50 cursor-pointer"
                    style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
                    onClick={() => {
                        if (contextMenu.action === 'add') {
                            addCard(contextMenu.x, contextMenu.y);
                        } else if (contextMenu.action === 'delete'&& selectedCardId) {
                            deleteCardHandler(selectedCardId);
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
