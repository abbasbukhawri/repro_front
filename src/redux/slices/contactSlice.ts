import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest, patchRequest } from "../../utils/api"; 

interface ContactState {
list: any[];
loading: boolean;
error: string | null;
}

const initialState: ContactState = {
list: [],
loading: false,
error: null,
};

// Fetch all contacts
export const fetchContacts = createAsyncThunk<any[], void>(
"contact/fetchContacts",
async (_, { rejectWithValue }) => {
try {
return await getRequest("/contacts");
} catch (err: any) {
return rejectWithValue(err.message);
}
}
);

// Create a new contact
export const createContact = createAsyncThunk<any, any>(
"contact/createContact",
async (data: any, { rejectWithValue }) => {
try {
return await postRequest("/contacts", data);
} catch (err: any) {
return rejectWithValue(err.message);
}
}
);

// Update an existing contact
export const updateContact = createAsyncThunk<any, { id: number; contact: any }>(
  "contact/updateContact",
  async ({ id, contact }: { id: number; contact: any }, { rejectWithValue }) => {
    try {
      return await patchRequest(`/contacts/${id}.json`, { contact });
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete contact (soft delete if API supports PATCH, else POST)
export const deleteContact = createAsyncThunk<any, number>(
"contact/deleteContact",
async (id: number, { rejectWithValue }) => {
try {
// Assuming your API uses PATCH for deletion. If not, adjust to postRequest.
return await patchRequest(`/contacts/${id}`, { status: "deleted" });
} catch (err: any) {
return rejectWithValue(err.message);
}
}
);

const contactSlice = createSlice({
name: "contact",
initialState,
reducers: {},
extraReducers: (builder) => {
// Fetch Contacts
builder.addCase(fetchContacts.pending, (state) => {
state.loading = true;
state.error = null;
});



builder.addCase(fetchContacts.fulfilled, (state, action) => {
state.loading = false;
state.list = action.payload.map((c) => ({
  ...c,
  brand_access: c.brand_access?.toLowerCase() // ensure "Repro" → "repro"
}));
});



builder.addCase(fetchContacts.rejected, (state, action) => {
state.loading = false;
state.error = action.payload as string;
});


// Create Contact
builder.addCase(createContact.pending, (state) => {
  state.loading = true;
  state.error = null;
});
builder.addCase(createContact.fulfilled, (state, action) => {
  state.loading = false;
  state.list.push(action.payload);
});
builder.addCase(createContact.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
});

// Update Contact
builder.addCase(updateContact.pending, (state) => {
  state.loading = true;
  state.error = null;
});
builder.addCase(updateContact.fulfilled, (state, action) => {
  state.loading = false;
  const index = state.list.findIndex((c) => c.id === action.payload.id);
  if (index !== -1) state.list[index] = action.payload;
});
builder.addCase(updateContact.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
});

// Delete Contact
builder.addCase(deleteContact.pending, (state) => {
  state.loading = true;
  state.error = null;
});
builder.addCase(deleteContact.fulfilled, (state, action) => {
  state.loading = false;
  state.list = state.list.filter((c) => c.id !== action.payload.id);
});
builder.addCase(deleteContact.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
});


},
});

export default contactSlice.reducer;
