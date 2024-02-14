import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProfileById } from '../api/users';
// import axios from 'axios';
import Navbar from './Navbar';

function PointPreview(props) {
    const { text } = props;
    return (
        <li className="list-group-item">{ text }</li>
    );
  }

function Profile(props) {
    const { login, username, logout } = props;
    const [profile, setProfile] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function getProfileWrapper() {
            const response = await getProfileById(id);
            const nums = []
            Object.entries(response).forEach((key, value) => {
                console.log(key);
                // console.log(value);
                nums.push(`${key[0]}: (${key[1]} points)`);
            })
            setProfile(nums);
        }
        getProfileWrapper();
    }, [profile.length]);

    const displayPoints = () => {
        const displayedPoints = [];
        profile.forEach((element) => {
            displayedPoints.push(
                <PointPreview 
                    text={element}
                />,
            );
        });
        return displayedPoints;
    }

    const displayedPoints = displayPoints();

    return (
        <div>
            <Navbar login={login} username={sessionStorage.getItem('username')} logout = {logout} />
            <h2 className="float-left">User { id }</h2>
            {/* {login && ( */}
                <div>
                    <button
                        className="btn btn-primary float-right"
                        data-testid="button"
                        onClick={(e) => {

                        }}
                        type="submit"
                        >
                            Message
                    </button>
                    <button
                        className="btn btn-primary float-right"
                        data-testid="button"
                        onClick={(e) => {

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
                    {/* <li className="list-group-item">Investing: Waystage (1000 points)</li>
                    <li className="list-group-item">Saving: Waystage (1500 points)</li>
                    <li className="list-group-item">Spending: Proficient (5500 points)</li>
                    <li className="list-group-item">Earning Income: Beginner (0 points)</li>
                    <li className="list-group-item">Managing Credit: Beginner (950 points)</li>
                    <li className="list-group-item">Managing Risk: Proficient (7000 points)</li> */}
                    { displayedPoints }
                </ul>
            </div>
            <br />
            <h2>Achievements</h2>
            <div className="card" style={{width: 500}}>
                <ul className="list-group list-group-flush">
                </ul>
            </div>
            {/* { profile } */}
        </div>
    )
}

export default Profile;