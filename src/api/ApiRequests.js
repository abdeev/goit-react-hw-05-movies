import axios from 'axios';

const popularMovieUrl = 'trending/movie/week';
const searchByNameUrl = 'search/movie';
const API_KEY = '4c9d1a72d5deb0e18e0429eb25f6e8e0';
const fetchMovies = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export const searchPopularMovies = async () => {
  const response = await fetchMovies.get(`/${popularMovieUrl}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.results;
};

export const searchMoviesByName = async searchQuery => {
  const response = await fetchMovies.get(`/${searchByNameUrl}`, {
    params: {
      api_key: API_KEY,
      query: searchQuery,
    },
  });
  return response.data.results;
};

export const searchMovieById = async id => {
  const response = await fetchMovies.get(`/movie/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
};

export const serchMovieCast = async id => {
  const response = await fetchMovies.get(`/movie/${id}/credits`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.cast;
};

export const searchMovieReview = async id => {
  const response = await fetchMovies.get(`/movie/${id}/reviews`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.results;
};
