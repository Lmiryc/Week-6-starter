import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Add EXPO_PUBLIC_TMDB_TOKEN (a TMDB v4 bearer token) to .env to enable live data.
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    prepareHeaders: (headers) => {
      const token = process.env.EXPO_PUBLIC_TMDB_TOKEN;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchMovies: builder.query({ query: (query) => `search/movie?query=${encodeURIComponent(query)}` }),
    movieDetails: builder.query({ query: (id) => `movie/${id}?append_to_response=credits,reviews,recommendations` }),
  }),
});
export const { useSearchMoviesQuery, useMovieDetailsQuery } = tmdbApi;
