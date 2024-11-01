import React, { useState, useRef, useEffect } from 'react';
import { CardData } from '../../../interfaces/CardData';

// Card component is responsible for displaying an editable card that can enter edit mode on double-click
// and automatically adjusts its height to fit the content

interface CardProps extends CardData {
  // **Function Description**: Defines a function prop used to update the card content
  onUpdateContent: (id: string, newContent: string) => void;
}

const Card: React.FC<CardProps> = ({ id, content, x, y, onUpdateContent }) => {
  // **State Management Section**
  // isEditing: Used to track if the card is in edit mode
  const [isEditing, setIsEditing] = useState(false);
  // currentContent: Stores the current content of the card
  const [currentContent, setCurrentContent] = useState(content);
  
  // **Reference Section**
  // textAreaRef: Used to reference the textarea element to adjust its height
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // **UseEffect Section**
  // Automatically adjust the height of the textarea when currentContent changes
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'; // Reset the height first
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set the height to match the content
    }
  }, [currentContent]);

  // **Event Handling Section**
  // When the content of the textarea changes, update the currentContent state
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentContent(e.target.value);
  };

  // When the textarea loses focus, exit edit mode and update the card content
  const handleBlur = () => {
    setIsEditing(false);
    onUpdateContent(id, currentContent);
  };

  // **JSX Return Pattern**
  // Return the JSX structure of the card
  return (
    <div
      // Card container: Sets styling and position and listens for double-click events
      className="absolute bg-gray-100 border border-gray-300 shadow-md rounded p-2 cursor-pointer text-sm overflow-hidden"
      style={{ top: y, left: x }}
      onDoubleClick={() => setIsEditing(true)} // Double-click event: Enter edit mode
    >
      {isEditing ? (
        // **Edit Mode**: Displays a textarea allowing the user to edit the card content
        <textarea
          ref={textAreaRef} // Reference the textarea element
          value={currentContent} // Set the value of the textarea
          onChange={handleContentChange} // Change event: Update content
          onBlur={handleBlur} // Blur event: Save content and exit edit mode
          className="w-full text-sm resize-none border-none outline-none overflow-hidden bg-transparent font-inherit"
          autoFocus // Automatically focus the textarea
          title="Edit content"
          placeholder="Enter content here"
        />
      ) : (
        // **Display Mode**: Shows the content of the card
        <p>{currentContent}</p>
      )}
    </div>
  ); 
};

export default Card;
