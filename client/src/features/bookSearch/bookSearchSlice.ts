import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchBooksApi, searchBooksPaginationApi } from "api/bookSearchApi";
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

const searchReducer: CaseReducer<
  BookSearchState,
  PayloadAction<BookSearchResponse>
> = (state, { payload }) => {
  state.searchResponse = payload;
  // Limit the pagination to 500 books
  if (payload.totalItems >= 500) {
    state.searchResponse.totalItems = 500;
  }
};

const searchLoadingReducer: CaseReducer<
  BookSearchState,
  PayloadAction<Boolean>
> = (state, { payload }) => {
  state.searchLoading = payload;
};

const searchInfoReducer: CaseReducer<
  BookSearchState,
  PayloadAction<SearchInfo>
> = (state, { payload }) => {
  state.searchInfo = payload;
};

const searchBooksPaginationReducer: CaseReducer<
  BookSearchState,
  PayloadAction<BookSearchResponse>
> = (state, { payload }) => {};

const clearSearchResultsReducer: CaseReducer<BookSearchState> = (state) => {
  state.searchResponse = null;
};

const updateSearchResultsReducer: CaseReducer<
  BookSearchState,
  PayloadAction<BookSearchResponse>
> = (state, { payload }) => {
  state.searchResponse!.items = payload.items;
};

const BookSearchSlice = createSlice({
  name: "booksearch",
  initialState,
  reducers: {
    searchBooksSuccess: searchReducer,
    searchBooksPaginationSuccess: searchBooksPaginationReducer,
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
  searchBooksPaginationSuccess,
} = BookSearchSlice.actions;
export default BookSearchSlice.reducer;

// Thunks
export const searchBooks = (data: SearchInfo): AppThunk => async (dispatch) => {
  dispatch(searchLoading(true));
  dispatch(clearSearchResults());
  dispatch(searchInfo(data));
  const res = await searchBooksApi(data);

  if (res) {
    dispatch(searchBooksSuccess(res));
    dispatch(searchLoading(false));
  }
};

export const searchBooksPagination = (
  startIdx: number,
  data: SearchInfo
): AppThunk => async (dispatch) => {
  dispatch(searchLoading(true));
  const res = await searchBooksPaginationApi(startIdx, data);
  dispatch(updateSearchResults(res!));
  dispatch(searchLoading(false));
};
