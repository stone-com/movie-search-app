import React from 'react';
import Pagination from '@mui/material/Pagination';
import './CustomPagination.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// use dark mode theme on pagination component to show as white instead of black, easier to read/see
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const CustomPagination = ({ setPage, numberOfPages = 10 }) => {
  // when different page is selected, set the page state to the new page
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className='pagination'>
        <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={numberOfPages}
          variant='outlined'
          shape='rounded'
          hideNextButton
          hidePrevButton
        />
      </div>
    </ThemeProvider>
  );
};

export default CustomPagination;
