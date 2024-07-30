// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from 'axios';

// const initialState = {
//   isLoggedIn: false,
//   users: [],
// };

// // Fetch all users from the API
// export const FetchAllUsers = createAsyncThunk(
//   "user/FetchAllUsers",
//   async () => {
//     const response = await axios.get("http://localhost:8000/api/users/");
//     return response.data;
//   }
// );

// // Update user role in the API
// export const UpdateUserRole = createAsyncThunk(
//   "user/UpdateUserRole",
//   async ({ userId, role }) => {
//     await axios.put(`http://localhost:8000/api/user/update/${userId}/`, { role });
//     return { userId, role };
//   }
// );

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setActiveUser(state, action) {
//       const { email, userName, userId, wishList, createdAt, role } = action.payload;
//       state.isLoggedIn = true;
//       state.email = email;
//       state.userName = userName;
//       state.userId = userId;
//       state.wishList = wishList;
//       state.createdAt = createdAt;
//       state.role = role;
//     },
//     removeActiveUser(state) {
//       state.isLoggedIn = false;
//       state.email = null;
//       state.userName = null;
//       state.userId = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(FetchAllUsers.pending, (state) => {
//         // Optionally handle pending state
//       })
//       .addCase(FetchAllUsers.fulfilled, (state, action) => {
//         state.users = action.payload;
//       })
//       .addCase(FetchAllUsers.rejected, (state, action) => {
//         // Optionally handle error state
//       })
//       .addCase(UpdateUserRole.fulfilled, (state, action) => {
//         const { userId, role } = action.payload;
//         const userIndex = state.users.findIndex((user) => user.userId === userId);
//         if (userIndex !== -1) {
//           state.users[userIndex].role = role;
//         }
//       });
//   },
// });

// export const { setActiveUser, removeActiveUser } = userSlice.actions;

// export default userSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  isLoggedIn: false,
  users: [],
  error: null,
};

export const FetchAllUsers = createAsyncThunk(
  "user/FetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const UpdateUserRole = createAsyncThunk(
  "user/UpdateUserRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      await axios.put(`http://localhost:8000/api/user/update/${userId}/`, { role });
      return { userId, role };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser(state, action) {
      const { email, userName, userId, wishList = [], createdAt = null, role = 'user' } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userId = userId;
      state.wishList = wishList;
      state.createdAt = createdAt;
      state.role = role;
    },
    removeActiveUser(state) {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchAllUsers.pending, (state) => {
        state.error = null; // Reset any previous errors
      })
      .addCase(FetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(FetchAllUsers.rejected, (state, action) => {
        state.error = action.payload; // Set the error state
      })
      .addCase(UpdateUserRole.fulfilled, (state, action) => {
        const { userId, role } = action.payload;
        const userIndex = state.users.findIndex((user) => user.userId === userId);
        if (userIndex !== -1) {
          state.users[userIndex].role = role;
        }
      })
      .addCase(UpdateUserRole.rejected, (state, action) => {
        state.error = action.payload; // Set the error state
      });
  },
});

export const { setActiveUser, removeActiveUser } = userSlice.actions;

export default userSlice.reducer;
