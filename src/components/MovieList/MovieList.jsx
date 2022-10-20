import { NavLink, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import PropTypes from 'prop-types';

const MovieList = ({ movieList }) => {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movieList
        ? movieList.map(el => (
            <li className={css.movieListItem} key={el.id}>
              <NavLink
                to={`/movies/${el.id}`}
                state={{ from: location }}
                className={css.movieListItemLink}
              >
                {el.name || el.title}
              </NavLink>
            </li>
          ))
        : null}
    </ul>
  );
};

MovieList.propTypes = {
  movieList: PropTypes.arrayOf(PropTypes.shape),
};

export default MovieList;
