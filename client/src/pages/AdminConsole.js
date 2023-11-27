import Navbar from '../components/Navbar';
import '../styles/Leaderboards.css';
import { useState } from 'react';

import {
    getAllCategories,
    respondToCategorySubmit,
    testReturnString,
} from '../api/category';


function testConst() {
    return "Test Const";
}

// original: AdminConsole(props)
export default function AdminConsole() {

    // useState() arg sets the default state
    
    const [categoryName, setCategoryName] = useState(''); // the text being typed
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(false); // 'typing', 'submitting', or 'success'
    const [text, setText] = useState('original-text');

    const [listOfItems, setListOfItems] = useState(['item1', 'item2']);

    const jsxList = listOfItems.map(item => <li>{item}</li>);

    if (status === 'success') {
        return (
            <>
                <ul>
                    <li>{text}</li>
                    {listOfItems.map(item => <li>{item}</li>)}
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
        setListOfItems(res);
    }

    // invokes a function in this file that returns a list of objects
    // retrieved from the backend
    // can use the list of objects to set the state variables of this render
    async function handleCategoryNameSubmit(e) {
        e.preventDefault();
        setStatus('submitting');
        const allCategories = await submitCategoryNameForm(categoryName);
        setStatus('success');
        if (allCategories === null) {
            setText("failure, try again");
        } else {
            setListToAllCategories(allCategories);
            setText("Base Text");
        }
    }

    function handleTextareaChange(e) {
        setCategoryName(e.target.value);
    }

    return (
        <>
            <Navbar />
            <h2>Submit Category</h2>
            <p>Create an educational category that can hold data such
                as questions.
            </p>
            <form onSubmit={handleCategoryNameSubmit}>
                <textarea
                    value={categoryName}
                    onChange={handleTextareaChange}
                    disabled={status === 'submitting'}
                />
                <br />
                <button disabled={
                    categoryName.length === 0 ||
                    status === 'submitting'
                }>
                    Submit
                </button>
                {error != null &&
                    <p> className="Error"
                        {error.message}
                    </p>}
            </form>
        </>
    )
}

// gets objects from the backend
async function submitCategoryNameForm(categoryName) {
    console.log("Category name:::", categoryName);
    const allCategories = await respondToCategorySubmit(categoryName);
    return allCategories;
}

// export default AdminConsole;