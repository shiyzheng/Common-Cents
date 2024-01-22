import React, { useState, useEffect } from 'react';
import {
  useRoutes,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
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

function App() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const intervalID = setInterval(() => {
  //     const check = async () => {
  //       const user = await axios.get('http://localhost:3000/account/isLogged');
  //       if (user.data.username == null || user.data.username === '') {
  //         setLogin(false);
  //         // console.log(false);
  //         console.log(user.data.username);
  //       } else {
  //         setUsername(user.data.username);
  //         console.log(user.data.username);
  //         setLogin(true);
  //       }
  //     };
  //     check();
  //   }, 2000);
  //   return () => clearInterval(intervalID);
  // }, []);

  const logout = async () => {
    await axios.post('http://localhost:3000/account/logout');
    setUsername('');
    setLogin(false);
  };

  const element = useRoutes([{ path: '/', element: <Home login={login} username={username} logout={logout} categories={categories} setCategories={setCategories} /> },
    { path: '/Login', element: <Login setLogin={setLogin} login={login} setUsername={setUsername} setPassword={setPassword} username={username} password={password} /> },
    { path: '/Signup', element: <Signup setLogin={setLogin} login={login} setUsername={setUsername} setPassword={setPassword} username={username} password={password} /> },
    { path: '/profile/:id', element: <Profile login={login} /> },

    { path: '/admin-console', element: <AdminConsole login={login} username={username} /> },

    { path: '/achievements', element: <Achievements setLogin={setLogin} login={login} setUsername={setUsername} username={username}  /> },
    { path: '/leaderboards', element: <Leaderboards setLogin={setLogin} login={login} setUsername={setUsername} username={username} /> },
    { path: '/MCQ', element: <MultipleChoiceQuestion setLogin={setLogin} login={login} setUsername={setUsername} username={username}  /> },
    { path: '/lessons/:topic', element: <Lessons setLogin={setLogin} login={login} setUsername={setUsername} username={username}  /> },
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

  const navigateToTopic = (topic) => {
    const formattedTopic = topic.toLowerCase().replace(/\s+/g, '-');
    navigate(`/lessons/${formattedTopic}`);
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
          <button className="btn btn-outline-danger float-right" type="button" onClick={() => logout()}>Logout</button>
          <div>
            Welcome
            {' '}
            {username}
          </div>
      <h2>I would like to learn about...</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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
      </div>
      
          <CategoryView categories={categories} setCategories={setCategories} />
        </div><div style={{ textAlign: 'center', marginTop: '50px' }}>
    </div></>
      )}
    </div>
  );
}
export default App;