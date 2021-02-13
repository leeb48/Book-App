import { CircularProgress, Container, Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { RootState } from "app/rootReducer";
import { useAppDispatch } from "app/store";
import { searchBooksPagination } from "features/bookSearch";
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import BookItem from "./BookItem";
import BookSearchBar from "./BookSearchBar";

const BookSearchPage = () => {
  const dispatch = useAppDispatch();

  const {
    searchLoading,
    searchResults,
    totalItems,
    resultsPerPage,
    searchInfo,
  } = useSelector((state: RootState) => {
    return {
      searchLoading: state.bookSearch.searchLoading,
      searchResults: state.bookSearch.searchResponse?.items,
      totalItems: state.bookSearch.searchResponse?.totalItems,
      resultsPerPage: state.bookSearch.searchInfo.resultsPerPage,
      searchInfo: state.bookSearch.searchInfo,
    };
  }, shallowEqual);

  // Pagination logic
  const paginationCount = totalItems
    ? Math.floor(totalItems / resultsPerPage)
    : 0;

  const [page, setPage] = useState(1);
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // calcuate the next start index when fetching the results
    const startIdx = value === 1 ? 0 : (value - 1) * resultsPerPage;
    dispatch(searchBooksPagination(startIdx, searchInfo));
    window.scrollTo(0, 0);
  };

  const resultsDisplay =
    searchResults &&
    searchResults.map((book) => (
      <Grid key={book.id} item xs={12}>
        <BookItem book={book} />
      </Grid>
    ));

  return (
    <Container maxWidth="lg">
      <Grid container>
        <BookSearchBar />
        <Grid item container justify="center" spacing={3} xs={12}>
          {searchLoading ? <CircularProgress /> : resultsDisplay}
        </Grid>

        <Grid item container justify="center">
          <Pagination
            page={page}
            onChange={handleChange}
            count={paginationCount}
            defaultPage={1}
            siblingCount={1}
            boundaryCount={1}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookSearchPage;
