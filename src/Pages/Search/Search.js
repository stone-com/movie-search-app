import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// dark theme for search bar for because it looks better/easier to see
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Search = () => {
  const [type, setType] = useState();
  const [searchText, setSearchText] = useState();
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: 'flex', margin: '15px 0' }}>
          <TextField
            style={{ flex: 1 }}
            className='searchBox'
            label='Search'
            variant='outlined'
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant='contained' style={{ marginLeft: 10 }}>
            <SearchIcon />
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Search;
