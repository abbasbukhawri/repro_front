import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest, patchRequest } from "../../utils/api";
import { RootState } from "../store";

interface Property {
  id: number;
  reference?: string;
  title?: string;
  price?: number;
  property_type?: string;
  bedrooms?: number;
  bathrooms?: number;
  location_id: number;
  location?: any;
  [key: string]: any;
}
interface PropertyState {
  list: Property[];
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  list: [],
  loading: false,
  error: null,
};

// Fetch properties + attach location info
// In locationSlice.ts
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

// In propertySlice.ts
export const fetchProperties = createAsyncThunk<
  Property[],
  void,
  { state: RootState }
>("property/fetchProperties", async (_, { rejectWithValue, getState }) => {
  try {
    const res = await getRequest("/properties") as any;
    // Type assertion to handle API response
    const data = res.data || res;
    const properties = Array.isArray(data) ? data : [];

    // Access locations from slice
    const locations = getState().location.list;

    return properties.map((p) => ({
      ...p,
      location: locations.find((loc) => loc.id === p.location_id) || null,
    }));
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Create property
export const createProperty = createAsyncThunk<Property, any>(
  "property/createProperty",
  async (data, { rejectWithValue }) => {
    try {
      return await postRequest("/properties", data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Update property
export const updateProperty = createAsyncThunk<
  Property,
  { id: number; property: any }
>("property/updateProperty", async ({ id, property }, { rejectWithValue }) => {
  try {
    return await patchRequest(`/properties/${id}`, { property });
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Delete property
export const deleteProperty = createAsyncThunk<Property, number>(
  "property/deleteProperty",
  async (id, { rejectWithValue }) => {
    try {
      return await patchRequest(`/properties/${id}`, { status: "deleted" });
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchProperties.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchProperties.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create
    builder.addCase(createProperty.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });

    // Update
    builder.addCase(updateProperty.fulfilled, (state, action) => {
      const index = state.list.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    });

    // Delete
    builder.addCase(deleteProperty.fulfilled, (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload.id);
    });
  },
});

export default propertySlice.reducer;
