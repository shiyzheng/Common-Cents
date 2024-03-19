import React, { useState, useEffect} from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getUserProgress } from '../api/users';
import { getStudyGuideByLessonAndId, getUnitByLessonAndId } from '../api/category';

function Study(props) {
    const { topic } = useParams();
    const {
        login, username, setUsername, setLogin, logout
    } = props;
    useEffect(() => {
        const fetchStudyGuideFromAPI = async () => {
        try {
            const output = await getUserProgress({lesson:topic});
            console.log(topic);
            console.log(output.unit);
            const response = await getStudyGuideByLessonAndId({lesson:"Spending", id: output.unit});
            
            console.log(response);
        } catch (error) {
            console.error('Error fetching study guide', error);
        }
        };

        fetchStudyGuideFromAPI();
    }, []);
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
                <Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={username} logout={logout}/>
            </div>
            <>Study Guide</>
        </div>
    )
}

export default Study;