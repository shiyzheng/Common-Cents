import Navbar from '../components/Navbar';
import '../styles/Leaderboards.css';
import { useState } from 'react';

import {
    getAllCategories,
    respondToCategorySubmit as respondToCategoryAdd,
    testReturnString,
} from '../api/category';


function testConst() {
    return "Test Const";
}

// original: AdminConsole(props)
export default function AdminConsole() {

    // useState() arg sets the default state
    
    // the default value in useState() is the text that is being typed
    // a submit operation may lead to a put or delete operation
    const [submitCategoryName, setSubmitCategory] = useState(''); // the text being typed

    const [error, setError] = useState(null);

    const [status, setStatus] = useState(false); // 'typing', 'submitting', or 'success'
    const [text, setText] = useState('original-text');

    const [categoryList, setCategoryList] = useState(['item1', 'item2']);

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

    function setListToAllCategories(allCategories) {
        const res = []
        allCategories.forEach((element) => {
            console.log(element.name);
            res.push(element.name)
        })
        setCategoryList(res);
    }

    // maps ids of buttons to the operation that button is responsible for
    const ID_TO_OPERATION = {
        '0': addCategoryNameForm,
        '1': addCategoryNameForm,
    }

    // invokes a function in this file that returns a list of objects
    // retrieved from the backend
    // can use the list of objects to set the state variables of this render
    async function handleCategoryNameSubmit(e) {
        e.preventDefault();
        console.log("event.target.id:::", e.target.id);
        console.log("onFinish id:::", e.target.id);
        setStatus('submitting');
        // const allCategories = await addCategoryNameForm(submitCategoryName);
        const allCategories = await ID_TO_OPERATION[e.target.id](submitCategoryName);
        setStatus('success');
        if (allCategories === null) {
            setText("failure, try again");
        } else {
            setListToAllCategories(allCategories);
            setText("Base Text");
        }
    }

    function handleSubmitCategoryTextArea(e) {
        setSubmitCategory(e.target.value);
    }

    const onFinish = (event) => {
        handleCategoryNameSubmit(event);
        console.log("event.target.id:::", id);
        console.log("onFinish id:::", id);
    }

    return (
        <>
            <Navbar />

            <h2>Submit Category</h2>
            <p>Create an educational category that can hold data such
                as questions.
            </p>
            {/* <form onSubmit={handleCategoryNameSubmit}> */}
            <textarea
                value={submitCategoryName}
                onChange={handleSubmitCategoryTextArea}
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

            {error != null &&
                <p> className="Error"
                    {error.message}
                </p>}
        </>
    )
}

// gets objects from the backend
async function addCategoryNameForm(categoryName) {
    console.log("Category name:::", categoryName);
    const allCategories = await respondToCategoryAdd(categoryName);
    return allCategories;
}

// export default AdminConsole;