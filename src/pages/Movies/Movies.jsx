import { useEffect, useState, useCallback } from 'react';
import { searchMoviesByName } from 'api/ApiRequests';
import MovieList from 'components/MovieList/MovieList';
import css from './Movies.module.css';

import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  const fetchMovie = useCallback(async () => {
    if (!query) {
      return;
    }
    const response = await searchMoviesByName(query);
    setMovieList(response);
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ query: searchQuery });
  };
  useEffect(() => {
    fetchMovie();
  }, [fetchMovie, query]);

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit}>
        <input
          className={css.formInput}
          type="text"
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button className={css.buttonSubmit} type="submit">
          Search
        </button>
      </form>
      <MovieList movieList={movieList} />
    </div>
  );
};

export default Movies;
