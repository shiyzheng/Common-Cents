import Navbar from '../components/Navbar';
import '../styles/Leaderboards.css';
import { useState, useEffect } from 'react';
import { getAllUsersPoints } from '../api/users';

function Leaderboards(props) {
  const {
    login, username, setUsername, setLogin, logout
  } = props;
    const usersPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    // const users = [
    //     { id: 1, name: "User 1", points: 120 },
    //     { id: 2, name: "User 2", points: 90 },
    //     { id: 3, name: "User 3", points: 150 },
    //     { id: 4, name: "User 4", points: 75 },
    //     { id: 5, name: "User 5", points: 200 },
    //     { id: 6, name: "User 6", points: 110 },
    //     { id: 7, name: "User 7", points: 180 },
    //     { id: 8, name: "User 8", points: 95 },
    //     { id: 9, name: "User 9", points: 130 },
    //     { id: 10, name: "User 10", points: 160 },
    //     { id: 11, name: "User 11", points: 85 },
    //     { id: 12, name: "User 12", points: 105 },
    //     { id: 13, name: "User 13", points: 140 },
    //     { id: 14, name: "User 14", points: 70 },
    //     { id: 15, name: "User 15", points: 180 },
    //     { id: 16, name: "User 16", points: 200 },
    //     { id: 17, name: "User 17", points: 110 },
    //     { id: 18, name: "User 18", points: 95 },
    //     { id: 19, name: "User 19", points: 120 },
    //     { id: 20, name: "User 20", points: 150 },
    //     { id: 21, name: "User 21", points: 500 },
    //     { id: 22, name: "User 22", points: 10 },
    //   ];
      
    const [users, setUsers] = useState([]);
    useEffect(() => {
      async function getLeaderboardsWrapper() {
        const response = await getAllUsersPoints();
        setUsers(response);
      }
      getLeaderboardsWrapper();
    }, [users.length]);

    
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

    const pageRange = Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
      if (currentPage <= 3) {
        return index + 1;
      } else if (currentPage >= totalPages - 2) {
        return totalPages - 4 + index;
      } else {
        return currentPage - 2 + index;
      }
    });

      
    return (
      <>
        <Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={username} logout = {logout}/>
        <div className="container">
          <h2>Leaderboards</h2>
          <ul className="leaderboards-list">
          {usersOnCurrentPage.map((user, index) => (
            <li key={index} className="leaderboards-box">
              {/* fix for total points */}
              {/* {user.username} - {user.points} points */}
              {user.username} - {user.points.Spending} points
            </li>
          ))}
          </ul>
  
          <div className="pagination">
            <button onClick={handlePrevPage}>&lt; Prev</button>
            {pageRange.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            ))}
            <button onClick={handleNextPage}>Next &gt;</button>
          </div>
        </div>
      </>
    );
}

export default Leaderboards;