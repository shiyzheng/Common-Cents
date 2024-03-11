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
            console.log(response);
            var total = 0;
            Object.entries(response).forEach((key, value) => {
                if (key[0] != "_id") {
                    console.log(key);
                    nums.push(`${key[0]}: (${key[1]} points)`);
                    total += key[1];
                }
            })
            nums.unshift(`Total Points: (${total} points)`);
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
            {login ? <div>
            <h2 className="float-left">User { id }</h2>
            <br />
            <br />
            <div className="card" style={{width: 500}}>
                <ul className="list-group list-group-flush">
                    { displayedPoints }
                </ul>
            </div>
            <br /></div> : <div className="container"> <h2>Login to check your Profile!</h2></div>}
            
        </div>
    )
}

export default Profile;