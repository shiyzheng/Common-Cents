import React, { useEffect } from 'react';
import {
  Link, useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { getAllCategories } from '../api/category';

function CategoryView(props) {
  const {
    categories, setCategories,
  } = props;

  const navigate = useNavigate();

  useEffect(() => {
    async function getCategoryWrapper() {
        const response = await getAllCategories();
        const topics = []
        Object.entries(response).forEach((value) => {
            topics.push(value[1].name);
        })
        // setProfile(nums);
        // setCategories(response.data);
        // console.log(response);
        setCategories(topics);
    }
    getCategoryWrapper();
}, [categories.length]);

  return (
    <div>
        {categories.map((name, index) => (
            <li key={index}><Link to={`/Category/${name}`}>{name}</Link></li>
          ))}
    </div>
  );
}

export default CategoryView;