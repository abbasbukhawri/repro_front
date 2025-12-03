// redux/slices/leadSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest, patchRequest } from "../../utils/api";

export interface Lead {
  assigned: string;
  email: string;
  phone: string;
  name: any;
  id: number;
  contact_id?: number;
  assigned_to_id?: number;
  status?: string;
  source?: string;
  budget_min?: number;
  budget_max?: number;
  preferred_location_ids?: number[];
  property_ids?: number[];
  bed?: number;
  bath?: number;
  property_type?: string;
  lead_type?: string;

  // ✅ Add this
  notes_attributes?: { body: string }[];

  brand: "real-estate" | "business-setup";
  nationality?: string;
  service?: string;
  jurisdiction?: string;
  visas?: number;
  activity?: string;
  created_at?: string;
  updated_at?: string;
}


interface LeadState {
  list: Lead[];
  loading: boolean;
  error: string | null;
}

const initialState: LeadState = {
  list: [],
  loading: false,
  error: null,
};

// Fetch Leads
export const fetchLeads = createAsyncThunk<Lead[], void>(
  "lead/fetchLeads",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getRequest<any>("/leads");
      // Correct: the leads array is inside res.data
      return res.data ?? [];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


// Create Lead
export const createLead = createAsyncThunk<Lead, any>(
  "lead/createLead",
  async (payload, { rejectWithValue }) => {
    try {
      return await postRequest<Lead>("/leads", payload);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Update Lead
export const updateLead = createAsyncThunk<Lead, { id: number; data: any }>(
  "lead/updateLead",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await patchRequest<Lead>(`/leads/${id}`, data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


// Delete Lead
export const deleteLead = createAsyncThunk<number, number>(
  "lead/deleteLead",
  async (id, { rejectWithValue }) => {
    try {
      await getRequest(`/leads/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Leads
    builder.addCase(fetchLeads.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchLeads.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchLeads.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create Lead
    builder.addCase(createLead.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createLead.fulfilled, (state, action) => {
      state.loading = false;
      state.list.push(action.payload);
    });
    builder.addCase(createLead.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update Lead
    builder.addCase(updateLead.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateLead.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.list.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    });
    builder.addCase(updateLead.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete Lead
    builder.addCase(deleteLead.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteLead.fulfilled, (state, action) => {
      state.loading = false;
      state.list = state.list.filter((lead) => lead.id !== action.payload);
    });
    builder.addCase(deleteLead.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default leadSlice.reducer;
