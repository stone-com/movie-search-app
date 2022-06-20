import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SingleContentCard from '../../components/SingleContent/SingleContentCard';
import CustomPagination from '../../components/Pagination/CustomPagination';
import Genres from '../../components/Genres';
import useGenre from '../../Hooks/useGenre';

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  // calls the useGenre custom hook, passing in selectedGenres array. Whenever this changes(another gewnre is clicked or removed), this will update and will re fetch passing in updated selected genres into search query
  const genreforURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    // set content state to results array from data
    setContent(data.results);
    setNumberOfPages(data.total_pages);
  };
  // whenever page state or seletced genres changes(useGenre hook), re-fetch data with new genres or new page
  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL]);
  return (
    <div>
      <span className='pageTitle'>Discover Movies</span>
      <Genres
        type='movie'
        selectedGenres={selectedGenres}
        genres={genres}
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
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
                media_type='movie'
                vote_average={content.vote_average}
              />
            );
          })}
      </div>
      {/* only display pagination if there is more than one number of pages */}
      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
      )}
    </div>
  );
};

export default Movies;
