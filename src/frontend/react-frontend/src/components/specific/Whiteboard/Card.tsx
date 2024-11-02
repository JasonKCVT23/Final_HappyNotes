// react-frontend/src/components/specific/Whiteboard/Card.tsx

import React, { useState } from 'react';
import { CardData } from '@/interfaces/CardData';

interface CardProps extends CardData {
    onUpdateContent: (cardId: string, newContent: string) => void;
}

const Card: React.FC<CardProps> = ({
    id,
    cardTitle,
    content,
    dueDate,
    tag,
    foldOrNot,
    position,
    dimensions,
    connection,
    connectionBy,
    comments,
    onUpdateContent,
}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedContent, setEditedContent] = useState<string>(content);

    const handleSave = () => {
        if (id) {
            onUpdateContent(id, editedContent);
            setIsEditing(false);
        }
    };

    return (
        <div
            className="bg-blue-100 border border-blue-300 p-4 rounded shadow"
            style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
                width: dimensions.width,
                height: dimensions.height,
            }}
            onDoubleClick={() => setIsEditing(true)}
        >
            <h3 className="text-lg font-semibold">{cardTitle}</h3>
            {isEditing ? (
                <textarea
                    placeholder="Enter content here"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full h-24 p-2 border rounded"
                />
            ) : (
                <p className="mt-2">{content}</p>
            )}
            {isEditing && (
                <button
                    onClick={handleSave}
                    className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
                >
                    Save
                </button>
            )}
        </div>
    );
};

export default Card;
