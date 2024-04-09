import userService from "@/services/userService";
import { RootState } from "@/store";
import { User } from "@/utils/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface initialState {
  user: User | null;
  error: boolean | string;
  sucess: boolean | string;
  loading: boolean | string;
  message?: string | null;
}

const initialState: initialState = {
  user: null,
  error: false,
  sucess: false,
  loading: false,
  message: null,
};

export const profile = createAsyncThunk(
  "user/profile",
  async (user: User, thunkAPI) => {
    const state = thunkAPI.getState() as RootState; // Especificando o tipo de estado como RootState
    const token = state.auth?.user?.token ?? "";

    const data = await userService.profile(user, token);

    return data;
  }
);

export const updateProfile = createAsyncThunk(
  "user/update",
  async (user: User, thunkAPI) => {
    const state = thunkAPI.getState() as RootState; // Especificando o tipo de estado como RootState
    const token = state.auth?.user?.token ?? "";

    const data = await userService.updateProfile(user, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log(state, action);
        state.loading = false;
        state.sucess = true;
        state.error = false;
        state.user = action.payload;
        state.message = "Usuário atualizado com sucesso!";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        console.log(state, action);
        state.loading = false;
        state.error = action.payload as string;
        state.user = {} as User;
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
