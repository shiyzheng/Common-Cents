import React, { useState, useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Achievements from './components/Achievements';
import Leaderboards from './components/Leaderboards';
import CategoryPage from './components/CategoryPage';
import Account from './components/Account/Account';
import Landing from "./components/Landing";

import MultipleChoiceQuestion from './components/MCQ';
// import AdminConsole from './pages/AdminConsole';
import Lesson from './components/Lesson';
import Lessons from './components/Lessons';
import StudyGuide from './components/StudyGuide';
import { getUserProgress } from './api/users';
import { getAllUnitByLesson } from './api/category';
import {Button, responsiveFontSizes} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#69b3dd',
    },
    secondary: {
      main: '#65af60',
    },
    error: {
      main: '#751307',
    },
    red_custom: {
      main: '#c23827',
    },
    warning: {
      main: '#d89514',
    },
    info: {
      main: '#6e83de',
    },
    success: {
      main: '#086402',
    },
    text: {
      primary: '#000000',
    },
  },
  typography: {
    fontFamily: 'Josefin Sans, sans-serif',
    secondaryFontFamily: 'Nunito, sans-serif',
    h1: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '2rem',
    },
    h2: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '1.3rem',
    },
    h3: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '1.1rem',
    },
  },
});

const responsiveTheme = responsiveFontSizes(theme);

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

  const element = useRoutes([{ path: '/', element: <Home setLogin={setLogin} login={login} setUsername={setUsername} username={username} logout={logout} categories={categories} setCategories={setCategories} /> },
    { path: '/Login', element: <Login setLogin={setLogin} login={login} setUsername={setUsername} setPassword={setPassword} username={username} password={password} logout={logout}  /> },
    { path: '/Signup', element: <Signup setLogin={setLogin} login={login} setUsername={setUsername} setPassword={setPassword} username={username} password={password} logout={logout}  /> },
    { path: '/profile/:id', element: <Profile login={login} logout={logout}  /> },
    { path: '/account', element: <Account /> },

    // { path: '/admin-console', element: <AdminConsole login={login} username={username} logout={logout}  /> },

    { path: '/achievements', element: <Achievements setLogin={setLogin} login={login} setUsername={setUsername} username={username} logout={logout}   /> },
    { path: '/leaderboards', element: <Leaderboards setLogin={setLogin} login={login} setUsername={setUsername} username={username} logout={logout}  /> },
    { path: '/MCQ/:topic/*', element: <MultipleChoiceQuestion setLogin={setLogin} login={login} setUsername={setUsername} username={username} logout={logout}   /> },
    { path: '/lessons/:topic/:subcategory', element: <Lessons setLogin={setLogin} login={login} setUsername={setUsername} username={username} logout={logout}  /> },
    { path: '/Study/:topic/:subcategory', element: <StudyGuide setLogin={setLogin} login={login} setUsername={setUsername} username={username} logout={logout} /> },
    // { path: '/Home', element: <Categories login={login} categories={categories} setCategories={setCategories} username={username} /> },
    { path: '/Category/:name', element: <CategoryPage login={login} username={username} logout={logout}  /> },
  ]);

  return <ThemeProvider theme={responsiveTheme}>{element}</ThemeProvider>;
}

function Home(props) {
  // console.log('homepage');
  const { setLogin, setUsername, login, username, logout, categories, setCategories } = props;
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);
  const topics = [
    "Introduction",
    // "Earning Income",
    "Saving",
    "Spending",
    "Managing Credit",
  ];
  useEffect(() => {
    const getUnits = async (topics) => {
      const l = [];
      for (const topic of topics) {
        const output = await getUserProgress({ lesson: topic });
        l.push(output.unit);
      }
      setUnits(l);
    }
    getUnits(topics);
  }, [])
  const navigateToTopic = (topic, subcategory) => {
    const formattedTopic = topic.toLowerCase().replace(/\s+/g, '-');
    const formattedSubcategory = subcategory.toLowerCase().replace(/\s+/g, '-');
    navigate(`/lessons/${formattedTopic}/${formattedSubcategory}`);
  };

  const [subcat, setSubcat] = useState([]);
    useEffect(() => {
      async function getSubcatWrapper() {
        const c = [];
        for (const topic of topics) {
          const val = await getAllUnitByLesson(topic);
          const names = val.categories.map(category => category.Name.replace(/_/g, ' '));
          c.push(names);
        }
        setSubcat(c);
      }
      getSubcatWrapper();
    }, topics);

  return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={username} logout={logout}/>
        </div>
        {!login && (
            <div>
              <Landing />
            </div>
        )}
        {login && (
            <div style={{ marginTop: '0px' }}>
              <Lesson topics={topics} subcat={subcat} units={units} />
            </div>
        )}
      </div>
  );
}
export default App;