import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "features/userAuth/userSlice";
import alertsReducer from "features/alerts/alertsSlice";
import bookSearchReducer from "features/bookSearch/bookSearchSlice";
import bookshelfReducer from "features/bookshelf/bookshelfSlice";

const rootReducer = combineReducers({
  user: userReducer,
  alerts: alertsReducer,
  bookSearch: bookSearchReducer,
  bookshelf: bookshelfReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
