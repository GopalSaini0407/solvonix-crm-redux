import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import contactsReducer from "../features/contacts/contactSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts:contactsReducer,
  },
})
