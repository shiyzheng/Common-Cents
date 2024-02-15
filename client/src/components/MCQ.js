import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/MCQ.css'; 
import { useLocation } from 'react-router-dom';
import { getUserProgress } from '../api/users';
import { getQuestionsByLessonAndProgress } from '../api/category';
import { set } from 'mongoose';


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
  useEffect(() => {
    const fetchQuestionsFromAPI = async () => {
      try {
        const output = await getUserProgress({lesson:"Spending"});
        const response = await getQuestionsByLessonAndProgress({lesson:"Spending", progress:output});
        setQuestions(response.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestionsFromAPI();
  }, []);

  useEffect(() => {
    if (currentQuestionIndex < questions.length && currentQuestionIndex >= 0) {
      setQuestion(questions[currentQuestionIndex].Question);
      setOptions(questions[currentQuestionIndex].Answers);
    }
  }, [currentQuestionIndex, questions]);
  
  console.log(lesson);
  console.log(level);
  console.log(questions);
  console.log(options);
  console.log(question);
  console.log(selectedOptions);
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
  };

  const handleSubmit = () => {
    setIsReview(true);
    let correct  = 0;
    selectedOptions.forEach((selectedOption, index) => {
      if (selectedOption === questions[index].Correct) {
        correct++;
      }
    });
    setCurrentQuestionIndex(-1);
    setCorrectCount(correct);
    setSelectedOptions(prevOptions => {
      const updatedOptions = [...prevOptions];
      updatedOptions[currentQuestionIndex + 1] = null;
      return updatedOptions;
    });
  };
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
    if (currentQuestionIndex < selectedOptions.length && selectedOptions[currentQuestionIndex] != null) {
      setSelectedOption(selectedOptions[currentQuestionIndex]);
    } else {
      setSelectedOption("");
    }
  };
  return (
    <>
      <Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={sessionStorage.getItem('username')} logout = {logout} />
      <div className="container">
        <h2>Lesson {lesson} Level {level} </h2>
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
              <button>Return</button>
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