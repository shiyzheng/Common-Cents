// import React from 'react';
import { useRoutes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Achievements from './pages/achievements';
import Leaderboards from './pages/leaderboards';

function App() {
    

    const element = useRoutes([{ path: '/', element: <Home /> },
    { path: '/achievements', element: <Achievements  /> },
    { path: '/leaderboards', element: <Leaderboards  /> },
    ]);
    return element;
}

function Home() {
    return (<>
    <Navbar />
    </>);
}

export default App;

