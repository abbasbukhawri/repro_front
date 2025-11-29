import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getRequest, patchRequest, postRequest } from "../../utils/api";

export interface User {
role_id: any;
brand_access: number;
id: number;
email: string;
first_name: string;
last_name: string;
full_name: string;
phone: string;
role: { id: number; name: string; key: string };
company: { id: number; name: string; company_type: string };
avatar?: string;
status?:  string;
}

interface UserState {
list: User[];
loading: boolean;
error: string | null;
}

const initialState: UserState = {
list: [],
loading: false,
error: null,
};

// Fetch all users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
const response = await getRequest<any>("/users");
// Normalize response: extract the users array
if (Array.isArray(response.users)) return response.users;
return [];
});

export const createUser = createAsyncThunk("user/createUser", async (user: User) => {
const response = await postRequest<any>("/users", { user });
// API may return the created user in `response.user`
return response.user || user;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, ...userData }: { id: number; [key: string]: any }) => {
    // Wrap the data in "user", but remove "id" from inside
    const { id: _omit, ...payload } = userData; // ensures id is not sent inside
    const response = await patchRequest<any>(`/users/${id}`, { user: payload });

    // Return updated user or fallback
    return response.user || { id, ...payload };
  }
);


export const deleteUser = createAsyncThunk("user/deleteUser", async (id: number) => {
await postRequest(`/users/${id}/delete`);
return id;
});

export const userSlice = createSlice({
name: "user",
initialState,
reducers: {},
extraReducers: (builder) => {
builder
.addCase(fetchUsers.pending, (state) => {
state.loading = true;
state.error = null;
})
.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
  state.loading = false;
  state.list = (action.payload || []).map((u) => ({
  ...u,
  role_name: u.role?.name || "N/A",
  brand_access: u.brand_access ?? 0,
  status:
    u.status?.toLowerCase() === "inactive"
      ? "inactive"
      : "active", // default to Active if missing or any other value
}));

})

.addCase(fetchUsers.rejected, (state, action) => {
state.loading = false;
state.error = action.error?.message || "Failed to fetch users";
})
.addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
//
})

.addCase(updateUser.fulfilled, (state, action) => {
  const index = state.list.findIndex((u) => u.id === action.payload.id);

  if (index !== -1) {
    const rawStatus = action.payload.status;

    const normalizedStatus =
      typeof rawStatus === "string"
        ? rawStatus.toLowerCase()
        : rawStatus === 1
        ? "inactive"
        : "active";

    state.list[index] = {
      ...action.payload,
      status: normalizedStatus === "inactive" ? "Inactive" : "Active",
    };
  }
})



.addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
state.list = state.list.filter((u) => u.id !== action.payload);
});
},
});

export default userSlice.reducer;
