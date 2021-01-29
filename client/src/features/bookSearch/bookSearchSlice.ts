import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchBooksApi } from "api/bookSearchApi";
import { AppThunk } from "app/store";
import { BookSearchResponse } from "interfaces/bookSearchResponse.interface";

type BookSearchState = {
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
  resultsPerPage: number | "";
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

const searchReducer: CaseReducer<
  BookSearchState,
  PayloadAction<BookSearchResponse>
> = (state, { payload }) => {
  state.searchResponse = payload;
};

const searchLoadingReducer: CaseReducer<
  BookSearchState,
  PayloadAction<Boolean>
> = (state, { payload }) => {
  state.searchLoading = payload;
};

const clearSearchResultsReducer: CaseReducer<BookSearchState> = (state) => {
  state.searchResponse = null;
};

const BookSearchSlice = createSlice({
  name: "booksearch",
  initialState,
  reducers: {
    searchBooksSuccess: searchReducer,
    searchLoading: searchLoadingReducer,
    clearSearchResults: clearSearchResultsReducer,
  },
});

export const {
  searchBooksSuccess,
  searchLoading,
  clearSearchResults,
} = BookSearchSlice.actions;
export default BookSearchSlice.reducer;

// Thunks
export const searchBooks = (data: SearchInfo): AppThunk => async (dispatch) => {
  dispatch(searchLoading(true));
  dispatch(clearSearchResults());
  const res = await searchBooksApi(data);

  if (res) {
    dispatch(searchBooksSuccess(res));
    dispatch(searchLoading(false));
  }
};
