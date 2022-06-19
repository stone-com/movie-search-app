import axios from 'axios';
import React, { useState, useEffect } from 'react';;

// component for trending page
// will fetch all trending titles and display cards for each one
const Trending = () => {
  const [content, setContent] = useState([]);

  // fetch trending movies from api
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_APIKEY}`
    );
    console.log(data.results);
    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div>
      <span className='pageTitle'>Trending</span>
    </div>
  );
};

export default Trending;
