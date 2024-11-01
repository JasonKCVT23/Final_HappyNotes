import React from 'react';
import { useNavigate } from 'react-router-dom';

// The Map page contains multiple boards. Each board displays its title and the number of cards, 
// and users can click on a board to navigate to its detailed page

// TODO: Board data should be fetched from the backend
const boards = [
  { id: '1', title: 'Board 1', cards: [{ title: 'Card A' }, { title: 'Card B' }] },
  { id: '2', title: 'Board 2', cards: [{ title: 'Card C' }, { title: 'Card D' }, { title: 'Card E' }] },
  { id: '3', title: 'Board 3', cards: [{ title: 'Card F' }] }
];

const Map: React.FC = () => {
  // **React Hook Usage Pattern**:
  // Use useNavigate to get navigation functionality
  const navigate = useNavigate();

  // **JSX Return Pattern**:
  // Return JSX structure to render the page
  return (
    <div className="p-5 text-center">
      {/* Display the page title */}
      <h2 className="text-2xl font-semibold">Map Page</h2>

      {/* Render all the boards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {/* Iterate over each board and render its content */}
        {boards.map((board) => (
          <div
            key={board.id}
            className="bg-gray-100 border border-gray-300 p-4 rounded-lg cursor-pointer transform transition-transform duration-200 hover:scale-105"
            // Click event: When the user clicks on a board, navigate to the corresponding board page
            onClick={() => navigate(`/board/${board.id}`)}
          >
            {/* Display the board title */}
            <h3 className="text-lg font-medium">{board.title}</h3>

            {/* Display the number of cards on this board */}
            <p className="mt-2">Number of Cards: {board.cards.length}</p>

            {/* Display up to two card titles, if more than two, show an ellipsis */}
            <div className="mt-3">
              {board.cards.slice(0, 2).map((card, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-500 text-white px-2 py-1 mr-2 mb-2 rounded text-sm"
                >
                  {card.title}
                </span>
              ))}
              {/* If there are more than two cards, show '...' */}
              {board.cards.length > 2 && <span className="text-gray-500">...</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;
