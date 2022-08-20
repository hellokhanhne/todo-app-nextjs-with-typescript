import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../api";
import { setToken } from "../../utils/setToken";
import { AppState } from "../store";

export interface IUser {
  age: number;
  _id: string;
  name: string;
  email: string;
}

interface IInitState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: IInitState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// export const register = createAsyncThunk(
//   "auth/register",
//   async (data: any, { dispatch }) => {
//     try {
//       const response = await authApi.register(data);
//       localStorage.setItem("access_token", response.data.token);
//       setToken(response.data.token);
//       return response.data;
//     } catch (error: any) {
//       console.error(error);
//       localStorage.removeItem("access_token");
//       throw new Error(error);
//     }
//   }
// );

// export const login = createAsyncThunk("auth/login", async (data: any) => {
//   try {
//     const response = await authApi.login(data);
//     localStorage.setItem("access_token", response.data.token);

//     setToken(response.data.token);
//     return response.data;
//   } catch (error: any) {
//     console.error(error);
//     localStorage.removeItem("access_token");
//     throw new Error(error);
//   }
// });

export const loadUser = createAsyncThunk("auth/loaduser", async () => {
  try {
    const res = await authApi.loadUser();
    return res.data;
  } catch (error: any) {
    console.error(error);
    localStorage.removeItem("access_token");
    setToken(null);
    throw new Error(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading(state, action) {
      state.isLoading = action.payload;
    },
    changeAuth(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isLoading = action.payload.isLoading;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        console.log("load user reject");
        state.isLoading = false;
      });
  },
});

export const { setAuthLoading, changeAuth } = authSlice.actions;

export const authSelector = (state: AppState) => {
  return state.auth;
};

export default authSlice.reducer;
