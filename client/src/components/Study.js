import React, { useState, useEffect} from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getUserProgress } from '../api/users';
import { getStudyGuideByLessonAndId } from '../api/category';

function Study(props) {
    const { topic } = useParams();
    const {
        login, username, setUsername, setLogin, logout
    } = props;
    useEffect(() => {
        const fetchQuestionsFromAPI = async () => {
        try {
            const output = await getUserProgress({lesson:topic});
            console.log(topic);
            console.log(output.unit);
            const response = await getStudyGuideByLessonAndId({lesson:topic, id: 0});
            
            console.log(response);
        } catch (error) {
            console.error('Error fetching study guide', error);
        }
        };

        fetchQuestionsFromAPI();
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