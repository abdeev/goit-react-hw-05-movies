import { searchMovieById } from 'api/ApiRequests';
import { useCallback, useRef, useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import css from './MovieCard.module.css';

const MovieCard = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [error, setError] = useState('');
  const location = useLocation();
  const refLocation = useRef(location.state?.from);

  const fetchMovie = useCallback(async () => {
    try {
      const response = await searchMovieById(movieId);
      setMovieDetails(response);
    } catch (error) {
      setError(error);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovie();
  }, [movieId, fetchMovie]);
  if (error.code === 'ERR_BAD_REQUEST') {
    return (
      <div className={css.container}>
        <p>🤭 The page for your request is not create yet or `${error.code}`</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.container}>
        <p>... Something went wrong ...</p>
      </div>
    );
  }
  if (!movieDetails) {
    return (
      <div className={css.container}>
        <p>We don't have any reviews for this movie</p>
      </div>
    );
  }
  const { title, poster_path, release_date, vote_average, overview, genres } =
    movieDetails;

  return (
    <>
      <section className={css.section}>
        <div className={css.container}>
          <Link className={css.goBackLink} to={refLocation.current ?? '/'}>
            Go back
          </Link>
          <div className={css.cardWrapper}>
            <img
              className={css.cardImage}
              src={
                poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`
              }
              alt={title}
            />
            <div className={css.cardDescription}>
              <h2>
                {movieDetails
                  ? `${title}(${new Date(release_date).getFullYear()})`
                  : null}
              </h2>
              <p>User score: {Math.ceil(vote_average * 10)} %</p>
              <h2>Overview</h2>
              <p>{overview}</p>
              <h2>Genres</h2>
              <p>{genres ? genres.map(genre => genre.name).join(' ') : '-'}</p>
            </div>
          </div>
        </div>
      </section>
      <section className={css.section}>
        <div className={css.info_container}>
          <NavLink className={css.cardLink} to={'cast'}>
            Cast
          </NavLink>
          <NavLink className={css.cardLink} to={'reviews'}>
            Reviews
          </NavLink>
        </div>
      </section>
      <section className={css.section}>
        <Outlet />
      </section>
    </>
  );
};
export default MovieCard;
