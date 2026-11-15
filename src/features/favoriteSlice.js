
import { createSlice } from "@reduxjs/toolkit";

const getFavoritesKey = () => {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  return user
    ? `favorites_${user.id || user.email}`
    : "favorites_guest";
};

const loadFavorites = () => {
  return JSON.parse(
    localStorage.getItem(getFavoritesKey()) || "[]"
  );
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: loadFavorites(),

  reducers: {
    loadUserFavorites: () => {
      return loadFavorites();
    },

    addFavorite: (state, action) => {
      const exists = state.some(
        (destination) =>
          destination.id === action.payload.id
      );

      if (!exists) {
        state.push(action.payload);
      }

      localStorage.setItem(
        getFavoritesKey(),
        JSON.stringify(state)
      );
    },

    removeFavorite: (state, action) => {
      const updated = state.filter(
        (destination) =>
          destination.id !== action.payload
      );

      localStorage.setItem(
        getFavoritesKey(),
        JSON.stringify(updated)
      );

      return updated;
    }
  }
});

export const {
  loadUserFavorites,
  addFavorite,
  removeFavorite
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
