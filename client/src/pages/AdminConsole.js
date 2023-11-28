import Navbar from '../components/Navbar';
import '../styles/Leaderboards.css';
import { useState } from 'react';

import * as qs from 'qs';

import {
    getAllCategories,
    respondToCategoryAdd as respondToCategoryAdd,
    respondToCategoryDelete,
    respondToCategoryGet,
    putCategoryPath,
    deleteCategoryPath,
} from '../api/category';


export default function AdminConsole() {

    // useState() arg sets the default state
    
    // the default value in useState() is the text that is being typed
    // a submit operation may lead to a put or delete operation
    const [submitCategoryName, setSubmitCategoryName] = useState(''); // the text being typed

    const [questionName, setQuestionName] = useState('');
    const [possibleAnswer0, setPossibleAnswer0] = useState('');
    const [possibleAnswer1, setPossibleAnswer1] = useState('');
    const [possibleAnswer2, setPossibleAnswer2] = useState('');
    const [possibleAnswer3, setPossibleAnswer3] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');


    const [error, setError] = useState(null);

    const [status, setStatus] = useState(false); // 'typing', 'submitting', or 'success'
    const [text, setText] = useState('original-text');

    const [categoryList, setCategoryList] = useState(['item1', 'item2']);

    const [categoryToView, setCategoryToView] = useState("no category to view");

    if (status === 'success') {
        return (
            <>
                <ul>
                    <li>{text}</li>
                    {categoryList.map(item => <li>{item}</li>)}
                </ul>
            </>
        )
    }
    if (status === 'view') {
        return (
            <>
                <ul>
                    <li>{text}</li>
                    <li>{categoryToView}</li>
                </ul>
            </>
        )
    }

    function setListToAllCategories(allCategories) {
        const res = []
        allCategories.forEach((element) => {
            res.push(element.name)
        })
        setCategoryList(res);
    }

    // maps ids of buttons to the operation that button is responsible for
    const ID_TO_OPERATION = {
        '0': putCategoryItem,
        '1': deleteCategoryItem,
        // '2': viewCategory,
    }

    function createCategoryObject() {
        const new_question = {
            question: questionName,
            possibleAnswers: [possibleAnswer0, possibleAnswer1, possibleAnswer2,
                possibleAnswer3],
            correctAnswer: correctAnswer,
        }
        const new_questions = [];
        if (questionName != "" && questionName != null) {
            new_questions.push(new_question);
        }
        const new_category = {
            name: submitCategoryName,
            questions: new_questions,
        }
        return new_category;
    }


    // invokes a function in this file that returns a list of objects
    // retrieved from the backend
    // can use the list of objects to set the state variables of this render
    async function handleCategoryNameSubmit(e) {
        e.preventDefault();
        setStatus('submitting');
        const new_category = createCategoryObject();
        await ID_TO_OPERATION[e.target.id](new_category);
        const allCategories = await getAllCategoriesForRender();
        setStatus('success');
        if (allCategories === null) {
            setText("failure, try again");
        } else {
            setListToAllCategories(allCategories);
            setText("Base Text");
        }
    }

    async function handleCategoryView(e) {
        e.preventDefault();
        setStatus('submitting');
        const category = await getCategoryForRender(submitCategoryName)
        setStatus('view');
        if (category === null) {
            setText("category view failure");
        } else {
            setCategoryToView(JSON.stringify(category));
            setText("Category View");
        }
    }

    function handleSubmitCategoryTextArea(e) {
        setSubmitCategoryName(e.target.value);
    }

    function handleQuestionNameTextArea(e) {
        setQuestionName(e.target.value);
    }

    function handlePossibleAnswer0TextArea(e) {
        setPossibleAnswer0(e.target.value);
    }
    function handlePossibleAnswer1TextArea(e) {
        setPossibleAnswer1(e.target.value);
    }
    function handlePossibleAnswer2TextArea(e) {
        setPossibleAnswer2(e.target.value);
    }
    function handlePossibleAnswer3TextArea(e) {
        setPossibleAnswer3(e.target.value);
    }

    function handleCorrectAnswerTextArea(e) {
        setCorrectAnswer(e.target.value);
    }

    return (
        <>
            <Navbar />

            <h2>Submit Category</h2>
            <p>Create an educational category that can hold data such
                as questions.
            </p>
            {/* <form onSubmit={handleCategoryNameSubmit}> */}
            Category
            <br />
            <textarea
                value={submitCategoryName}
                onChange={handleSubmitCategoryTextArea}
                disabled={status === 'submitting'}
            />

            <br />
            Question
            <br />
            <textarea
                value={questionName}
                onChange={handleQuestionNameTextArea}
                disabled={status === 'submitting'}
            />
            <br />
            Possible Answers
            <br />
            <textarea
                value={possibleAnswer0}
                onChange={handlePossibleAnswer0TextArea}
                disabled={status === 'submitting'}
            />
            <br />
            <textarea
                value={possibleAnswer1}
                onChange={handlePossibleAnswer1TextArea}
                disabled={status === 'submitting'}
            />
            <br />
            <textarea
                value={possibleAnswer2}
                onChange={handlePossibleAnswer2TextArea}
                disabled={status === 'submitting'}
            />
            <br />
            <textarea
                value={possibleAnswer3}
                onChange={handlePossibleAnswer3TextArea}
                disabled={status === 'submitting'}
            />
            <br />
            Correct Answer
            <br />
            <textarea
                value={correctAnswer}
                onChange={handleCorrectAnswerTextArea}
                disabled={status === 'submitting'}
            />

            <br />
            <button
                onClick={handleCategoryNameSubmit}
                id={'0'}
                disabled={
                    submitCategoryName.length === 0 ||
                    status === 'submitting'
                }>
                Add
            </button>
            <button
                onClick={handleCategoryNameSubmit}
                id={'1'}
                disabled={
                    submitCategoryName.length === 0 ||
                    status === 'submitting'
                }>
                Delete
            </button>
            <button
                onClick={handleCategoryView}
                id={'2'}
                disabled={
                    submitCategoryName.length === 0 ||
                    status === 'submitting'
                }>
                View
            </button>



            {error != null &&
                <p> className="Error"
                    {error.message}
                </p>}
        </>
    )
}

// gets objects from the backend
// is invoked by a react handler in response to some event
// in order to add a category
// this function returns a list of all the categories in JSON objects
async function putCategoryItem(category) {
    await putCategoryPath(category); 
}

async function deleteCategoryItem(category) {
    await deleteCategoryPath(category);
}

async function getCategoryForRender(categoryName) {
    const category = await respondToCategoryGet(categoryName);
    return category;
}

async function getAllCategoriesForRender() {
    return await getAllCategories();
}