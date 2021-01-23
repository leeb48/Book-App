import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "features/userAuth/userSlice";
import alertsReducer from "features/alerts/alertsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  alerts: alertsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
