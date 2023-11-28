import React, { useState, useEffect } from 'react';
import {
  useRoutes,
  Link,
} from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
// import Classrooms from './components/Classrooms';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Achievements from './pages/achievements';
import Leaderboards from './pages/leaderboards';
import CategoryView from './components/CategoryView';
import CategoryPage from './components/CategoryPage';

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
    { path: '/achievements', element: <Achievements setLogin={setLogin} login={login} setUsername={setUsername} username={username}  /> },
    { path: '/leaderboards', element: <Leaderboards setLogin={setLogin} login={login} setUsername={setUsername} username={username} /> },
    // { path: '/Home', element: <Categories login={login} categories={categories} setCategories={setCategories} username={username} /> },
    { path: '/Category/:name', element: <CategoryPage login={login} username={username} /> },
  ]);
  return element;
}

function Home(props) {
  // console.log('homepage');
  const { login, username, logout, categories, setCategories } = props;
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
        <div>
          <div>
            Welcome
            {' '}
            {username}
          </div>
          <button className="btn btn-outline-danger float-right" type="button" onClick={() => logout()}>Logout</button>
          <CategoryView categories={categories} setCategories={setCategories} />
        </div>
      )}
    </div>
  );
}
export default App;