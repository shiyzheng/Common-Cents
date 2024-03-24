import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Fab} from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import {styled} from "@mui/system";
import Typography from "@mui/material/Typography";

function Lesson({ topics, subcat, levels }) {
  const navigate = useNavigate();

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
  });
  
  return (
    <div className="lessons-wrapper" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
      {topics.map((topic, index) => (
        <div key={index} className="lessons-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>
            <UnitText>{topic}</UnitText>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', maxWidth: 'calc(3 * 60px + 3 * 20px)' }}>
              {subcat[index] && subcat[index].map((subcategory, index2) => (
                <>
                  {index2 > levels[index] ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '5px' }}>
                      <Fab color="secondary" aria-label="add" style={{pointerEvents: 'none', opacity: 0.25, marginBottom: '10px'}}>
                        <PaidIcon />
                      </Fab>
                      <TopicTest>{subcategory}</TopicTest>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '5px' }}>
                      <Fab color="secondary" aria-label="add" onClick={() => navigateToTopic(topic, subcategory)} style={{ marginBottom: '10px' }}>
                        <PaidIcon />
                      </Fab>
                      <TopicTest>{subcategory}</TopicTest>
                    </div>
                  )}
                </>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Lesson;