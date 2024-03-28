import Navbar from './Navbar';
import '../styles/Leaderboards.css';
import React, { useState, useEffect } from 'react';
import { getUsersPointsTotal } from '../api/users';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "../App";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Box from '@mui/material/Box';

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
        <ThemeProvider theme={theme}>
      <>
        <Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={sessionStorage.getItem('username')} logout = {logout}/>
        <div className="container">
          <Typography
              component="h1"
              variant="h1"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignSelf: 'center',
                textAlign: 'center',
                fontWeight: 1000,
                fontSize: { xs: '1.45rem', sm: '1.7rem', md: '2.05rem' },
                color: theme.palette.info.main,
                mt: 3,
                mb: 2,
              }}
          >
            See how you measure up!
          </Typography>
          <List>
            {usersOnCurrentPage.map((user, index) => (
                <ListItem
                    key={index}
                    className="leaderboards-box"
                    sx={{ minWidth: '300px', mb: 3 }}  // Set the minimum width here
                >
                  <Box display="flex" justifyContent="space-between" width="100%">
                    <Typography variant="subtitle1" component="span" fontWeight="bold">
                      {user.username}
                    </Typography>
                    <Typography variant="subtitle1" component="span">
                      {user.points} points
                    </Typography>
                  </Box>
                </ListItem>
            ))}
          </List>

          <Box mt={2}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => handlePageChange(page)}
                renderItem={(item) => (
                    <PaginationItem
                        {...item}
                        className={currentPage === item.page ? 'active' : ''}
                    />
                )}
            />
          </Box>
        </div>
      </>
        </ThemeProvider>
    );
}

export default Leaderboards;