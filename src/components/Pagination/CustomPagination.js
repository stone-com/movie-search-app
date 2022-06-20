import React from 'react';
import Pagination from '@mui/material/Pagination';
import './CustomPagination.css';

const CustomPagination = ({ setPage, numberOfPages = 10 }) => {
  // when different page is selected, set the page state to the new page
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className='pagination'>
      <Pagination
        onChange={(e) => handlePageChange(e.target.textContent)}
        count={numberOfPages}
        variant='outlined'
        shape='rounded'
      />
    </div>
  );
};

export default CustomPagination;
