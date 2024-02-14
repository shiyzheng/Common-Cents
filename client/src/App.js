import React, { useState, useRef } from 'react';
import {
  useRoutes,
  useNavigate,
} from 'react-router-dom';
import Login from './components/Login';
// import Classrooms from './components/Classrooms';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Achievements from './pages/achievements';
import Leaderboards from './pages/Leaderboards';
import CategoryView from './components/CategoryView';
import CategoryPage from './components/CategoryPage';
import MultipleChoiceQuestion from './components/MCQ';
import AdminConsole from './pages/AdminConsole';
import Lessons from './components/Lessons';
import { addAchievementById, getUserProgress } from './api/users';
import { decode } from '../../backend/utils/auth';

function App() {
  const [login, setLogin] = useState(sessionStorage.getItem('app-token') != null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [categories, setCategories] = useState([]);

  const logout = async () => {
    sessionStorage.removeItem('app-token');
    sessionStorage.removeItem('username');
    window.location.reload(true);
  };

  const element = useRoutes([{ path: '/', element: <Home login={login} username={username} logout={logout} categories={categories} setCategories={setCategories} /> },
    { path: '/Login', element: <Login setLogin={setLogin} login={login} setUsername={setUsername} setPassword={setPassword} username={username} password={password} /> },
    { path: '/Signup', element: <Signup setLogin={setLogin} login={login} setUsername={setUsername} setPassword={setPassword} username={username} password={password} /> },
    { path: '/profile/:id', element: <Profile login={login} /> },

    { path: '/admin-console', element: <AdminConsole login={login} username={username} /> },

    { path: '/achievements', element: <Achievements setLogin={setLogin} login={login} setUsername={setUsername} username={username}  /> },
    { path: '/leaderboards', element: <Leaderboards setLogin={setLogin} login={login} setUsername={setUsername} username={username} /> },
    { path: '/MCQ', element: <MultipleChoiceQuestion setLogin={setLogin} login={login} setUsername={setUsername} username={username}  /> },
    { path: '/lessons/:topic/:subcategory', element: <Lessons setLogin={setLogin} login={login} setUsername={setUsername} username={username}  /> },
    // { path: '/Home', element: <Categories login={login} categories={categories} setCategories={setCategories} username={username} /> },
    { path: '/Category/:name', element: <CategoryPage login={login} username={username} /> },
  ]);
  return element;
}

function Home(props) {
  // console.log('homepage');
  const { login, username, logout, categories, setCategories } = props;
  const navigate = useNavigate();

  const topics = [
    "Earning Income",
    "Saving",
    "Spending",
    "Investing",
    "Managing Credit",
    "Managing Risk",
  ];

  const subcategories = {
    "Earning Income": ["A", "B", "C"],
    "Saving": ["D", "E", "F"],
    "Spending": ["G", "H", "I"],
    "Investing": ["J", "K", "L"],
    "Managing Credit": ["M", "N", "O"],
    "Managing Risk": ["P", "Q", "R"],
  };

  const navigateToTopic = (topic, subcategory) => {
    const formattedTopic = topic.toLowerCase().replace(/\s+/g, '-');
    const formattedSubcategory = subcategory.toLowerCase().replace(/\s+/g, '-');
    navigate(`/lessons/${formattedTopic}/${formattedSubcategory}`);
  };

  return (
    <div>
        <Navbar />
      {!login && (
        <div>
          {' '}
          Temporary Home Page
        </div>
      )}
      {login && (
        <><div>
          <button className="btn btn-outline-danger float-right" type="button" onClick={() => addAchievementById({ name: "Master a Topic", id: 0 })}>TESTING REMOVE THIS LATER FRONTEND</button>
          <button className="btn btn-outline-danger float-right" type="button" onClick={() => logout()}>Logout</button>
          <div>
            Welcome
            {' '}
            {sessionStorage.getItem('username')}
          </div>
      <h2>I would like to learn about...</h2>
      {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {topics.map((topic, index) => (
          <button
            key={index}
            className="btn btn-primary float-right"
            type="button"
            onClick={() => navigateToTopic(topic)}
            style={{ margin: '0 10px' }}>
            {topic}
          </button>
        ))}
      </div> */}
      <div className="lessons-wrapper">
      {topics.map((topic, index) => (
          <div key={index} className="lessons-container">
            <h3>{topic}</h3>
            <ul>
              {subcategories[topic].map((subcategory, subIndex) => (
                <li key={subIndex}>
                  <button onClick={() => navigateToTopic(topic, subcategory)}>
                    {subcategory}
                  </button>
                  <h6>{" "}</h6>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div></>
      )}
    </div>
  );
}
export default App;