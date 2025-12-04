import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getRequest, postRequest, patchRequest } from "../../utils/api";


interface Location {
  id: number;
  label: string;
  longitude: number;
  latitude: number;
  country: any;
  city: any;
  community: any;
  subcommunity: any;
}

interface LocationState {
  list: Location[];
  searchResults: Location[];
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  list: [],
  searchResults: [],
  loading: false,
  error: null,
};

// Fetch all locations
export const fetchLocations = createAsyncThunk<Location[], void>(
  "location/fetchLocations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getRequest("/locations") as any;
      // Type assertion to handle API response
      const data = res.data || res;
      return Array.isArray(data) ? data : [];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Search locations
export const searchLocations = createAsyncThunk<Location[], string>(
  "location/searchLocations",
  async (query, { rejectWithValue }) => {
    try {
      const res = await getRequest(`/locations?q=${query}`);
      return Array.isArray(res) ? res : [];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Create location
export const createLocation = createAsyncThunk<Location, any>(
  "location/createLocation",
  async (data, { rejectWithValue }) => {
    try {
      return await postRequest("/locations", data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Update location
export const updateLocation = createAsyncThunk<
  Location,
  { id: number; location: any }
>("location/updateLocation", async ({ id, location }, { rejectWithValue }) => {
  try {
    return await patchRequest(`/locations/${id}`, { location });
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Delete location
export const deleteLocation = createAsyncThunk<Location, number>(
  "location/deleteLocation",
  async (id, { rejectWithValue }) => {
    try {
      return await patchRequest(`/locations/${id}`, { status: "deleted" });
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ---------------- Fetch
    builder.addCase(fetchLocations.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchLocations.fulfilled,
      (state, action: PayloadAction<Location[]>) => {
        state.loading = false;
        state.list = action.payload;
      }
    );
    builder.addCase(fetchLocations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // ---------------- Search
    builder.addCase(searchLocations.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      searchLocations.fulfilled,
      (state, action: PayloadAction<Location[]>) => {
        state.loading = false;
        state.searchResults = action.payload;
      }
    );
    builder.addCase(searchLocations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // ---------------- Create
    builder.addCase(createLocation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      createLocation.fulfilled,
      (state, action: PayloadAction<Location>) => {
        state.loading = false;
        state.list.push(action.payload);
      }
    );
    builder.addCase(createLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // ---------------- Update
    builder.addCase(updateLocation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateLocation.fulfilled,
      (state, action: PayloadAction<Location>) => {
        state.loading = false;
        const index = state.list.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      }
    );
    builder.addCase(updateLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // ---------------- Delete
    builder.addCase(deleteLocation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteLocation.fulfilled,
      (state, action: PayloadAction<Location>) => {
        state.loading = false;
        state.list = state.list.filter((l) => l.id !== action.payload.id);
      }
    );
    builder.addCase(deleteLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default locationSlice.reducer;
