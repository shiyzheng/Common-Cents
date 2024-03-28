import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/MCQ.css'; 
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getUserProgress, updateUserProgress, checkAchievements, postDifficultyArray, pullDifficultyArray, addPointsToUser } from '../api/users';
import { getQuestionsByLessonAndProgress } from '../api/category';
import {theme} from "../App";
import {ThemeProvider} from "@mui/material/styles";
import _ from 'lodash';
import Confetti from 'react-confetti';
import {Button} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PublishIcon from '@mui/icons-material/Publish';
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function MultipleChoiceQuestion(props) {
  const {
    login, username, setUsername, setLogin, logout
  } = props;
  const [correctCount, setCorrectCount] = useState(0);
  const [isReview, setIsReview] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const location = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const params = new URLSearchParams(location.search);
  const lesson = parseInt(params.get('lesson'));
  const level = parseInt(params.get('level'));
  const [totalLessons, setTotalLessons] = useState(0);

  useEffect(() => {
    const fetchTotalLessons = async () => {
      try {
        const getTotalLessons = async level => {
          if (level === 1 || level === 2) {
            return 3;
          } else if (level === 3) {
            return 4;
          } else {
            return 3;
          }
        }
        const total = await getTotalLessons(level);
        setTotalLessons(total);
      } catch (error) {
        console.error('Error fetching total lessons:', error);
      }
    };

    fetchTotalLessons();
  }, [level]);

  const [showPopup, setShowPopup] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  function handleWindowSize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    console.log(window.innerWidth, window.innerHeight);
  }
  const [newAchievement, setNewAchievement] = useState([]);
  const [showAchievement, setShowAchievement] = useState(false);

  const navigate = useNavigate();
  const { topic } = useParams();

  const NumberedIcon = ({ number }) => (
      <Box position="relative" display="inline-flex" style={{ marginRight: '10px' }}>
        <svg height="24" width="24" style={{ color: theme.palette.warning.main, opacity: 0.25 }}>
          <circle cx="12" cy="12" r="10" fill="currentColor" />
        </svg>
        <Typography
            variant="caption"
            component="div"
            color="text.primary"
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          {number}
        </Typography>
      </Box>
  );

  useEffect(() => {
    if (sessionStorage.getItem('app-token') === null) {
      navigate('/');
    }
  }, []);
  
  useEffect(() => {
    const fetchQuestionsFromAPI = async () => {
      try {
        const output = await getUserProgress({lesson:topic});
        const response = await getQuestionsByLessonAndProgress({lesson:topic, progress:output});
        response.questions.forEach(element => {
          element.Answers = _.shuffle(element.Answers);
        });
        setQuestions(response.questions);
        console.log(response.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestionsFromAPI();
  }, []);

  useEffect(() => {
    setSelectedOptions(prevOptions => {
      const updatedOptions = [...prevOptions];
      updatedOptions[questions.length] = null;
      return updatedOptions;
    });
    if (currentQuestionIndex < selectedOptions.length && selectedOptions[currentQuestionIndex] != null) {
      setSelectedOption(selectedOptions[currentQuestionIndex]);
    } else {
      setSelectedOption("");
    }
    if (currentQuestionIndex < questions.length && currentQuestionIndex >= 0) {
      setQuestion(questions[currentQuestionIndex].Question);
      setOptions(questions[currentQuestionIndex].Answers);
      var i, x = document.getElementsByClassName("step");
      for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
        if (isReview && selectedOptions[i] != questions[i].Correct) {
          x[i].className += " inc";
        } else if (selectedOptions[i] != null && selectedOptions[i] != undefined) {
          x[i].className += " finish";
        }
      }
      x[currentQuestionIndex].className += " active";
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case '1':
          handleOptionSelect(options[0]);
          break;
        case '2':
          handleOptionSelect(options[1]);
          break;
        case '3':
          if (options[2]) {
            handleOptionSelect(options[2]);
          }
          break;
        case 'Enter':
          if (currentQuestionIndex < questions.length - 1) {
            handleNextQuestion();
          } else {
            handleSubmit();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [options, currentQuestionIndex, questions.length]);

  const handleOptionSelect = (option) => {
    setSelectedOptions(prevOptions => {
      const updatedOptions = [...prevOptions];
      updatedOptions[currentQuestionIndex] = option;
      return updatedOptions;
    });
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleSubmit = () => {
    setIsReview(true);
    let correct  = 0;
    selectedOptions.forEach((o, index) => {
      if (index < questions.length) {
        if (o === questions[index].Correct) {
          correct++;
        }
      }
      
    });
    setCurrentQuestionIndex(-1);
    setCorrectCount(correct);
    setSelectedOptions(prevOptions => {
      const updatedOptions = [...prevOptions];
      updatedOptions[currentQuestionIndex + 1] = null;
      return updatedOptions;
    });
    if (correct / questions.length >= 0.6) {
      const updateUser = async () => {
        try {
          const correctArray = [];
          const wrongArray = [];
          selectedOptions.forEach((o, index) => {
            if (index < questions.length) {
              if (o !== questions[index].Correct) {
                wrongArray.push(questions[index]);
              } else {
                correctArray.push(questions[index]);
              }
            }
            
          });
          let diff = ''
          switch (lesson) {
            case 1:
              diff = 'Beginner';
              break;
            default:
              diff = 'Waystage';
          }
          console.log(correctArray);
          const response3 = await pullDifficultyArray({ lesson:topic, correct: correctArray })
          const response1 = await postDifficultyArray({lesson:topic, difficulty: diff, wrong: wrongArray});
          const response2 = await updateUserProgress({lesson:topic});
          await addPointsToUser({lesson:topic, points: correct * 100});
          const response = await checkAchievements({score: correct / questions.length, quizNum: lesson});
          console.log(correct / questions.length, lesson);
          if (response.returnedAchievements.length > 0) {
          setNewAchievement(response.returnedAchievements);
          setShowAchievement(true);
          setTimeout(() => {
            setShowAchievement(false);
          }, 5000);
        }
          handleWindowSize();
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 5000);
        } catch (err) {
          console.log(err);
        }  
      }
      updateUser();
    }
    // const updateAchievements = async () => {
    //   try {
        
    //     console.log(response, "updated asds");
    //   } catch (err) {
    //     console.log(err);
    //   }  
    // }
    // updateAchievements();
  };

  const levelNames = {
    1: 'Beginner',
    2: 'Waystage',
    3: 'Advanced',
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  return (
      <ThemeProvider theme={theme}>
    <>
    <div>
      <Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={sessionStorage.getItem('username')} logout = {logout} />
    {showPopup && <Confetti width = {windowSize.width} height = {windowSize.height}/>}
    <div className={`popup-notification ${showAchievement ? 'show' : ''}`}>
      {showAchievement && (
          <Alert severity="success">
            <AlertTitle>Congratulations, you earned an achievement(s)!</AlertTitle>
            {newAchievement.map((ach, index) => (
                <p key={index}>{ach}</p>
            ))}
          </Alert>
      )}
      </div>
    </div>
      <div className="container">
        <Typography variant="h2" style={{marginTop: '20px'}}>
          <span style={{fontWeight: 700}}>Topic:</span> {topic}
          <br/>
          <span style={{fontWeight: 700}}>Lesson:</span> {lesson} of {totalLessons}
          <br/>
          <span style={{fontWeight: 700}}>Level:</span> {levelNames[level]}
        </Typography>
        {currentQuestionIndex >= 0 && currentQuestionIndex < questions.length ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {Array.from({ length: questions.length }, (_, index) => (
            <span key={index} className="step"></span>
          ))}
        </div>
        ) : (<></>)}
        
        {isReview ? (<>
        
        {currentQuestionIndex < 0 ? (
          <>
            <Typography
                component="h2"
                variant="h2"
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: 'center',
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontWeight: 1000,
                  fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.4rem' },
                  color: correctCount <= 5 ? theme.palette.warning.main : theme.palette.success.main,
                  mt: 3,
                  mb: 2,
                }}
            >
              {correctCount} / {questions.length} correct
            </Typography>
            <Typography
                component="h2"
                variant="h2"
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: 'center',
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontWeight: 1000,
                  fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.4rem' },
                  color: correctCount <= 5 ? theme.palette.warning.main : theme.palette.success.main,
                  mt: 0,
                  mb: 2,
                }}
            >
              {correctCount <= 5 ? "Better luck next time!" : "Congrats! You've advanced to the next lesson."}
            </Typography>
          <Button
              variant="contained"
              startIcon={<PublishIcon />}
              style={{backgroundColor: theme.palette.info.main, color: 'white'}}
              onClick={handleNextQuestion}>
            Review
          </Button>
          </>
        ) : (
            <>
              <Box className="question" sx={{
                padding: '16px',
                backgroundColor: '#f5f5f5',
                margin: '16px 0' }}>
                <Typography variant="body1">
                  {question}
                </Typography>
              </Box>
              <ul className="options-list">
                {options.map((option) => (
                    <li
                        key={option.id}
                        className={`option-box
                    ${questions[currentQuestionIndex].Correct === option
                            ? 'incorrect'
                            : ''
                        } 
                    ${selectedOptions[currentQuestionIndex] === option
                            ? 'selected'
                            : ''}
                    ${selectedOptions[currentQuestionIndex] === option && selectedOptions[currentQuestionIndex] === questions[currentQuestionIndex].Correct
                            ? 'correct'
                            : ''}
                      
                      `}
                    >
                      {option}
                    </li>
                ))}
              </ul>

              <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                {currentQuestionIndex > 0 && (
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIosNewIcon/>}
                        style={{backgroundColor: theme.palette.warning.main, marginRight: '10px'}}
                        onClick={handlePreviousQuestion}>
                      Back
                    </Button>
                )}
                {currentQuestionIndex < questions.length - 1 ? (
                    <Button
                        variant="contained"
                        startIcon={<ArrowForwardIosIcon/>}
                        style={{backgroundColor: theme.palette.secondary.main, color: 'white', marginLeft: '10px'}}
                        onClick={handleNextQuestion}>
                      Next
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        startIcon={<PublishIcon/>}
                        style={{backgroundColor: theme.palette.success.main, color: 'white'}}
                        onClick={navigate('/')}>
                      Return
                    </Button>
                )}
              </div>

            </>
        )}
            </>)

            : (<>
              <Box className="question" sx={{
                padding: '16px',
                backgroundColor: '#f5f5f5',
                margin: '16px 0' }}>
                <Typography variant="body1">
                  {question}
                </Typography>
              </Box>
              <ul className="options-list" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {options.map((option, index) => (
                    <Button variant="contained"
                            className={"button"}
                            key={option.id}
                            size="large"
                            onClick={() => handleOptionSelect(option)}
                            style={{
                              backgroundColor: selectedOption === option ? 'lightblue' : 'white',
                              marginBottom: '10px',
                              color: 'black',
                              textTransform: 'none'
                            }}>
                      <NumberedIcon number={index + 1} />
                      {option.trim().toLowerCase() === 'true' ? 'True' : option.trim().toLowerCase() === 'false' ? 'False' : option}
                    </Button>
                ))}
              </ul>

              <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                {currentQuestionIndex > 0 && (
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIosNewIcon/>}
                        style={{backgroundColor: theme.palette.warning.main, marginRight: '10px'}}
                        onClick={handlePreviousQuestion}>
                      Back
                    </Button>
                )}
                {currentQuestionIndex < questions.length - 1 ? (
                    <Button
                        variant="contained"
                        startIcon={<ArrowForwardIosIcon/>}
                        style={{backgroundColor: theme.palette.secondary.main, color: 'white', marginLeft: '10px'}}
                        onClick={handleNextQuestion}>
                      Next
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        startIcon={<KeyboardReturnIcon/>}
                        style={{backgroundColor: theme.palette.success.main, color: 'white'}}
                        onClick={handleSubmit}>
                      Submit
                    </Button>
                )}
              </div>

            </>)}

      </div>
    </>
      </ThemeProvider>
  );
}

export default MultipleChoiceQuestion;