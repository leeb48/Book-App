// Case Reducers ----------------------------------------------------------------------
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { BookSearchResponse } from "interfaces/bookSearchResponse.interface";
import { BookSearchState, SearchInfo } from "./bookSearchSlice";

export const searchReducer: CaseReducer<
  BookSearchState,
  PayloadAction<BookSearchResponse>
> = (state, { payload }) => {
  state.searchResponse = payload;
  // Limit the pagination to 500 books
  if (payload.totalItems >= 500) {
    state.searchResponse.totalItems = 500;
  }
};

export const searchLoadingReducer: CaseReducer<
  BookSearchState,
  PayloadAction<Boolean>
> = (state, { payload }) => {
  state.searchLoading = payload;
};

export const searchInfoReducer: CaseReducer<
  BookSearchState,
  PayloadAction<SearchInfo>
> = (state, { payload }) => {
  state.searchInfo = payload;
};

export const clearSearchResultsReducer: CaseReducer<BookSearchState> = (
  state
) => {
  state.searchResponse = null;
};

export const updateSearchResultsReducer: CaseReducer<
  BookSearchState,
  PayloadAction<BookSearchResponse>
> = (state, { payload }) => {
  state.searchResponse!.items = payload.items;
};
