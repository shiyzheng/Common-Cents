import React, { useState, useEffect} from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getUserProgress } from '../api/users';
import { getStudyGuideByLessonAndId, getUnitByLessonAndId, getAllUnitByLesson } from '../api/category';

function Study(props) {
    const { topic, subcategory } = useParams();
    const {
        login, username, setUsername, setLogin, logout
    } = props;
    const formattedTopic = topic.replace(/-/g, ' ').replace(/(?:-| |\b)(\w)/g, function(key) { return key.toUpperCase()});
    const formattedSubcategory = subcategory.replace(/-/g, ' ').replace(/(?:-| |\b)(\w)/g, function(key) { return key.toUpperCase()});
    const [guide, setGuide] = useState('');
    const [currUnit, setCurrUnit] = useState(0);

    useEffect(() => {
        const getCurrUnit = async () => {
          try {
            const output = await getAllUnitByLesson(formattedTopic);
            output.categories.forEach(function(element, index) {
              if (element.Name === formattedSubcategory) {
                setCurrUnit(index);
              }
            });
          } catch (error) {
            console.error('Error fetching progress:', error);
          }
        }
        getCurrUnit();
      }, []);
    useEffect(() => {
        const fetchStudyGuideFromAPI = async () => {
        try {
            const response = await getStudyGuideByLessonAndId({lesson:formattedTopic, id: currUnit});
            setGuide(response);
        } catch (error) {
            console.error('Error fetching study guide', error);
        }
        };

        fetchStudyGuideFromAPI();
    }, [currUnit]);
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