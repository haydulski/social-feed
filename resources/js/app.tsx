import React from 'react';
import '../css/App.css'
import { createRoot } from 'react-dom/client';
import Posts from './src/Posts'


const App: React.FC = () => {

    return (
        <div className="bg-gray-900">
            <div className='max-w-3xl mx-auto py-24 min-h-screen'>
                <h1 className='text-6xl font-bold text-red-700 text-center'>Social Feed</h1>
                <Posts />
            </div>
        </div>
    );
}

export default App;

const container = document.getElementById('main-root');
if (container) {
    const root = createRoot(container!);
    root.render(<App />);
}
