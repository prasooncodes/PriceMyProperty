import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Sample data to display
const sampleData = [
  {
    "_id": "J71214794", // Using PROP_ID as _id for React key
    "PROP_ID": "J71214794",
    "PROPERTY_TYPE": "Flat",
    "SOCIETY_NAME": "Bhawani bandhan",
    "CITY": "Kolkata North",
    "location": "Madhyamgram",
    "BEDROOM_NUM": 2.0,
    "BALCONY_NUM": 1.0,
    "AREA": 920,
    "Price_per_sqft": 4239.0,
    "PRICE": 0.39,
    "AGE": "Old Property",
    "FURNISH": "Unfurnished",
    "amenity_luxury": "Medium",
    "FLOOR_NUM": 1,
    "LATITUDE": 22.690003,
    "LONGITUDE": 88.45908,
    "TOTAL_FLOOR": 11.0,
    "DESCRIPTION": "Experience a new style of living with Bhawani Bandhan. It offers an exclusive range of 2 BHK apartments in Madhyamgram, Kolkata North. Here is a steal deal for you. Book your 2 BHK apartment here at a never before price of Rs. 39 Lac. The unit has a super built-up area of 920.0 sq. ft. \n\nThis is an under construction project. It has been designed keeping every small to large needs of residents in consideration. Plus, a comprehensive range of amenities including Indoor Games, Card Room, Gymnasium, Lift(s), Banquet Hall, etc. make it one of the most desirable residential projects in Kolkata North.",
    "Image": "https://cdn.pixabay.com/photo/2017/06/16/13/40/new-home-2409165_960_720.jpg",
    "Situation": "Ready To Move",
    "Owner_Type": "Owner",
    "Contact": "+91-1690606093",
    "Facing_Direction": "North-East",
    "Loan_Availability": false,
    "Estimated_Monthly_EMI": null,
    "Maintenance_Fees": 4698,
    "Property_Tax": 24582,
    "Stamp_Duty_Registration_Costs": 6.57,
    "Nearest_Schools": {
      "St. James' School": 8.78
    },
    "Nearest_Colleges": {
      "Jadavpur University": 4.44
    },
    "Nearest_Hospitals": {
      "Ruby General": 6.31
    },
    "Nearest_Markets": {
      "Hatibagan Market": 4.64
    },
    "Nearest_Public_Transport": {
      "Esplanade Metro": 6.67
    },
    "Nearest_Restaurants": {
      "Mocambo": 3.02
    },
    "Nearest_Railway_Stations": {
      "Belghoria Station": 2.2
    },
    "Nearest_Malls": {
      "Forum Mall": 8.15
    },
    "Swimming_Pool": false,
    "Playground": true,
    "RERA_Registration_Number": 904252,
    "24x7_Security": true,
    "Visitor_Parking": true,
    "Intercom_Facility": false,
    "Power_Backup": false,
    "Water_Supply": "Municipal",
    "Pet_Friendly": false,
    "Fire_Safety_Installed": false
  }
];

// Thunk to fetch paginated data (modified to return sample data)
export const fetchAllData = createAsyncThunk('allProperty/fetchData', async (page) => {
  try {
    // Try to fetch from API first
    const response = await axios.get(`${process.env.REACT_APP_NODE_API_URL}allData/${page}`)
    return response.data
  } catch (error) {
    // If API fails, return sample data
    console.log('API failed, returning sample data:', error.message)
    if (page === 1) {
      return sampleData
    } else {
      return [] // No more data for additional pages
    }
  }
})

// Slice to handle data fetching, loading, and pagination
const allDataSlice = createSlice({
  name: 'allData',
  initialState: {
    data: [],
    loading: false,
    error: null,
    hasMoreData: true,
  },
  reducers: {
    // Add action to load sample data directly
    loadSampleData: (state) => {
      state.data = [...sampleData]
      state.loading = false
      state.error = null
      state.hasMoreData = false
    }
  },
  extraReducers: (builder) => {
    builder
      // fulfilled
      .addCase(fetchAllData.fulfilled, (state, action) => {
        const fetchedData = action.payload

        if (fetchedData.length !== 0) {
          // Prevent duplicates
          const existingIds = state.data.map(item => item._id || item.PROP_ID)
          const newData = fetchedData.filter(item => 
            !existingIds.includes(item._id || item.PROP_ID)
          )
          state.data.push(...newData)
          state.hasMoreData = fetchedData.length > 0
        } else {
          state.hasMoreData = false
        }
        state.loading = false
        state.error = null
      })
      //pending
      .addCase(fetchAllData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      //rejected
      .addCase(fetchAllData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        
        // Fallback: load sample data if API fails
        if (state.data.length === 0) {
          state.data = [...sampleData]
          state.hasMoreData = false
        }
      })
  },
})

// Export actions
export const { loadSampleData } = allDataSlice.actions

// Export the reducer
export default allDataSlice.reducer