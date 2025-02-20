

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  post: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setProduct: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const { setPosts, setProduct } = postSlice.actions;
export default postSlice.reducer;
