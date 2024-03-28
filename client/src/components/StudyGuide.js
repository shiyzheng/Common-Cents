import React, { useState, useEffect} from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import Navbar from '../components/Navbar';
import { getUserProgress } from '../api/users';
import { getStudyGuideByLessonAndId, getUnitByLessonAndId, getAllUnitByLesson } from '../api/category';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "../App";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function StudyGuide(props) {
    const { topic, subcategory } = useParams();
    const {
        login, username, setUsername, setLogin, logout
    } = props;
    const formattedTopic = topic.replace(/-/g, ' ').replace(/(?:-| |\b)(\w)/g, function(key) { return key.toUpperCase()});
    const formattedSubcategory = subcategory.replace(/-/g, ' ').replace(/(?:-| |\b)(\w)/g, function(key) { return key.toUpperCase()});
    const [guide1, setGuide1] = useState('');
    const [guide2, setGuide2] = useState('');
    const [image, setImage] = useState('');
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
            const split = response.split('IMAGE');
            if (split.length > 1) {
              setGuide1(split[0]);
              setGuide2(split[2])
              setImage(split[1]);
            } else {
              setGuide1(split[0]);
            }
        } catch (error) {
            console.error('Error fetching study guide', error);
        }
        };

        fetchStudyGuideFromAPI();
    }, [currUnit]);
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <Navbar setLogin={setLogin} login={login} setUsername={setUsername} logout={logout} />
                <Paper sx={{ margin: '0 auto', marginTop: '20px', padding: '20px', maxWidth: '800px', textAlign: 'center', border: '1px solid #ccc', alignItems: 'center', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                    <Typography
                        component="h1"
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: 'center',
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontWeight: 1000,
                            fontSize: { xs: '1.45rem', sm: '1.7rem', md: '2.05rem' },
                            color: theme.palette.info.main,
                            mt: 1,
                            mb: 2,
                        }}
                    >
                        Study Guide
                    </Typography>
                    <Typography
                        component="h2"
                        variant="h2"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: 'center',
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontWeight: 500,
                            fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.4rem' },
                            color: theme.palette.info.main,
                            mt: 1,
                            mb: 2,
                        }}
                    >
                        {formattedSubcategory}
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: '1.6', whiteSpace: 'pre-line', textAlign: 'left' }}>{guide1}</Typography>
                    {/* {parse(`<img src="https://res.cloudinary.com/dnwaszkmv/image/upload/v1711326565/negotiations_2.png" />  `)} */}
                    {parse(`${image}`)}
                    {guide2 && (
                        <Typography variant="body1" sx={{ lineHeight: '1.6', whiteSpace: 'pre-line', textAlign: 'left' }}>{guide2}</Typography>
                    )}
                </Paper>
            </Box>
        </ThemeProvider>
    )
}

export default StudyGuide;