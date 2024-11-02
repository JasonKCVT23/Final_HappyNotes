import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Map from '@/pages/Map';
import Whiteboard from '@/pages/Whiteboard';

// AppRoutes component defines the routing configuration for the application
const AppRoutes: React.FC = () => {
  return (
    // Router: Wraps the entire application to enable routing
    <Router>
      {/* Routes: Contains all the route definitions */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/whiteboard/:id" element={<Whiteboard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
