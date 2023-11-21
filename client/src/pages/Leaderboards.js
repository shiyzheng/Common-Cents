import Navbar from '../components/Navbar';
import '../styles/Leaderboards.css';
import { useState } from 'react';

function Leaderboards() {
    const usersPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const users = [
        { id: 1, name: "User 1", points: 120 },
        { id: 2, name: "User 2", points: 90 },
        { id: 3, name: "User 3", points: 150 },
        { id: 4, name: "User 4", points: 75 },
        { id: 5, name: "User 5", points: 200 },
        { id: 6, name: "User 6", points: 110 },
        { id: 7, name: "User 7", points: 180 },
        { id: 8, name: "User 8", points: 95 },
        { id: 9, name: "User 9", points: 130 },
        { id: 10, name: "User 10", points: 160 },
        { id: 11, name: "User 11", points: 85 },
        { id: 12, name: "User 12", points: 105 },
        { id: 13, name: "User 13", points: 140 },
        { id: 14, name: "User 14", points: 70 },
        { id: 15, name: "User 15", points: 180 },
        { id: 16, name: "User 16", points: 200 },
        { id: 17, name: "User 17", points: 110 },
        { id: 18, name: "User 18", points: 95 },
        { id: 19, name: "User 19", points: 120 },
        { id: 20, name: "User 20", points: 150 },
        { id: 21, name: "User 21", points: 500 },
        { id: 22, name: "User 22", points: 10 },
      ];

    
    const sortedUsers = [...users].sort((a, b) => b.points - a.points);
    
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const usersOnCurrentPage = sortedUsers.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };

    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

      
    return (
      <>
        <Navbar />
        <div className="container">
          <h2>Leaderboards</h2>
          <ul className="leaderboards-list">
            {usersOnCurrentPage.map((user) => (
              <li key={user.id} className="leaderboards-box">
                {user.name} - {user.points} points
              </li>
            ))}
          </ul>
  
          <div className="pagination">
            <button onClick={handlePrevPage}>&lt; Prev</button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={handleNextPage}>Next &gt;</button>
          </div>
        </div>
      </>
    );
}

export default Leaderboards;