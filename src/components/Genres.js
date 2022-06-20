import Chip from '@mui/material/Chip';
import axios from 'axios';
import React, { useEffect } from 'react';

// this component is responsible for rendering all of the little genre chips and selecting genres
const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  // when a genre chip is clicked, it will add that genre to the selectgedgenre array and remove it from the genre array by filtering it out
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  // when the little x on a selected genre is clicked, it will remove that genre from selectedgenre array by filtering it out, and then add it back to the genre array
  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
    );
    console.log(data.genres);
    setGenres(data.genres);
    // console.log('genres: ', genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres([]); // unmounting
    };
  }, []);

  return (
    <div style={{ padding: '6px 0' }}>
      {/* first, map through the selected genres and render them first, then render the rest of the unselected ones */}
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            color='secondary'
            clickable
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            style={{ margin: 4, outline:'1px solid black', color: 'white' }}
            label={genre.name}
            key={genre.id}
            clickable
            onClick={() => handleAdd(genre)}
            
          />
        ))}
    </div>
  );
};

export default Genres;
