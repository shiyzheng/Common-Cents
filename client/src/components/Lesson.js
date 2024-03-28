import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Fab} from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import {styled} from "@mui/system";
import Typography from "@mui/material/Typography";
import '../styles/Lesson.css';

function Lesson({ topics, subcat, units }) {
  const navigate = useNavigate();
  const colors = ['secondary', 'red_custom', 'warning', 'info'];

  const navigateToTopic = (topic, subcategory) => {
    const formattedTopic = topic.toLowerCase().replace(/\s+/g, '-');
    const formattedSubcategory = subcategory.toLowerCase().replace(/\s+/g, '-');
    navigate(`/lessons/${formattedTopic}/${formattedSubcategory}`);
  };

  const UnitText = styled(Typography)({
    fontFamily: 'Nunito, sans-serif',
    fontWeight: 1000,
    fontSize: '2rem',
  });

  const TopicTest = styled(Typography)({
    fontFamily: 'Nunito, sans-serif',
    fontWeight: 600,
    fontSize: '1rem',
    maxWidth: '137px',
    wordWrap: 'break-word',
  });

  return (
  <div className="lessons-wrapper" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
    {topics.map((topic, index) => {
      const topicColor = colors[index % colors.length]; // Assign a color to each topic

      return (
        <div key={index} className="lessons-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>
            <UnitText>{topic}</UnitText>
          </div>

          <div className = "subcategories-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center', maxWidth: '210px' }}>
            {subcat[index] && subcat[index].map((subcategory, index2) => (
              <>
                {index2 > units[index] ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '5px' }}>
                    <Fab color={topicColor} aria-label="add" style={{pointerEvents: 'none', opacity: 0.45, marginBottom: '10px'}}>
                      <PaidIcon />
                    </Fab>
                    <TopicTest>{subcategory}</TopicTest>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '5px' }}>
                    <Fab color={topicColor} aria-label="add" onClick={() => navigateToTopic(topic, subcategory)} style={{ marginBottom: '10px' }}>
                      <PaidIcon />
                    </Fab>
                    <TopicTest>{subcategory}</TopicTest>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      );
    })}
  </div>
);
}

export default Lesson;