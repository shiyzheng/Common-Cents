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

    const [guide, setGuide] = useState('');
    useEffect(() => {
        const fetchStudyGuideFromAPI = async () => {
        try {
            const output = await getUserProgress({lesson:topic});
            console.log(topic);
            console.log(output.unit);
            const response = await getStudyGuideByLessonAndId({lesson:"Spending", id: output.unit});
            
            console.log(response);
            console.log(typeof(response));
            setGuide(response);
        } catch (error) {
            console.error('Error fetching study guide', error);
        }
        };

        fetchStudyGuideFromAPI();
    }, []);
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
                <Navbar setLogin={setLogin} login={login} setUsername={setUsername} logout={logout} />
            </div>
            <div style={{ marginTop: '20px', padding: '20px', maxWidth: '800px', textAlign: 'center', border: '1px solid #ccc', alignItems: 'center', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                <h2 style={{ marginBottom: '20px' }}>Study Guide</h2>
                <p style={{ lineHeight: '1.6', whiteSpace: 'pre-line', textAlign: 'left' }}>{guide}</p>
            </div>
        </div>
    )
}

export default Study;