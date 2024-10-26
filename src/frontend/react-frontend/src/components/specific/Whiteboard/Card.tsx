import React, { useState, useRef, useEffect } from 'react';
import { CardData } from '../../../interfaces/CardData';
import styles from './Card.module.css';

interface CardProps extends CardData {
  onUpdateContent: (id: string, newContent: string) => void;
}

const Card: React.FC<CardProps> = ({ id, content, x, y, onUpdateContent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [currentContent]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentContent(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onUpdateContent(id, currentContent);
  };

  return (
    <div
      className={styles.card}
      style={{ top: y, left: x }}
      onDoubleClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <textarea
          ref={textAreaRef}
          value={currentContent}
          onChange={handleContentChange}
          onBlur={handleBlur}
          className={styles.textArea}
          autoFocus
          title="Edit content"
          placeholder="Enter content here"
        />
      ) : (
        <p>{currentContent}</p>
      )}
    </div>
  );
};

export default Card;
