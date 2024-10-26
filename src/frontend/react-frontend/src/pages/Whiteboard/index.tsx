import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/specific/Whiteboard/Card';
import { CardData } from '../../interfaces/CardData';
import styles from './Whiteboard.module.css';

const Whiteboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cards, setCards] = useState<CardData[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; action?: 'add' | 'delete' } | null>(null);

  const addCard = (x: number, y: number) => {
    const newCard: CardData = {
      id: Date.now().toString(),
      content: 'New Note',
      x,
      y,
    };
    setCards([...cards, newCard]);
    setContextMenu(null);
  };

  const deleteCard = () => {
    if (selectedCardId) {
      setCards(cards.filter((card) => card.id !== selectedCardId));
      setSelectedCardId(null);
      setContextMenu(null);
    }
  };

  const updateCardContent = (cardId: string, newContent: string) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === cardId ? { ...card, content: newContent } : card))
    );
  };

  const handleRightClick = (e: React.MouseEvent, cardId?: string) => {
    e.preventDefault();
    setSelectedCardId(cardId || null);
    setContextMenu({ x: e.clientX, y: e.clientY, action: cardId ? 'delete' : 'add' });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Delete' && selectedCardId) {
      deleteCard();
    }
  };

  return (
    <div className={styles.whiteboard} onContextMenu={(e) => handleRightClick(e)} onKeyDown={handleKeyDown} tabIndex={0}>
      <h2>Whiteboard {id}</h2>
      {cards.map((card) => (
        <div key={card.id} onContextMenu={(e) => handleRightClick(e, card.id)} onClick={() => setSelectedCardId(card.id)}>
          <Card {...card} onUpdateContent={updateCardContent} />
        </div>
      ))}
      {contextMenu && (
        <div
          className={styles.contextMenu}
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={() => {
            contextMenu.action === 'add' ? addCard(contextMenu.x, contextMenu.y) : deleteCard();
          }}
        >
          <div className={styles.menuItem}>新增卡片</div>
          {selectedCardId && <div className={styles.menuItem}>刪除卡片</div>}
        </div>
      )}
    </div>
  );
};

export default Whiteboard;
