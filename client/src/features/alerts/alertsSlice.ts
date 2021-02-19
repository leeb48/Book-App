import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { v4 as uuidv4 } from "uuid";

export type Alert = {
  alertType: "success" | "info" | "warning" | "error" | undefined;
  message: string;
  uuid?: string;
};

export type InputErrors = {
  [field: string]: string;
};

type AlertsState = {
  alerts: Alert[];
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

const setAlertReducer: CaseReducer<AlertsState, PayloadAction<Alert>> = (
  state,
  { payload }
) => {
  state.alerts.push(payload);
};

const removeAlertReducer: CaseReducer<AlertsState, PayloadAction<string>> = (
  state,
  { payload }
) => {
  const index = state.alerts.findIndex((alert) => alert.uuid === payload);
  if (index !== -1) state.alerts.splice(index, 1);
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setInputErrors: setInputErrorsReducer,
    clearInputErrors: clearInputErrorReducer,
    setAlertSuccess: setAlertReducer,
    removeAlertSuccess: removeAlertReducer,
  },
});

export const {
  setInputErrors,
  clearInputErrors,
  setAlertSuccess,
  removeAlertSuccess,
} = alertsSlice.actions;

// Thunk
export const setAlert = (alert: Alert): AppThunk => async (dispatch) => {
  const uuid = uuidv4();

  alert.uuid = uuid;

  dispatch(setAlertSuccess(alert));

  setTimeout(() => {
    dispatch(removeAlertSuccess(uuid));
  }, 6000);
};

export default alertsSlice.reducer;
