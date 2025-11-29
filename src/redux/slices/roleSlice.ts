import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getRequest } from "../../utils/api";

export interface Role {
  id: number;
  name: string;
  key: string;
}

interface RoleState {
  list: Role[];
  loading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchRoles = createAsyncThunk("role/fetchRoles", async () => {
  return getRequest<Role[]>("/roles/search");
});

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action: PayloadAction<Role[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
      state.error = action.error.message || "Failed to fetch roles";

      });
  },
});

export default roleSlice.reducer;
