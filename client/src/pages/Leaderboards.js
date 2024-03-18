import Navbar from '../components/Navbar';
import '../styles/Leaderboards.css';
import { useState, useEffect } from 'react';
import { getUsersPointsTotal } from '../api/users';

function Leaderboards(props) {
  const {
    login, username, setUsername, setLogin, logout
  } = props;
    const usersPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
      
    const [users, setUsers] = useState([]);
    useEffect(() => {
      async function getLeaderboardsWrapper() {
        const response = await getUsersPointsTotal();
        // console.log(response);
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
        <Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={sessionStorage.getItem('username')} logout = {logout}/>
        <div className="container">
          <h2>Leaderboards</h2>
          <ul className="leaderboards-list">
          {usersOnCurrentPage.map((user, index) => (
            <li key={index} className="leaderboards-box">
              {user.username} - {user.points} points
            </li>
          ))}
          </ul>
  
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>&lt; Prev</button>
            {pageRange.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next &gt;</button>
          </div>
        </div>
      </>
    );
}

export default Leaderboards;