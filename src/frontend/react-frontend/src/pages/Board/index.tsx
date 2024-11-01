import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/specific/Board/Card';
import { CardData } from '../../interfaces/CardData';

// The Board page contains multiple cards, used to display and manage cards.
// Users can add, delete, and update card content. It also supports right-click context menus and delete keyboard shortcuts.

const Board: React.FC = () => {
  // **State Management Section**
  // id: Parameter from the URL, used to identify a specific board
  const { id } = useParams<{ id: string }>();

  // cards: State to store all the cards
  const [cards, setCards] = useState<CardData[]>([]);
  
  // selectedCardId: Tracks the currently selected card ID
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  // contextMenu: Manages the position and behavior of the right-click context menu
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; action?: 'add' | 'delete' } | null>(null);

  // **Event Handling Section**

  // Add a new card: Adds a new card to the board at the specified x and y coordinates
  const addCard = (x: number, y: number) => {
    const newCard: CardData = {
      id: Date.now().toString(),
      content: 'New Note',
      x,
      y,
    };
    setCards([...cards, newCard]);
    setContextMenu(null); // Hide the context menu
  };

  // Delete a card: Deletes the currently selected card
  const deleteCard = () => {
    if (selectedCardId) {
      setCards(cards.filter((card) => card.id !== selectedCardId));
      setSelectedCardId(null); // Clear the selected card state
      setContextMenu(null); // Hide the context menu
    }
  };

  // Update card content: Updates the content of a specific card
  const updateCardContent = (cardId: string, newContent: string) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === cardId ? { ...card, content: newContent } : card))
    );
  };

  // Handle right-click event: Displays the context menu and sets the appropriate action (add or delete)
  const handleRightClick = (e: React.MouseEvent, cardId?: string) => {
    e.preventDefault();
    setSelectedCardId(cardId || null);
    setContextMenu({ x: e.clientX, y: e.clientY, action: cardId ? 'delete' : 'add' });
  };

  // Handle keyboard event: Deletes the selected card when the Delete key is pressed
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Delete' && selectedCardId) {
      deleteCard();
    }
  };

  // **JSX Return Pattern**
  // Returns the JSX structure of the board, including card rendering and the context menu
  return (
    <div
      // **Board Container**: Sets up styling and event handlers
      className="relative w-full h-screen bg-white outline-none"
      onContextMenu={(e) => handleRightClick(e)} // Right-click context menu event
      onKeyDown={handleKeyDown} // Keyboard event
      tabIndex={0} // Makes the board focusable for keyboard events
    >
      <h2 className="text-2xl font-semibold mb-4">Board {id}</h2>

      {/* Card Rendering Section */}
      {cards.map((card) => (
        <div
          key={card.id}
          onContextMenu={(e) => handleRightClick(e, card.id)} // Card right-click context menu event
          onClick={() => setSelectedCardId(card.id)} // Card click event
        >
          <Card {...card} onUpdateContent={updateCardContent} />
        </div>
      ))}

      {/* Context Menu Section */}
      {contextMenu && (
        <div
          className="absolute bg-gray-800 text-white p-2 rounded z-50 cursor-pointer"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          onClick={() => {
            contextMenu.action === 'add' ? addCard(contextMenu.x, contextMenu.y) : deleteCard();
          }}
        >
          <div className="py-1 px-2 hover:bg-gray-700">Add Card</div>
          {selectedCardId && <div className="py-1 px-2 hover:bg-gray-700">Delete Card</div>}
        </div>
      )}
    </div>
  );
};

export default Board;
