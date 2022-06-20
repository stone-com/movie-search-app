import React from 'react';
import './Header.css';

// component for header bar at top of page
const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className='header'>
      Find a Show or Movie
    </span>
  );
};

export default Header;
