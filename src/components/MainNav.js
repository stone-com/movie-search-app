import React, { useEffect, useState } from 'react';
// import mui box and bottom nav components
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import icons for navbar from material icons
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import TvIcon from '@mui/icons-material/Tv';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

// styles to pass into sx property of box component
const boxStyles = {
  width: '100%',
  position: 'fixed',
  bottom: 0,
  zIndex: 10,
};

// bottom nav component
const SimpleBottomNavigation = () => {
  const [value, setValue] = useState(0);
  // use navigate hook to be able to navigate to different routes
  const navigate = useNavigate();

  // use useEffect hook to watch for 'value' state to change.
  // value will change when different icon is clicked.
  // navigate(route) to different page depending on value
  useEffect(() => {
    switch (value) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/movies');
        break;
      case 2:
        navigate('/series');
        break;
      case 3:
        navigate('/search');
        break;
    }
  }, [value]);

  return (
    <Box sx={{ ...boxStyles }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ backgroundColor: '#004815' }}
      >
        <BottomNavigationAction
          label='Trending'
          icon={<TrendingUpIcon />}
          sx={{ color: 'white' }}
        />
        <BottomNavigationAction
          label='Movies'
          icon={<LocalMoviesIcon />}
          sx={{ color: 'white' }}
        />
        <BottomNavigationAction
          label='TV Shows'
          icon={<TvIcon />}
          sx={{ color: 'white' }}
        />
        <BottomNavigationAction
          label='Search'
          icon={<SearchIcon />}
          sx={{ color: 'white' }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default SimpleBottomNavigation;
