// frontend/src/components/specific/Whiteboard/Card.tsx

import React, { useState, useRef, useEffect } from 'react';
import { CardData } from '../../../interfaces/CardData';

// Card component is responsible for displaying an editable card that can enter edit mode on double-click
// and automatically adjusts its height to fit the content

interface CardProps extends CardData {
    // **Function Description**: Defines a function prop used to update the card content
    onUpdateContent: (id: string, newContent: string) => void;
}

const Card: React.FC<CardProps> = ({
    id,
    cardTitle,
    content,
    position,
    dimensions,
    onUpdateContent,
}) => {
    // **State Management Section**
    const [isEditing, setIsEditing] = useState(false);
    const [currentContent, setCurrentContent] = useState(content);

    // **Reference Section**
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // **UseEffect Section**
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [currentContent]);

    // **Event Handling Section**
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentContent(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onUpdateContent(id, currentContent);
    };

    return (
        <div
            className="absolute bg-gray-100 border border-gray-300 shadow-md rounded p-2 cursor-pointer text-sm overflow-hidden"
            style={{
                top: position.y,
                left: position.x,
                width: dimensions.width,
                height: dimensions.height,
            }}
            onDoubleClick={() => setIsEditing(true)}
        >
            <h3 className="text-md font-semibold mb-2">{cardTitle}</h3>
            {isEditing ? (
                <textarea
                    ref={textAreaRef}
                    value={currentContent}
                    onChange={handleContentChange}
                    onBlur={handleBlur}
                    className="w-full text-sm resize-none border-none outline-none overflow-hidden bg-transparent font-inherit"
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
