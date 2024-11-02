import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { WhiteboardData } from '@/interfaces/WhiteboardData';
import {getAllWhiteboards,createWhiteboard,deleteWhiteboardById} from '@/services/whiteboardService';



const Map: React.FC = () => {
    const navigate = useNavigate();
    const [whiteboards, setWhiteboards] = useState<WhiteboardData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [newWhiteboardTitle, setNewWhiteboardTitle] = useState<string>('');
    const [newWhiteboardPrivate, setNewWhiteboardPrivate] = useState<boolean>(false);

    // Fetch whiteboards data from the backend when the component mounts
    useEffect(() => {
        const fetchWhiteboardsData = async () => {
            try {
                const data = await getAllWhiteboards();
                setWhiteboards(data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch whiteboards:', err);
                setError('Failed to fetch whiteboards');
                setLoading(false);
            }
        };

        fetchWhiteboardsData();
    }, []);

    const handleCreateWhiteboard = async (e: FormEvent) => {
        e.preventDefault();
    
        if (newWhiteboardTitle.trim() === '') {
            alert('Whiteboard title is required.');
            return;
        }
    
        // TODO: Change to actual userId
        const userId = '1';
    
        const whiteboardData: WhiteboardData = {
            whiteboardTitle: newWhiteboardTitle,
            isPrivate: newWhiteboardPrivate,
            userId: userId,
            position: { x: 0, y: 0 }, // TODO: Change to mouse position
            dimensions: { width: 800, height: 600 }, // initial dimensions
            cards: [], // no cards initially
            createdAt: new Date(), 
            updatedAt: new Date(), 
        };
    
        try {
            const createdWhiteboard = await createWhiteboard(whiteboardData);
            setWhiteboards([...whiteboards, createdWhiteboard]);
            setNewWhiteboardTitle('');
            setNewWhiteboardPrivate(false);
            setIsAdding(false);
        } catch (err: any) {
            console.error('Failed to create whiteboard:', err);
            alert(err.message || 'Failed to create whiteboard');
        }
    };

    // Handle deleting a whiteboard
    const handleDeleteWhiteboard = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this whiteboard?')) {
            try {
                await deleteWhiteboardById(id);
                setWhiteboards(whiteboards.filter((wb) => wb.id !== id));
            } catch (err: any) {
                console.error('Failed to delete whiteboard:', err);
                alert(err.message || 'Failed to delete whiteboard');
            }
        }
    };

    if (loading) {
        return <div className="p-5 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="p-5 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="p-5 text-center">
            <h2 className="text-2xl font-semibold">Map Page</h2>

            {/* Add New Whiteboard */}
            {!isAdding ? (
                <button
                    onClick={() => setIsAdding(true)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    新增白板
                </button>
            ) : (
                <form onSubmit={handleCreateWhiteboard} className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                    <h3 className="text-xl font-semibold mb-2">Add New Whiteboard</h3>
                    <div className="mb-4 text-left">
                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            value={newWhiteboardTitle}
                            onChange={(e) => setNewWhiteboardTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter whiteboard title"
                        />
                    </div>
                    <div className="mb-4 text-left">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={newWhiteboardPrivate}
                                onChange={(e) => setNewWhiteboardPrivate(e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="ml-2">Private</span>
                        </label>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                setIsAdding(false);
                                setNewWhiteboardTitle('');
                                setNewWhiteboardPrivate(false);
                            }}
                            className="px-4 py-2 mr-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Create
                        </button>
                    </div>
                </form>
            )}

            {/* Render all the whiteboards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                {whiteboards.map((whiteboard) => (
                    <div
                        key={whiteboard.id}
                        className="relative bg-gray-100 border border-gray-300 p-4 rounded-lg cursor-pointer transform transition-transform duration-200 hover:scale-105"
                        onClick={() => navigate(`/whiteboard/${whiteboard.id}`)}
                    >
                        {/* Delete Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Stop the click event from bubbling up to the parent div
                                handleDeleteWhiteboard(whiteboard.id);
                            }}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            title="Delete Whiteboard"
                        >
                            &times;
                        </button>

                        {/* Display the whiteboard title */}
                        <h3 className="text-lg font-medium">{whiteboard.whiteboardTitle}</h3>

                        {/* Display the number of cards on this whiteboard */}
                        <p className="mt-2">Number of Cards: {whiteboard.cards.length}</p>

                        {/* Display up to two card IDs, if more than two, show an ellipsis */}
                        <div className="mt-3">
                            {whiteboard.cards.slice(0, 2).map((cardId) => (
                                <span
                                    key={cardId}
                                    className="inline-block bg-blue-500 text-white px-2 py-1 mr-2 mb-2 rounded text-sm"
                                >
                                    Card {cardId}
                                </span>
                            ))}
                            {whiteboard.cards.length > 2 && (
                                <span className="text-gray-500">...</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Map;
