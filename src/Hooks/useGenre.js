// custom hook
// takes selectedGenre array and gets the id's of each genre.
// then reduces to a string of all id's separated by comma
// this is needed to use for search query by genre

const useGenres = (selectedGenres) => {
  if (selectedGenres.length < 1) return '';

  const GenreIds = selectedGenres.map((genre) => genre.id);
  return GenreIds.reduce((acc, curr) => acc + ',' + curr);
};

export default useGenres;
