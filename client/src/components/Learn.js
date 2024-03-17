import React from 'react';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Learn({ topics, subcat, levels }) {
    const navigate = useNavigate();

    const navigateToTopic = (topic, subcategory) => {
        const formattedTopic = topic.toLowerCase().replace(/\s+/g, '-');
        const formattedSubcategory = subcategory.toLowerCase().replace(/\s+/g, '-');
        navigate(`/lessons/${formattedTopic}/${formattedSubcategory}`);
    };

    return (
        <div>
            <h2>I would like to learn about...</h2>
            <div className="lessons-wrapper">
                {topics.map((topic, index) => (
                    <div key={index} className="lessons-container">
                        <h3>{topic}</h3>
                        <Button variant="contained" onClick={() => navigate(`/study/${topic}`)}>
                            Study Guide
                        </Button>
                        <h6>{" "}</h6>
                        <ul>
                            {subcat[index] && subcat[index].map((subcategory, subIndex) => (
                                subIndex <= levels[2] ?
                                    (<li key={subIndex}>
                                        <button onClick={() => navigateToTopic(topic, subcategory)}>
                                            {subcategory}
                                        </button>
                                        <h6>{" "}</h6>
                                    </li>)
                                    :
                                    (<li key={subIndex}>
                                        <button onClick={() => navigateToTopic(topic, subcategory)} style={{ pointerEvents: 'none', opacity: 0.5 }}>
                                            {subcategory}
                                        </button>
                                        <h6>{" "}</h6>
                                    </li>)
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Learn;