import { serchMovieCast } from 'api/ApiRequests';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';
import noPhotoIcon from '../../images/NoPhoto.png';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState('');

  const { movieId } = useParams();

  const fetchCast = useCallback(async () => {
    try {
      const response = await serchMovieCast(movieId);
      setCast(response);
    } catch (error) {
      setError(error);
    }
  }, [movieId]);

  useEffect(() => {
    fetchCast();
  }, [fetchCast]);

  if (error) {
    return (
      <div className={css.container}>
        <p>Something went wrong...</p>
      </div>
    );
  }

  return (
    <ul className={css.castList}>
      {cast.length ? (
        cast.map(({ name, profile_path, character, id }) => (
          <li className={css.castItem} key={id}>
            <img
              className={css.castPicture}
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500${profile_path}`
                  : noPhotoIcon
              }
              alt={name}
            />
            <div>
              <h2>{name}</h2>

              <p>Character: {character}</p>
            </div>
          </li>
        ))
      ) : (
        <div className={css.container}>
          <p>🤭 We don't have information for this movie</p>
        </div>
      )}
    </ul>
  );
};
export default Cast;
