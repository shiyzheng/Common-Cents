import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProfileById } from '../api/users';
import Navbar from './Navbar';

function Profile(props) {
    const { login } = props;
    const [profile, setProfile] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function getProfileWrapper() {
            const response = await getProfileById(id);
            setProfile(response);
        }
        getProfileWrapper();
    }, [profile.length]);

    return (
        <div>
            <Navbar />
            <h2 className="float-left">User { id }</h2>
            {/* {login && ( */}
                <div>
                    <button
                        className="btn btn-primary float-right"
                        data-testid="button"
                        onClick={(e) => {
                            e.preventDefault();
                            createUser({ username, password });
                            const form = document.getElementById('add');
                            form.reset();
                        }}
                        type="submit"
                        >
                            Message
                    </button>
                    <button
                        className="btn btn-primary float-right"
                        data-testid="button"
                        onClick={(e) => {
                            e.preventDefault();
                            createUser({ username, password });
                            const form = document.getElementById('add');
                            form.reset();
                        }}
                        type="submit"
                        >
                            Add Friend
                    </button>
                </div>
            {/* )} */}
            <br />
            <br />
            <div className="card" style={{width: 200}}>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Level: 52</li>
                    <li className="list-group-item">Longest streak: 14d</li>
                </ul>
            </div>
            <br />
            <div className="card" style={{width: 500}}>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Investing: Waystage (1000 points)</li>
                    <li className="list-group-item">Saving: Waystage (1500 points)</li>
                    <li className="list-group-item">Spending: Proficient (5500 points)</li>
                    <li className="list-group-item">Earning Income: Beginner (0 points)</li>
                    <li className="list-group-item">Managing Credit: Beginner (950 points)</li>
                    <li className="list-group-item">Managing Risk: Proficient (7000 points)</li>
                    {/* { displayProgress } */}
                </ul>
            </div>
            <br />
            <h2>Achievements</h2>
            <div className="card" style={{width: 500}}>
                <ul className="list-group list-group-flush">
                    
                    {/* { displayProgress } */}
                </ul>
            </div>
            {/* { profile } */}
        </div>
    )
}

export default Profile;