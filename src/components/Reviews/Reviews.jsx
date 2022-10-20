import { searchMovieReview } from 'api/ApiRequests';
import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';

const Reviews = () => {
  const [review, setReview] = useState([]);
  const [error, setError] = useState('');
  const { movieId } = useParams();

  const fetchReview = useCallback(async () => {
    try {
      const response = await searchMovieReview(movieId);
      setReview(response);
    } catch (error) {
      setError(error);
    }
  }, [movieId]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  if (error) {
    return (
      <div className={css.container}>
        <p>Something went wrong...</p>
      </div>
    );
  }

  if (!review) {
    return (
      <div className={css.container}>
        <p>🤭 We don't have any reviews for this movie</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      {review.length !== 0 ? (
        <ul className={css.reviewsList}>
          {review.map(({ author, content, id }) => (
            <li key={id}>
              <h2>{author && author}</h2>
              <p>{content && content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>🤭 We don't have any reviews for this movie</p>
      )}
    </div>
  );
};
export default Reviews;
