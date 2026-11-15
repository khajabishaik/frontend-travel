
import { createSlice } from "@reduxjs/toolkit";

// Get the currently logged-in user's Favorites key
const getFavoritesKey = () => {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  if (!user) {
    return "favorites_guest";
  }

  return `favorites_${user.id || user.email}`;
};

// Load Favorites for the logged-in user
const loadFavorites = () => {
  return JSON.parse(
    localStorage.getItem(getFavoritesKey()) || "[]"
  );
};

const favoriteSlice = createSlice({
  name: "favorites",

  initialState: loadFavorites(),

  reducers: {
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
  addFavorite,
  removeFavorite
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
