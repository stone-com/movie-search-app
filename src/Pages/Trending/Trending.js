import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SingleContentCard from '../../components/SingleContent/SingleContentCard';

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
      <div className='trending'>
        {/* if there is content (the api request worked and set content state), then map through content array, creating a singlecontent card for each and passing in various data as props */}
        {content &&
          content.map((content) => {
            return (
              <SingleContentCard
                key={content.id}
                id={content.id}
                title={content.title || content.name}
                poster={content.poster_path}
                date={content.first_air_date || content.release_date}
                media_type={content.media_type}
                vote_average={content.vote_average}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Trending;
