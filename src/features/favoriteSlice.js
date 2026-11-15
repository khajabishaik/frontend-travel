import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState:
  JSON.parse(
    localStorage.getItem(
      "favorites"
    )
  ) || [], // Fixed: changed from initialStore to initialState
  reducers: {
    addFavorite: (state, action) => {
      state.push(action.payload);
      alert("added to fav");
       localStorage.setItem(
    "favorites",
    JSON.stringify(state)
  );

    },
    removeFavorite: (state, action) => {
      

 const updated =
   state.filter(
     destination =>
     destination.id !==
     action.payload
   );

 localStorage.setItem(
   "favorites",
   JSON.stringify(updated)
 );

 return updated;
}
    },
  },
);

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
