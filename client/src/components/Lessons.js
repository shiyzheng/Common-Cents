import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Lessons.css';
import { getUserProgress } from '../api/users';

const Lessons = (props) => {
  const {
    login, username, setUsername, setLogin, logout
    } = props;
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const { topic, subcategory } = useParams();
  const formattedTopic = topic.replace(/-/g, ' ').replace(/(?:-| |\b)(\w)/g, function(key) { return key.toUpperCase()});
  const formattedSubcategory = subcategory.replace(/-/g, ' ').replace(/(?:-| |\b)(\w)/g, function(key) { return key.toUpperCase()});
  const lessonList = [
    'Lesson 1',
    'Lesson 2',
    'Lesson 3',
  ];

  const lessonList2 = [
    'Lesson 1',
    'Lesson 2',
    'Lesson 3',
    'Lesson 4'];

    useEffect(() => {
      const getLevels = async () => {
        try {
          const output = await getUserProgress({lesson:formattedTopic});
          setProgress(output["level"]);
        } catch (error) {
          console.error('Error fetching progress:', error);
        }
      }
      getLevels();
    }, []);
    // console.log(progress);


    const renderLessonLinks = (level) => {
      const formattedLevel = level.toLowerCase().replace(/\s+/g, '-');
      // console.log(formattedLevel);
      // console.log(parseInt(formattedLevel[formattedLevel.length - 1]));
      return lessonList.map((lesson, index) => (
        (index) + ((parseInt(formattedLevel[formattedLevel.length - 1]) - 1) * 3) == progress ? 
        <li key={index}>
          {/* <button className="button" onClick={() => navigate(`/lessons/${topic}/${formattedLevel}/${index + 1}`)}> */}
          <button className="button" onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)}>
            {`${lesson}`}
          </button>
          <h6>{" "}</h6>
        </li>

        : ((index) + ((parseInt(formattedLevel[formattedLevel.length - 1]) - 1) * 3) < progress
        ?
        <li key={index}>
          {/* <button className="button" onClick={() => navigate(`/lessons/${topic}/${formattedLevel}/${index + 1}`)}> */}
          <button className="button" onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)} style={{ pointerEvents: 'none',  backgroundColor: 'blue' }}>
            {`${lesson}`}
          </button>
          <h6>{" "}</h6>
        </li>
        :
        <li key={index}>
          {/* <button className="button" onClick={() => navigate(`/lessons/${topic}/${formattedLevel}/${index + 1}`)}> */}
          <button className="button" onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)} style={{ pointerEvents: 'none', opacity: 0.5 }}>
            {`${lesson}`}
          </button>
          <h6>{" "}</h6>
        </li>)
      ));
    };

    const renderLessonLinks2 = (level) => {
      const formattedLevel = level.toLowerCase().replace(/\s+/g, '-');
      return lessonList2.map((lesson, index) => (
        (index) + ((parseInt(formattedLevel[formattedLevel.length - 1]) - 1) * 3) == progress ? 
        <li key={index}>
          {/* <button className="button" onClick={() => navigate(`/lessons/${topic}/${formattedLevel}/${index + 1}`)}> */}
          <button className="button" onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)}>
            {`${lesson}`}
          </button>
          <h6>{" "}</h6>
        </li>

        : ((index) + ((parseInt(formattedLevel[formattedLevel.length - 1]) - 1) * 3) < progress
        ?
        <li key={index}>
          {/* <button className="button" onClick={() => navigate(`/lessons/${topic}/${formattedLevel}/${index + 1}`)}> */}
          <button className="button" onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)} style={{ pointerEvents: 'none',  backgroundColor: 'blue' }}>
            {`${lesson}`}
          </button>
          <h6>{" "}</h6>
        </li>
        :
        <li key={index}>
          {/* <button className="button" onClick={() => navigate(`/lessons/${topic}/${formattedLevel}/${index + 1}`)}> */}
          <button className="button" onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)} style={{ pointerEvents: 'none', opacity: 0.5 }}>
            {`${lesson}`}
          </button>
          <h6>{" "}</h6>
        </li>)
      ));
    };

  return (
    <><Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={sessionStorage.getItem('username')} logout = {logout}/><div>
          <div className="lessons-container">
      <h2>{formattedTopic}, {formattedSubcategory}</h2>
      <div className="lessons-wrapper">

      <div className="level-container">
        <h3>Level 1</h3>
        <ul>{renderLessonLinks('Level 1')}</ul>
      </div>
          
      <div className="level-container">
        <h3>Level 2</h3>
        <ul>{renderLessonLinks('Level 2')}</ul>
      </div>

      <div className="level-container">
        <h3>Level 3</h3>
        <ul>{renderLessonLinks2('Level 3')}</ul>
      </div>

      </div>
    </div>
      </div></>
  );
};

export default Lessons;