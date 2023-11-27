import React, { useState, useEffect} from 'react';
import {
  Link, useNavigate, useParams
} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { getCategoryByName } from '../api/category';

function CategoryPage(props) {
  const {
    login, username
  } = props;

  const { name } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function getCategoryWrapper() {
        const response = await getCategoryByName(name);
        const topics = []
        console.log(response.questions);
        Object.entries(response.questions).forEach((value) => {
            // console.log(value);
            topics.push([value[1].question, value[1].possibleAnswers, value[1].correctAnswer]);
        })

        // setProfile(nums);
        // setCategories(response.data);
        // console.log(response);
        setQuestions(topics);
    }
    getCategoryWrapper();
}, [questions.length]);

  const clickedButton = () => {
    
  };

  return (
    <div>
        <Navbar />
        <h2>{name}</h2>
        {questions.map((value, index) => (
            <li key={index}>Question: {value[0]}, Possible Answers: {value[1]}</li>
            
          ))}
    </div>
  );
}

export default CategoryPage;