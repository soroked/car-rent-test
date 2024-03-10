import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCars = createAsyncThunk(
  'cars/fetchAll',
  async ({page}, { rejectWithValue }) => {
    try {
      const limit = page * 12;
      const one = 1;
      const { data } = await axios.get(`https://65e89fc84bb72f0a9c4ff3d9.mockapi.io/api/adverts?&page=${one}&limit=${limit}`);
      return data
    } catch (err) {
      return rejectWithValue(err.message) 
    }
  }
);

const initialState = {
  cars: null,
  isLoading: false,
  error: null,
  page: 1,
}

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    pageIncrement: (state, {payload}) => {
      state.page = payload;
    }
  },
  extraReducers: builder => builder.addCase(fetchCars.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  }).addCase(fetchCars.fulfilled, (state, {payload}) => {
    state.isLoading = false;
    state.cars = payload;
  }).addCase(fetchCars.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
  })
});

export const { pageIncrement } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
