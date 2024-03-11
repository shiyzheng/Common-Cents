import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/MCQ.css'; 
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getUserProgress, updateUserProgress } from '../api/users';
import { getQuestionsByLessonAndProgress } from '../api/category';
import { set } from 'mongoose';
import _ from 'lodash';
import Confetti from 'react-confetti';

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
  // const [newAchievement, setNewAchievement] = useState("");

  const navigate = useNavigate();
  const { topic } = useParams();

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
        // console.log(response.questions);
        // console.log("shuffle");
        response.questions.forEach(element => {
          // console.log(_.shuffle(element.Answers));
          element.Answers = _.shuffle(element.Answers);
          // console.log(element.Answers);
        });
        setQuestions(response.questions);
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
        x[i].className = x[i].className.replace(" finish", "");
        if (selectedOptions[i] != null && selectedOptions[i] != undefined) {
          x[i].className += " finish";
        }
      }
      x[currentQuestionIndex].className += " active";
    }
  }, [currentQuestionIndex, questions]);
  
  // console.log(lesson);
  // console.log(level);
  // console.log(questions);
  // console.log(options);
  // console.log(question);
  // console.log(selectedOptions);
  // const options = [
  //   { id: 1, text: "Option A" },
  //   { id: 2, text: "Option B" },
  //   { id: 3, text: "Option C" },
  //   { id: 4, text: "Option D" },
  // ];

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
    // setSelectedOption("");
  };
  
  
  const handleSubmit = () => {
    setIsReview(true);
    let correct  = 0;
    selectedOptions.forEach((o, index) => {
      if (index < questions.length) {
        console.log("answer");
        console.log(o);
        console.log(questions)
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
          const response = await updateUserProgress({lesson:topic});
          handleWindowSize();
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 5000);
          console.log(response);
        } catch (err) {
          console.log(err);
        }  
      }
      updateUser();
    }
    const updateAchievements = async () => {
      try {
        // const response = await checkAchievements();
        const response = "Achieve 1,000 Points";
        if (response) {
          
        }
        console.log(response);
      } catch (err) {
        console.log(err);
      }  
    }
    updateAchievements();
  };
  // console.log(showPopup, windowSize.width, windowSize.height, "new123");
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
    // console.log(selectedOptions);
    // if (currentQuestionIndex - 1 < selectedOptions.length && selectedOptions[currentQuestionIndex - 1] != null) {
    //   setSelectedOption(selectedOptions[currentQuestionIndex - 1]);
    // } else {
    //   setSelectedOption("");
    // }
  };
  return (
    <>
    <div>
      <Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={sessionStorage.getItem('username')} logout = {logout} />
    {showPopup && <Confetti width = {windowSize.width} height = {windowSize.height}/>}
    </div>
      <div className="container">
        <h2>Lessons {lesson} Level {level} </h2>
        {currentQuestionIndex >= 0 && currentQuestionIndex < questions.length ? (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          {Array.from({ length: questions.length }, (_, index) => (
            <span key={index} className="step"></span>
          ))}
        </div>
        ) : (<></>)}
        
        {isReview ? (<>
        
        {currentQuestionIndex < 0 ? (
          <>
          <p>{correctCount} / {questions.length} correct</p>
          <button onClick={handleNextQuestion}>Review</button>
          </>
        ) : (
          <><div className="question">
              <p>{question}</p>
            </div>
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
            {currentQuestionIndex > 0 && (
              <button onClick={handlePreviousQuestion}>Back</button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={handleNextQuestion}>Next</button>
            ) : (
              <button onClick={() => navigate(`/`)}>Return</button>
            )} </>
            )}
        </>) 
        
        : (<><div className="question">
          <p>{question}</p>
        </div>
        <ul className="options-list">
          {options.map((option) => (
            <li
              key={option.id}
              className={`option-box ${selectedOption === option ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
        {currentQuestionIndex > 0 && (
          <button onClick={handlePreviousQuestion}>Back</button>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNextQuestion}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )} </>) }
      </div>
    </>
  );
}

export default MultipleChoiceQuestion;