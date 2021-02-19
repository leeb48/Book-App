import { AppThunk } from "app/store";
import { springAxios } from "config/springAxios";
import {
  clearInputErrors,
  InputErrors,
  setAlert,
  setInputErrors,
} from "features/alerts/alertsSlice";
import { BookSearchResponse } from "interfaces/bookSearchResponse.interface";
import {
  clearSearchResults,
  searchBooksSuccess,
  searchInfo,
  SearchInfo,
  searchLoading,
  updateSearchResults,
} from "./bookSearchSlice";

// Thunks ----------------------------------------------------------------------
export const searchBooks = (data: SearchInfo): AppThunk => async (dispatch) => {
  try {
    dispatch(clearInputErrors());
    dispatch(searchLoading(true));
    dispatch(clearSearchResults());
    dispatch(searchInfo(data));

    const res = await springAxios.post<BookSearchResponse>("/search", data);

    dispatch(searchBooksSuccess(res.data));
    dispatch(searchLoading(false));
  } catch (error) {
    dispatch(searchLoading(false));
    if (error.response) {
      dispatch(setInputErrors(error.response.data as InputErrors));
      dispatch(
        setAlert({
          alertType: "error",
          message: "Search Failed",
        })
      );
    }
  }
};

export const searchBooksPagination = (
  startIdx: number,
  data: SearchInfo
): AppThunk => async (dispatch) => {
  try {
    dispatch(searchLoading(true));

    // need to overwrite startIndex value in data by making a new copy
    let paginationRequest = Object.assign({}, data);
    paginationRequest.startIndex = startIdx;

    const res = await springAxios.post<BookSearchResponse>(
      "/search",
      paginationRequest
    );

    if (res) {
      dispatch(updateSearchResults(res.data));
    }
    dispatch(searchLoading(false));
  } catch (error) {
    dispatch(searchLoading(false));
    console.log(error);
  }
};
