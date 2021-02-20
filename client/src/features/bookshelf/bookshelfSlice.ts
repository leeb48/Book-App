import { createSlice } from "@reduxjs/toolkit";
import { Book } from "interfaces/book.interface";
import { ItemsEntity } from "interfaces/bookSearchResponse.interface";
import {
  clearBookshelfReducer,
  createBookshelfReducer,
  getUsersBookshelvesReducer,
  removeBookFromBookshelfReducer,
  removeBookshelfReducer,
  setBookshelfLoadingReducer,
  setSelectedBookshelfReducer,
} from "./bookshelfCaseReducers";

export type BookshelfState = {
  selectedBookshelf: Bookshelf | null;
  currentUsersBookshelves: Bookshelf[];
  loading: Boolean;
};

export type Bookshelf = {
  books: Book[];
  bookshelfIdentifier: string;
  bookshelfName: string;
};

export type CreateBookshelfDto = {
  bookshelfName: string;
};

export type addBookToBookshelfDto = {
  bookshelfName: string;
  book: ItemsEntity;
};

export type removeBookFromBookshelfDto = {
  bookshelfName: string | undefined;
  book: Book;
};

const initialState: BookshelfState = {
  selectedBookshelf: null,
  currentUsersBookshelves: [],
  loading: false,
};

const BookshelfSlice = createSlice({
  name: "bookshelf",
  initialState,
  reducers: {
    createBookshelfSuccess: createBookshelfReducer,
    removeBookshelfSuccess: removeBookshelfReducer,
    getUsersBookshelfSuccess: getUsersBookshelvesReducer,
    setBookshelfLoading: setBookshelfLoadingReducer,
    setSelectedBookshelf: setSelectedBookshelfReducer,
    removeBookFromBookshelfSuccess: removeBookFromBookshelfReducer,
    clearBookshelf: clearBookshelfReducer,
  },
});

export const {
  createBookshelfSuccess,
  removeBookshelfSuccess,
  getUsersBookshelfSuccess,
  setBookshelfLoading,
  setSelectedBookshelf,
  removeBookFromBookshelfSuccess,
  clearBookshelf,
} = BookshelfSlice.actions;
export default BookshelfSlice.reducer;
