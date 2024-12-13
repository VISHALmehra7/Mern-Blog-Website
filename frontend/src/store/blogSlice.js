import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBlogs: [],
  allUsers:[],
  selectedBlog: null,
};

const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {
    setBlogs(state, action) {
      state.allBlogs = action.payload;
    },
    setUsers(state,action){
      state.allUsers = action.payload
    },
    addBlog(state, action) {
      state.allBlogs.push = action.payload;
    },
    selectBlog(state, action) {
      state.selectedBlog = action.payload;
    },
    clearSelectedBlog(state, action) {
      state.selectedBlog = null;
    },
  },
});

export const {setBlogs,addBlog,selectBlog,clearSelectedBlog,setUsers}= blogSlice.actions
export default blogSlice.reducer
