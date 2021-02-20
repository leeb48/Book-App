import { AppThunk } from "app/store";
import { springAxios } from "config/springAxios";
import {
  clearInputErrors,
  InputErrors,
  setAlert,
  setInputErrors,
} from "features/alerts/alertsSlice";
import { Book } from "interfaces/book.interface";
import {
  addBookToBookshelfDto,
  createBookshelfSuccess,
  getUsersBookshelfSuccess,
  removeBookFromBookshelfDto,
  setBookshelfLoading,
  setSelectedBookshelf,
} from ".";
import {
  Bookshelf,
  CreateBookshelfDto,
  removeBookFromBookshelfSuccess,
  removeBookshelfSuccess,
} from "./bookshelfSlice";

export const createBookshelf = (data: CreateBookshelfDto): AppThunk => async (
  dispatch
) => {
  // send the data to the backend to create a new bookshelf
  // if the name of the bookshelf already exists, then show an error message
  try {
    dispatch(clearInputErrors());

    const res = await springAxios.post<Bookshelf>(
      "/books/create-bookshelf",
      data
    );

    dispatch(createBookshelfSuccess(res.data));
    dispatch(
      setAlert({
        alertType: "success",
        message: `${res.data.bookshelfName} Created`,
      })
    );
  } catch (error) {
    if (error.response) {
      dispatch(setInputErrors(error.response.data as InputErrors));
      dispatch(
        setAlert({ alertType: "error", message: "Could Not Create Bookshelf" })
      );
    }
  }
};

export const removeBookshelf = (bookshelfName: string): AppThunk => async (
  dispatch
) => {
  try {
    const res = await springAxios.delete<string>(
      `/books/remove/${bookshelfName}`
    );
    dispatch(removeBookshelfSuccess(bookshelfName));
    dispatch(setAlert({ alertType: "info", message: res.data }));
  } catch (error) {
    console.log(error);
  }
};

export const getUsersBookshelves = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setBookshelfLoading(true));
    const res = await springAxios.get<Bookshelf[]>("/books/get-bookshelves");

    dispatch(getUsersBookshelfSuccess(res.data));
    dispatch(setBookshelfLoading(false));
  } catch (error) {
    dispatch(setBookshelfLoading(false));
    console.log(error);
  }
};

export const getBookshelf = (bookshelfName: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(setBookshelfLoading(true));
    const res = await springAxios.get<Bookshelf>(`/books/${bookshelfName}`);

    dispatch(setSelectedBookshelf(res.data));

    dispatch(setBookshelfLoading(false));
  } catch (error) {
    dispatch(setBookshelfLoading(false));
    console.log(error);
  }
};

export const addBookToBookshelf = (
  data: addBookToBookshelfDto
): AppThunk => async (dispatch) => {
  try {
    const res = await springAxios.post<{
      book: Book;
      bookAddedToBookshelfMessage: string;
    }>("/books/add-book-to-bookshelf", data);

    dispatch(
      setAlert({
        alertType: "success",
        message: res.data.bookAddedToBookshelfMessage,
      })
    );
  } catch (error) {}
};

export const removeBookFromBookshelf = (
  data: removeBookFromBookshelfDto
): AppThunk => async (dispatch) => {
  try {
    const res = await springAxios.post<string>(
      "/books/remove-book-from-bookshelf",
      data
    );

    dispatch(removeBookFromBookshelfSuccess(data.book));

    dispatch(
      setAlert({
        alertType: "info",
        message: res.data,
      })
    );
  } catch (error) {}
};
