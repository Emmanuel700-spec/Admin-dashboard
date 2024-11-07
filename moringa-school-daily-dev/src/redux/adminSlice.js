import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],        // Array to hold users data
    content: [],      // Array to hold content data
    categories: [],   // Array to hold categories data
    loading: false,   // State to track loading status
    error: null,      // State to track error messages
  },
  reducers: {
    // Set Users - Update the users state with a list of users
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    // Set Content - Update the content state with new content
    setContent: (state, action) => {
      state.content = action.payload;
    },

    // Set Categories - Update the categories state
    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    // Add a User - Adds a new user to the users array
    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    // Update a User - Finds and updates a user's details by ID
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },

    // Remove a User - Removes a user from the state by ID
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload.id);
    },

    // Add Content - Adds new content to the content array
    addContent: (state, action) => {
      state.content.push(action.payload);
    },

    // Remove Content - Removes content by ID
    removeContent: (state, action) => {
      state.content = state.content.filter(content => content.id !== action.payload.id);
    },

    // Add Category - Adds a new category to the categories array
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },

    // Remove Category - Removes a category from the state by ID
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(category => category.id !== action.payload.id);
    },

    // Set Loading - Updates the loading state to show/hide loading indicator
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set Error - Sets an error message when something fails
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Clear Error - Clears any existing error messages
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export the actions for use in components or anywhere else in the app
export const {
  setUsers,
  setContent,
  setCategories,
  addUser,
  updateUser,
  removeUser,
  addContent,
  removeContent,
  addCategory,
  removeCategory,
  setLoading,
  setError,
  clearError,
} = adminSlice.actions;

// Export the reducer to be used in the store
export default adminSlice.reducer;
