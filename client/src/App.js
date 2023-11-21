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

function App() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const intervalID = setInterval(() => {
//       const check = async () => {
//         const user = await axios.get('/account/isLogged');
//         if (user.data == null || user.data === '') {
//           setLogin(false);
//         } else {
//           setUsername(user.data);
//           setLogin(true);
//         }
//       };
//       check();
//     }, 2000);
//     return () => clearInterval(intervalID);
//   }, []);

  const logout = async () => {
    await axios.post('/account/logout');
    setUsername('');
    setLogin(false);
  };

  const element = useRoutes([{ path: '/', element: <Home login={login} username={username} logout={logout} /> },
    { path: '/Login', element: <Login setLogin={setLogin} login={login} setUsername={setUsername} setPassword={setPassword} username={username} password={password} /> },
    { path: '/Signup', element: <Signup setLogin={setLogin} login={login} setUsername={setUsername} setPassword={setPassword} username={username} password={password} /> },
    { path: '/profile/:id', element: <Profile login={login} /> },
    { path: '/achievements', element: <Achievements  /> },
    { path: '/leaderboards', element: <Leaderboards  /> },
    // { path: '/Home', element: <Categories login={login} categories={categories} setCategories={setCategories} username={username} /> },
    // { path: '/Category/:id', element: <CategoryView login={login} username={username} /> },
  ]);
  return element;
}

function Home(props) {
  // console.log('homepage');
  const { login, username, logout } = props;
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
          <Link to="/home">Categories</Link>
        </div>
      )}
    </div>
  );
}
export default App;