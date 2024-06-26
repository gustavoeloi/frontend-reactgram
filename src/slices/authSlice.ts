import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "@/services/authService";
import { LoginData, RegisterData } from "@/utils/interfaces";

interface initialState {
  user: RegisterData | null;
  error: boolean | string;
  sucess: boolean | string;
  loading: boolean | string;
}

const userString = localStorage.getItem("user");
let user = null;

if (userString) {
  user = JSON.parse(userString);
}

const initialState: initialState = {
  user: user,
  error: false,
  sucess: false,
  loading: false,
};

// Register an user and sign in
export const register = createAsyncThunk(
  "auth/register",
  async (user: RegisterData, thunkAPI) => {
    if (!user) {
      return thunkAPI.rejectWithValue("Invalid user data");
    }

    const data = await authService.register(user);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginData, thunkAPI) => {
    if (!user) {
      return thunkAPI.rejectWithValue("Invalid user data");
    }

    const data = await authService.login(user);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.sucess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = false;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
