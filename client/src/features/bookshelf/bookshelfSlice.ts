import { createSlice } from "@reduxjs/toolkit";
import { Book } from "interfaces/book.interface";
import { createBookshelfReducer } from "./bookshelfCaseReducers";

export type BookshelfState = {
  selectedBookshelf: Bookshelf | null;
  currentUsersBookshelves: Bookshelf[];
};

export type Bookshelf = {
  books: Book[];
  bookshelfIdentifier: string;
  bookshelfName: string;
};

export type CreateBookshelfDto = {
  bookshelfName: string;
};

const initialState: BookshelfState = {
  selectedBookshelf: null,
  currentUsersBookshelves: [],
};

const BookshelfSlice = createSlice({
  name: "bookshelf",
  initialState,
  reducers: { createBookshelfSuccess: createBookshelfReducer },
});

export const { createBookshelfSuccess } = BookshelfSlice.actions;
export default BookshelfSlice.reducer;
