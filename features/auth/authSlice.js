import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveUser, loadUser, clearUser } from "../../utils/localStorage";

const initialState = loadUser() || {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Fake Api login
const fakeLogin = ({ email, password }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === "123456") {
        resolve({
          user: { name: "Vicky", email },
          token: "jwt-token-xyz",
        });
      } else {
        reject("Wrong password!");
      }
    }, 1000);
  });

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      return await fakeLogin(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      clearUser();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        saveUser(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
