import { createSlice } from "@reduxjs/toolkit";
import { BookSearchResponse } from "interfaces/bookSearchResponse.interface";
import {
  clearSearchResultsReducer,
  searchInfoReducer,
  searchLoadingReducer,
  searchReducer,
  updateSearchResultsReducer,
} from "./bookSearchCaseReducers";

export type BookSearchState = {
  searchInfo: SearchInfo;
  searchResponse: BookSearchResponse | null;
  searchLoading: Boolean;
};

export type SearchInfo = {
  generalSearch: string | "";
  title: string | "";
  author: string | "";
  publisher: string | "";
  subject: string | "";
  isbn: string | "";
  startIndex: number | "";
  resultsPerPage: number;
};

const initialState: BookSearchState = {
  searchInfo: {
    generalSearch: "",
    title: "",
    author: "",
    publisher: "",
    subject: "",
    isbn: "",
    startIndex: 0,
    resultsPerPage: 10,
  },
  searchResponse: null,
  searchLoading: false,
};

const BookSearchSlice = createSlice({
  name: "booksearch",
  initialState,
  reducers: {
    searchBooksSuccess: searchReducer,
    updateSearchResults: updateSearchResultsReducer,
    searchLoading: searchLoadingReducer,
    clearSearchResults: clearSearchResultsReducer,
    searchInfo: searchInfoReducer,
  },
});

export const {
  searchBooksSuccess,
  searchLoading,
  clearSearchResults,
  updateSearchResults,
  searchInfo,
} = BookSearchSlice.actions;
export default BookSearchSlice.reducer;
