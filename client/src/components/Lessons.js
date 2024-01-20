import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Lessons = (props) => {
  const {
    login, username, setUsername, setLogin
    } = props;
  const { topic } = useParams();
  const formattedTopic = topic.replace(/-/g, ' ').replace(/(?:-| |\b)(\w)/g, function(key) { return key.toUpperCase()});

  return (
    <><Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={username} /><div>
          <h2>{formattedTopic}</h2>
          Placeholder text for lessons.
      </div></>
  );
};

export default Lessons;