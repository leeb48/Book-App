import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { BookshelfState } from ".";
import { Bookshelf } from "./bookshelfSlice";

export const createBookshelfReducer: CaseReducer<
  BookshelfState,
  PayloadAction<Bookshelf>
> = (state, { payload }) => {};
