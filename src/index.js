import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    return (
        <div className="container">
            <h1>Hello, World!</h1>
            <p>This is a simple web app based on mockups.</p>
        </div>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);