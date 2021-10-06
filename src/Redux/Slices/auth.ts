import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { authApi } from "src/Api";
import { ILogin, IRegister } from "src/Interface";
import { RootState } from "src/Redux";

export const login = createAsyncThunk("auth/login", async (body: ILogin, { rejectWithValue }) => {
  try {
    const res = await authApi.login(body);
    return res;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async (body: IRegister, { rejectWithValue }) => {
    try {
      const res = await authApi.register(body);
      return res;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

interface IInitialState {
  userInfo: {
    _id: string;
    username: string;
    email: string;
  } | null;
  token: string | null;
  isLoading: boolean;
}

const initialState: IInitialState = {
  userInfo: null,
  token: null,
  isLoading: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoading = false;
      state.token = null;
      state.userInfo = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      const { _id, username, email } = action.payload.userInfo;
      state.userInfo = { _id, username, email };
      state.token = action.payload.token;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.userInfo = null;
      state.token = null;
      state.isLoading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
      const { _id, username, email } = action.payload.userInfo;
      state.userInfo = { _id, username, email };
      state.token = action.payload.token;
      state.isLoading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.userInfo = null;
      state.token = null;
      state.isLoading = false;
    });
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { logout } = auth.actions;
export default auth.reducer;
export const authSelector = (state: RootState) => state.auth;
