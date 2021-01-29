import { springAxios } from "config/springAxios";
import { SearchInfo } from "features/bookSearch/bookSearchSlice";
import { BookSearchResponse } from "interfaces/bookSearchResponse.interface";

export const searchBooksApi = async (data: SearchInfo) => {
  try {
    const res = await springAxios.post<BookSearchResponse>(
      "/books/search",
      data
    );

    return res.data;
  } catch (error) {
    // TODO: Handle error with custom alerts
    console.log(error.response.data);
  }
};
