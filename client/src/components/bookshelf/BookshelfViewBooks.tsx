import { CircularProgress, Container, Grid } from "@material-ui/core";
import { RootState } from "app/rootReducer";
import { useAppDispatch } from "app/store";
import { getBookshelf } from "features/bookshelf";
import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import BookshelfBookItem from "./BookshelfBookItem";

interface MatchParams {
  bookshelfName: string;
}
interface Props extends RouteComponentProps<MatchParams> {}

const BookshelfViewBooks = ({
  match: {
    params: { bookshelfName },
  },
}: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBookshelf(bookshelfName));
  }, [dispatch, bookshelfName]);

  const { loading, selectedBookshelf } = useSelector((state: RootState) => {
    return {
      loading: state.bookshelf.loading,
      selectedBookshelf: state.bookshelf.selectedBookshelf,
    };
  }, shallowEqual);

  const booksDisplay =
    selectedBookshelf &&
    selectedBookshelf.books.map((book) => (
      <Grid key={book.googleBooksId} item xs={12}>
        <BookshelfBookItem book={book} />
      </Grid>
    ));

  return (
    <Container style={{ marginTop: "2rem" }} maxWidth="lg">
      <Grid item container justify="center" spacing={3} xs={12}>
        {loading ? <CircularProgress /> : booksDisplay}
      </Grid>
    </Container>
  );
};

export default BookshelfViewBooks;
