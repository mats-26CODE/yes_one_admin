import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "../features/teamSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    team: teamReducer,
    user: userReducer,
  },
});
