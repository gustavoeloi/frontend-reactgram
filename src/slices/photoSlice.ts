import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "@/services/photoService";
import { RootState } from "@/store";

interface InitialState {
  photos: any[];
  photo: any;
  error: boolean | string;
  loading: boolean;
  sucess: boolean;
  message: string | null;
}

const initialState: InitialState = {
  photos: [],
  photo: {},
  error: false,
  loading: false,
  sucess: false,
  message: null,
};

export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth?.user?.token ?? "";

    const data = await photoService.publishPhoto(photo, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.sucess = true;
        state.photo = action.payload;
        state.photos.unshift(state.photo);
        state.message = "Foto publicada com sucesso!";
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.photo = {};
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
