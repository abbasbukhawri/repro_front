import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import roleReducer from "./slices/roleSlice";
import contactReducer from "./slices/contactSlice";
import leadReducer from "./slices/leadSlice";
export const store = configureStore({
  reducer: {
   user : userReducer,
   role :roleReducer,
   contact:contactReducer,
  lead : leadReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
