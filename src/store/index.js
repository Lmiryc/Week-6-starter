import { configureStore, createSlice } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/tmdbApi';
const favorites = createSlice({ name: 'favorites', initialState: { ids: [] }, reducers: {
  setFavorites: (state, action) => { state.ids = action.payload; },
  toggleFavorite: (state, action) => { state.ids = state.ids.includes(action.payload) ? state.ids.filter((id) => id !== action.payload) : [...state.ids, action.payload]; },
} });
export const { setFavorites, toggleFavorite } = favorites.actions;
export const store = configureStore({ reducer: { favorites: favorites.reducer, [tmdbApi.reducerPath]: tmdbApi.reducer }, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware) });
