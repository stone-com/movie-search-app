import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// styles to pass into sx property of box component
const boxStyles = {
  width: '100%',
  position: 'fixed',
  bottom: 0,
  zIndex: 10,
};

const SimpleBottomNavigation = () => {
  const [value, setValue] = useState(0);

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
          label='Favorites'
          icon={<FavoriteIcon />}
          sx={{ color: 'white' }}
        />
        <BottomNavigationAction
          label='Nearby'
          icon={<LocationOnIcon />}
          sx={{ color: 'white' }}
        />
        <BottomNavigationAction
          label='Nearby'
          icon={<LocationOnIcon />}
          sx={{ color: 'white' }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default SimpleBottomNavigation;
