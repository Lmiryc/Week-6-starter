import { configureStore, createSlice } from '@reduxjs/toolkit';

import { tmdbApi } from '../services/tmdbApi';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { ids: [] },
  reducers: {
    setFavorites: (state, action) => {
      state.ids = action.payload;
    },
    toggleFavorite: (state, action) => {
      const movieId = action.payload;
      if (state.ids.includes(movieId)) {
        state.ids = state.ids.filter((id) => id !== movieId);
      } else {
        state.ids = [...state.ids, movieId];
      }
    },
  },
});

export const { setFavorites, toggleFavorite } = favoritesSlice.actions;

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});
