import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './Game';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="play/:lang" Component={Game} />
                <Route path="play/*" Component={Game} />
            </Routes>
        </Router>
    );
}

const container = document.getElementById('content');
const root = createRoot(container);
root.render(<App />);