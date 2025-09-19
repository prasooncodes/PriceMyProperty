import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Configure axios base URL
const API_BASE_URL = 'http://localhost:4000/api';

// Async thunk for fetching all data from backend
export const fetchAllData = createAsyncThunk(
  'allData/fetchAllData',
  async (page = 1, { rejectWithValue }) => {
    try {
      console.log('Fetching data from API, page:', page);
      const response = await axios.get(`${API_BASE_URL}/allData/${page}`);
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Failed to fetch data from server'
      );
    }
  }
);

// Load sample data thunk (for backward compatibility)
export const loadSampleData = createAsyncThunk(
  'allData/loadSampleData',
  async (_, { dispatch }) => {
    // Instead of using hardcoded data, fetch from API
    return dispatch(fetchAllData(1));
  }
);

const allDataSlice = createSlice({
  name: 'allData',
  initialState: {
    data: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasMoreData: false
  },
  reducers: {
    resetData: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
      state.currentPage = 1;
      state.totalPages = 1;
      state.totalItems = 0;
      state.hasMoreData = false;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchAllData cases
      .addCase(fetchAllData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        // Check if response has pagination structure
        if (action.payload && action.payload.flats) {
          state.data = action.payload.flats;
          state.currentPage = action.payload.currentPage || 1;
          state.totalPages = action.payload.totalPages || 1;
          state.totalItems = action.payload.totalItems || action.payload.flats.length;
          state.hasMoreData = action.payload.hasMore || false;
        } else {
          // Handle simple array response (your current controller format)
          state.data = Array.isArray(action.payload) ? action.payload : [];
          state.totalPages = 1;
          state.currentPage = 1;
          state.totalItems = state.data.length;
          state.hasMoreData = false;
        }
        
        console.log('Data loaded:', state.data.length, 'items');
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || 'Failed to fetch data';
        state.data = [];
        console.error('Failed to load data:', state.error);
      })
      // loadSampleData cases (now redirects to fetchAllData)
      .addCase(loadSampleData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSampleData.fulfilled, (state) => {
        state.loading = false;
        // Data will be updated by the fetchAllData fulfillment
      })
      .addCase(loadSampleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load data';
      });
  }
});

export const { resetData, setCurrentPage } = allDataSlice.actions;
export default allDataSlice.reducer;