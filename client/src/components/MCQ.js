import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/MCQ.css'; 
import { useLocation } from 'react-router-dom';
import { getUserProgress } from '../api/users';
import { getQuestionsByLessonAndProgress } from '../api/category';


function MultipleChoiceQuestion(props) {
  const {
    login, username, setUsername, setLogin, logout
  } = props;
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
    if (currentQuestionIndex < questions.length) {
      setQuestion(questions[currentQuestionIndex].Question);
      setOptions(questions[currentQuestionIndex].Answers);
    }
  }, [currentQuestionIndex, questions]);
  
  console.log(lesson);
  console.log(level);
  console.log(questions);
  console.log(options);
  console.log(question);
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
    // Move to the next question if there is one
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleSubmit = () => {
    // Add logic to handle submission, check the selected option, etc.
    console.log(`Selected option: ${selectedOption}`);
  };

  return (
    <>
      <Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={sessionStorage.getItem('username')} logout = {logout} />
      <div className="container">
        <h2>Multiple Choice Question</h2>
        <div className="question">
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
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNextQuestion}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </>
  );
}

export default MultipleChoiceQuestion;