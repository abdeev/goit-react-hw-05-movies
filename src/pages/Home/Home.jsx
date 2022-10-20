import { searchPopularMovies } from 'api/ApiRequests';
import MovieList from 'components/MovieList/MovieList';
import { useState, useEffect, useCallback } from 'react';
import css from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState(null);

  const fetchTrendingMovie = useCallback(async () => {
    const response = await searchPopularMovies();
    setMovies(response);
  }, []);

  useEffect(() => {
    fetchTrendingMovie();
  }, [fetchTrendingMovie]);

  return (
    <div className={css.container}>
      <h1 className={css.homeTitle}>Trending today:</h1>
      {movies ? <MovieList movieList={movies} /> : null}
    </div>
  );
};

export default Home;
