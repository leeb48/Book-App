import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

type Alerts = {
  [type: string]: string;
};

export type InputErrors = {
  [field: string]: string;
};

type AlertsState = {
  alerts: Alerts[];
  inputErrors: InputErrors;
};

const initialState: AlertsState = {
  alerts: [],
  inputErrors: {},
};

// Case Reducers
const setInputErrorsReducer: CaseReducer<
  AlertsState,
  PayloadAction<InputErrors>
> = (state, { payload }) => {
  state.inputErrors = payload;
};

const clearInputErrorReducer: CaseReducer<AlertsState> = (state) => {
  state.inputErrors = {};
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setInputErrors: setInputErrorsReducer,
    clearInputErrors: clearInputErrorReducer,
  },
});

export const { setInputErrors, clearInputErrors } = alertsSlice.actions;

export default alertsSlice.reducer;
