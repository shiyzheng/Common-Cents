import React, { useState, useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Achievements from './pages/achievements';
import Leaderboards from './pages/Leaderboards';
import CategoryPage from './components/CategoryPage';
import Account from './components/Account/Account';

import MultipleChoiceQuestion from './components/MCQ';
// import AdminConsole from './pages/AdminConsole';
import Lesson from './components/Lesson';
import Lessons from './components/Lessons';
import Study from './components/Study';
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
    { path: '/Study/:topic/:subcategory', element: <Study setLogin={setLogin} login={login} setUsername={setUsername} username={username} logout={logout} /> },
    // { path: '/Home', element: <Categories login={login} categories={categories} setCategories={setCategories} username={username} /> },
    { path: '/Category/:name', element: <CategoryPage login={login} username={username} logout={logout}  /> },
  ]);

  return <ThemeProvider theme={responsiveTheme}>{element}</ThemeProvider>;
}

function Home(props) {
  // console.log('homepage');
  const { setLogin, setUsername, login, username, logout, categories, setCategories } = props;
  const navigate = useNavigate();
  const [levels, setLevels] = useState([0, 0]);
  const topics = [
    "Introduction",
    // "Earning Income",
    "Saving",
    "Spending",
    "Managing Credit",
  ];
  // const subcategories = {
  //   "Earning Income": ["A", "B", "C"],
  //   "Saving": ["D", "E", "F"],
  //   "Spending": ["G", "H", "I"],
  //   "Investing": ["J", "K", "L"],
  //   "Managing Credit": ["M", "N", "O"],
  //   "Managing Risk": ["P", "Q", "R"],
  // };
  useEffect(() => {
    const getLevels = async (topic) => {
      try {
        console.log(typeof(topic));
        const output = await getUserProgress({lesson:topic});
        // console.log(output);
        // console.log(subIndex);
        // console.log(typeof(output["unit"]));
        // console.log(typeof(subIndex));
        // console.log(subIndex <= output["unit"]);]
        // console.log(output);
        setLevels(prevLevels => {
          const updatedLevels = [...prevLevels];
          updatedLevels[prevLevels.length] = output["unit"];
          return updatedLevels;
        });
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
    for (let i = 2; i < 3; i++) {
      getLevels(topics[i]);
    }
    // console.log(levels);
    
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
              {' '}
              <h2>Welcome to Common Cents!</h2>
            </div>
        )}
        {login && (
            <div style={{ marginTop: '0px' }}>
              <Lesson topics={topics} subcat={subcat} levels={levels} />
            </div>
        )}
      </div>
  );
}
export default App;