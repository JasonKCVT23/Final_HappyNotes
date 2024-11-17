// Map.tsx - Displays a map of whiteboards and allows users to create and delete whiteboards

import React, { useState, useEffect, FormEvent, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { WhiteboardData } from '@/interfaces/Whiteboard/WhiteboardData';
import { getAllWhiteboards, createWhiteboard, deleteWhiteboardById } from '@/services/whiteboardService';

const Map: React.FC = () => {
    const navigate = useNavigate();
    const [whiteboards, setWhiteboards] = useState<WhiteboardData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const [newWhiteboardTitle, setNewWhiteboardTitle] = useState<string>('');
    const [newWhiteboardPrivate, setNewWhiteboardPrivate] = useState<boolean>(false);

    // Fetch whiteboards data from the backend when the component mounts
    useEffect(() => {
        const fetchWhiteboardsData = async () => {
            try {
                const data = await getAllWhiteboards();
                // Validate the data
                const validatedData = data.map(wb => {
                    if (!wb._id) {
                        throw new Error('Whiteboard data does not have an ID');
                    }
                    return wb;
                });
                setWhiteboards(validatedData);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch whiteboards:', err);
                setError('Failed to fetch whiteboards');
                setLoading(false);
            }
        };

        fetchWhiteboardsData();
    }, []);

    // Handle the creation of a new whiteboard
    const handleCreateWhiteboard = async (e: FormEvent) => {
        e.preventDefault();
    
        if (newWhiteboardTitle.trim() === '') {
            alert('Whiteboard title is required.');
            return;
        }
    
        // TODO: Replace this hardcoded user ID with an actual one from authentication
        const userId = '1';

        // Ensure contextMenu is not null
        if (!contextMenu) {
            alert('Context menu position is not available.');
            return;
        }

        const whiteboardData: Omit<WhiteboardData, '_id'> = {
            whiteboardTitle: newWhiteboardTitle,
            isPrivate: newWhiteboardPrivate,
            userId: userId,
            position: { x: contextMenu.x, y: contextMenu.y }, // Use the context menu position
            dimensions: { width: 200, height: 150 }, 
            cards: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    
        try {
            // Create the whiteboard and update state
            const createdWhiteboard = await createWhiteboard(whiteboardData);
            setWhiteboards([...whiteboards, createdWhiteboard]);
            setNewWhiteboardTitle('');
            setNewWhiteboardPrivate(false);
            setContextMenu(null);
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
                // Update state to remove the deleted whiteboard
                setWhiteboards(whiteboards.filter((wb) => wb._id !== id));
            } catch (err: any) {
                console.error('Failed to delete whiteboard:', err);
                alert(err.message || 'Failed to delete whiteboard');
            }
        }
    };

    // Handle right-click to show context menu
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    // Handle click outside the context menu to close it
    useEffect(() => {
        const handleClick = () => {
            if (contextMenu) {
                setContextMenu(null);
            }
        };

        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [contextMenu]);

    // Display a loading message while data is being fetched
    if (loading) {
        return <div className="p-5 text-center">Loading...</div>;
    }
    // Display an error message if fetching data fails
    if (error) {
        return <div className="p-5 text-center text-red-500">{error}</div>;
    }

    return (
        <div
            className="relative w-full h-screen bg-white"
            onContextMenu={handleContextMenu}
        >
            <h2 className="text-2xl font-semibold p-5">Map Page</h2>

            {/* Render all the whiteboards */}
            <div className="absolute top-0 left-0 w-full h-full">
                {whiteboards.map((whiteboard) => (
                    <div
                        key={whiteboard._id}
                        className="absolute bg-gray-100 border border-gray-300 p-4 rounded-lg cursor-pointer transform transition-transform duration-200 hover:scale-105"
                        style={{
                            top: whiteboard.position.y,
                            left: whiteboard.position.x,
                            width: whiteboard.dimensions.width,
                            height: whiteboard.dimensions.height
                        }}
                        onClick={() => navigate(`/whiteboard/${whiteboard._id}`)}
                    >
                        {/* Delete Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // prevent onClick from navigating to whiteboard
                                if (whiteboard._id) handleDeleteWhiteboard(whiteboard._id);
                            }}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            title="Delete Whiteboard"
                        >
                            &times;
                        </button>

                        {/* Display the whiteboard title */}
                        <h3 className="text-lg font-medium">{whiteboard.whiteboardTitle}</h3>

                        {/* Display the number of cards on this whiteboard */}
                        <p className="mt-2">Number of Cards: {whiteboard.cards?.length || 0}</p>

                        {/* Display up to two card IDs, if more than two, show an ellipsis */}
                        <div className="mt-3">
                            {whiteboard.cards?.slice(0, 20).map((card) => (
                                <div
                                    key={card._id}
                                    className="inline-block bg-blue-500 text-white px-2 py-1 mr-2 mb-2 rounded text-sm"
                                >
                                     card {card._id}
                                </div>
                            )) || null }
                            {whiteboard.cards.length > 10 && (
                                <span className="text-gray-500">...</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Context Menu for Adding Whiteboard */}
            {contextMenu && (
                    <div
                        className="absolute bg-white border border-gray-300 shadow-lg rounded p-4 z-50"
                        style={{
                            top: contextMenu.y,
                            left: contextMenu.x,
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent event bubbling to close the form
                    >
                        <form onSubmit={handleCreateWhiteboard} className="space-y-4">
                            <h3 className="text-xl font-semibold">新增白板</h3>
                            <div>
                                <label className="block mb-1">標題</label>
                                <input
                                    type="text"
                                    value={newWhiteboardTitle}
                                    onChange={(e) => setNewWhiteboardTitle(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="輸入白板標題"
                                    required
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={newWhiteboardPrivate}
                                    onChange={(e) => setNewWhiteboardPrivate(e.target.checked)}
                                    className="form-checkbox"
                                    id="private-checkbox"
                                />
                                <label htmlFor="private-checkbox" className="ml-2">私人</label>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setContextMenu(null)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    建立
                                </button>
                            </div>
                        </form>
                    </div>
            )}
        </div>
    );
};

export default Map;
