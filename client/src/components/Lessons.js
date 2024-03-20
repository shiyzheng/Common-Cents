import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Lessons.css';
import { getUserProgress } from '../api/users';
import {Button, Typography} from "@mui/material";
import {theme} from "../App";
import {ThemeProvider} from "@mui/material/styles";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {styled} from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

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
      if (sessionStorage.getItem('app-token') === null) {
        navigate('/');
      }
    }, []);

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

  const renderLessonLinks = (level) => {
  const formattedLevel = level.toLowerCase().replace(/\s+/g, '-');
  return lessonList.map((lesson, index) => (
    <ThemeProvider theme={theme}>
      {(index) + ((parseInt(formattedLevel[formattedLevel.length - 1]) - 1) * 3) == progress ?
      <li key={index}>
        <Button
            variant="contained"
            className="button"
            size="large"
            startIcon={<PlayCircleFilledWhiteIcon />}
            onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)}
            style={{ marginBottom: '10px' }}
        >
          {`${lesson}`}
        </Button>
      </li>

      : ((index) + ((parseInt(formattedLevel[formattedLevel.length - 1]) - 1) * 3) < progress
      ?
      <li key={index}>
        <Button variant="contained"
                className="button"
                size="large"
                startIcon={<CheckCircleIcon />}
                onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)}
                style={{ pointerEvents: 'none',  backgroundColor: theme.palette.success.main, marginBottom: '10px', color: 'white' }}>
          {`${lesson}`}
        </Button>
      </li>
      :
      <li key={index}>
        <Button variant="contained"
                className="button"
                size="large"
                startIcon={<PendingIcon />}
                onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)}
                style={{ pointerEvents: 'none', opacity: 0.25, marginBottom: '10px' }}>
          {`${lesson}`}
        </Button>
      </li>)}
    </ThemeProvider>
  ));
};

  const renderLessonLinks2 = (level) => {
  const formattedLevel = level.toLowerCase().replace(/\s+/g, '-');
  return lessonList2.map((lesson, index) => (
    <ThemeProvider theme={theme}>
      {(index) + ((parseInt(formattedLevel[formattedLevel.length - 1]) - 1) * 3) == progress ?
      <li key={index}>
        <Button variant="contained"
                className="button"
                size="large"
                startIcon={<PlayCircleFilledWhiteIcon />}
                onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)}
                style={{ marginBottom: '10px' }}>
          {`${lesson}`}
        </Button>
      </li>

      : ((index) + ((parseInt(formattedLevel[formattedLevel.length - 1]) - 1) * 3) < progress
      ?
      <li key={index}>
        <Button variant="contained"
                className="button"
                size="large"
                startIcon={<CheckCircleIcon />}
                onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)}
                style={{ pointerEvents: 'none',  backgroundColor: theme.palette.success.main, marginBottom: '10px', color: 'white' }}>
          {`${lesson}`}
        </Button>
      </li>
      :
      <li key={index}>
        <Button variant="contained"
                className="button"
                size="large"
                startIcon={<PendingIcon />}
                onClick={() => navigate(`/mcq/${formattedTopic}?lesson=${parseInt(lesson.match(/\d+/)[0])}&level=${parseInt(level.match(/\d+/)[0])}`)}
                style={{ pointerEvents: 'none', opacity: 0.25, marginBottom: '10px' }}>
          {`${lesson}`}
        </Button>
      </li>)}
    </ThemeProvider>
  ));
};

  const interpolateColor = (color1, color2, factor) => {
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);

  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const getGradient = (progress) => {
  const color1 = theme.palette.warning.main;
  const color2 = theme.palette.success.main;
  const progressPercentage = progress / 100;
  return interpolateColor(color1, color2, progressPercentage);
};

  const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 10,
  borderRadius: 5,
  width: '60%',
  margin: '0 auto',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar1Determinate}`]: {
    borderRadius: 5,
    backgroundColor: getGradient(value),
  },
}));

  const ProgressBarWithLabel = ({ value }) => {
  console.log(getGradient(value))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <BorderLinearProgress variant="determinate" value={value} />
      <span style={{ marginTop: '10px' }}>
        <b>
        {value === 100 ? "Congratulations! You've mastered this topic." : `${value}% Complete`}
        </b>
        </span>
    </div>
  );
};

  return (
      <ThemeProvider theme={theme}>
        <div>
          <Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={sessionStorage.getItem('username')} logout = {logout}/>
          <div className="lessons-container">
            <Typography variant="h1" style={{marginTop: '20px'}}>
              <span style={{fontWeight: 700}}>Unit:</span> {formattedTopic}
              <br/>
              <span style={{fontWeight: 700}}>Topic:</span> {formattedSubcategory}
            </Typography>

            <div style={{marginTop: '20px'}}>
              <Button variant="contained" color="info" onClick={() => navigate(`/study/${formattedTopic}`)}>
                Study Guide
              </Button>
            </div>

            <div style={{marginTop: '25px'}}>
              <ProgressBarWithLabel value={43} />
            </div>

            <div className="lessons-wrapper">
              <div className="level-container">
                <Typography variant="h2" style={{marginTop: '20px'}}>
                  <span style={{fontWeight: 700, marginBottom: '5px'}}>Beginner</span>
                  <ul style={{ paddingTop: '10px' }}>{renderLessonLinks('Level 1')}</ul>
                </Typography>
              </div>

              <div className="level-container">
                <Typography variant="h2" style={{marginTop: '20px'}}>
                  <span style={{fontWeight: 700, marginBottom: '5px'}}>Waystage</span>
                  <ul style={{ paddingTop: '10px' }}>{renderLessonLinks('Level 2')}</ul>
                </Typography>
              </div>

              <div className="level-container">
                <Typography variant="h2" style={{marginTop: '20px'}}>
                  <span style={{fontWeight: 700, marginBottom: '5px'}}>Advanced</span>
                  <ul style={{ paddingTop: '10px' }}>{renderLessonLinks2('Level 3')}</ul>
                </Typography>
              </div>

            </div>
          </div>
        </div>
      </ThemeProvider>
  );
};

export default Lessons;