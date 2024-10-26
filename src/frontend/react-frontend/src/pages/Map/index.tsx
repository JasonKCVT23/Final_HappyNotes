import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Map.module.css';

const whiteboards = [
  { id: '1', title: 'Whiteboard 1', cards: [{ title: 'Card A' }, { title: 'Card B' }] },
  { id: '2', title: 'Whiteboard 2', cards: [{ title: 'Card C' }, { title: 'Card D' }, { title: 'Card E' }] },
  { id: '3', title: 'Whiteboard 3', cards: [{ title: 'Card F' }] }
];

const Map: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2>Map Page</h2>
      <div className={styles.whiteboardGrid}>
        {whiteboards.map((board) => (
          <div
            key={board.id}
            className={styles.whiteboard}
            onClick={() => navigate(`/whiteboard/${board.id}`)}
          >
            <h3>{board.title}</h3>
            <p>卡片數量: {board.cards.length}</p>
            <div className={styles.cardTitles}>
              {board.cards.slice(0, 2).map((card, index) => (
                <span key={index} className={styles.cardTitle}>
                  {card.title}
                </span>
              ))}
              {board.cards.length > 2 && <span>...</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;
