import { AppThunk } from "app/store";
import { springAxios } from "config/springAxios";
import {
  clearInputErrors,
  InputErrors,
  setInputErrors,
} from "features/alerts/alertsSlice";
import { Bookshelf, CreateBookshelfDto } from "./bookshelfSlice";

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

    console.log(res.data);
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      dispatch(setInputErrors(error.response.data as InputErrors));
    }
  }
};

export const getUsersBookshelves = (): AppThunk => async (dispatch) => {
  try {
    const res = await springAxios.get<Bookshelf[]>("/books/get-bookshelves");
    console.log(res.data);
  } catch (error) {}
};
