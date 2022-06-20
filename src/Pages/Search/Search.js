import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Tab, Tabs } from '@mui/material';
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
  const [page, setPage] = useState(1);
  const [content, setContent] = useState();
  const [numberOfPages, setNumberOfPages] = useState();

  const fetchSearch = async () => {
    const { data } = await axios.get(
      // if type is 0 (falsy) use tv, but if it is 1(truthy) use movie
      // type value is changed when active tab is changed.
      `https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${
        process.env.REACT_APP_APIKEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );

    setContent(data.results);
    setNumberOfPages(data.total_pages);

    useEffect(() => {
      window.scroll(0, 0);
      fetchSearch();
    }, [type, page]);
  };

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
        <Tabs
          value={type}
          indicatorColor='primary'
          textColor='primary'
          // the value when a tab is clicked is a number, starting at 0
          onChange={(e, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
        >
          <Tab style={{ width: '50%' }} label='Search for Movies' />
          <Tab style={{ width: '50%' }} label='Search for Shows' />
        </Tabs>
      </ThemeProvider>
    </div>
  );
};

export default Search;
