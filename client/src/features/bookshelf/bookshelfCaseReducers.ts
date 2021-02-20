import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "interfaces/book.interface";
import { BookshelfState } from ".";
import { Bookshelf } from "./bookshelfSlice";

export const createBookshelfReducer: CaseReducer<
  BookshelfState,
  PayloadAction<Bookshelf>
> = (state, { payload }) => {
  state.currentUsersBookshelves.push(payload);
};

export const removeBookshelfReducer: CaseReducer<
  BookshelfState,
  PayloadAction<string>
> = (state, { payload }) => {
  const index = state.currentUsersBookshelves.findIndex(
    (bookshelf) => bookshelf.bookshelfName === payload
  );
  state.currentUsersBookshelves.splice(index, 1);
};

export const getUsersBookshelvesReducer: CaseReducer<
  BookshelfState,
  PayloadAction<Bookshelf[]>
> = (state, { payload }) => {
  state.currentUsersBookshelves = payload;
};

export const setBookshelfLoadingReducer: CaseReducer<
  BookshelfState,
  PayloadAction<Boolean>
> = (state, { payload }) => {
  state.loading = payload;
};

export const setSelectedBookshelfReducer: CaseReducer<
  BookshelfState,
  PayloadAction<Bookshelf>
> = (state, { payload }) => {
  state.selectedBookshelf = payload;
};

export const removeBookFromBookshelfReducer: CaseReducer<
  BookshelfState,
  PayloadAction<Book>
> = (state, { payload }) => {
  const index = state.selectedBookshelf?.books.findIndex(
    (book) => book.googleBooksId === payload.googleBooksId
  );
  state.selectedBookshelf?.books.splice(index!, 1);
};

export const clearBookshelfReducer: CaseReducer<BookshelfState> = (state) => {
  state.currentUsersBookshelves = [];
  state.selectedBookshelf = null;
};
