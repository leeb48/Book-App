import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import { RootState } from "app/rootReducer";
import { useAppDispatch } from "app/store";
import { removeBookFromBookshelf } from "features/bookshelf";
import { Book } from "interfaces/book.interface";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    height: 350,
  },
  image: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: 300,
    borderRadius: 15,
    minWidth: 200,
    maxWidth: 200,
  },
});

interface Props {
  book: Book;
}

const BookshelfBookItem = ({ book }: Props) => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { bookshelfName } = useSelector((state: RootState) => {
    return {
      bookshelfName: state.bookshelf.selectedBookshelf?.bookshelfName,
    };
  }, shallowEqual);

  const onRemoveBookClick = () => {
    dispatch(
      removeBookFromBookshelf({
        bookshelfName,
        book,
      })
    );
  };

  const EMPTY_BOOK_URL =
    "https://books.google.com/books/content?id=ezqe1hh91q4C&pg=PR3&img=1&zoom=5&sig=bBmzIAIiCtMcM7Ii7TUHycqqEWg";

  return (
    <Paper elevation={3}>
      <Grid
        className={classes.root}
        container
        alignContent="center"
        justify="space-evenly"
      >
        <Grid
          className={classes.image}
          style={{
            backgroundImage: `url(${
              book.imageLinks?.thumbnail || EMPTY_BOOK_URL
            })`,
          }}
          item
          xs={3}
        />
        <Grid item xs={8}>
          <Grid item>
            Title: {JSON.stringify(book.title)}
            <br />
            Author(s): {JSON.stringify(book.authors)}
            <br />
            Description:{" "}
            {`${JSON.stringify(book.description).substr(0, 600)} (cont...)`}
            <br />
            Publisher: {JSON.stringify(book.publisher)}
            <br />
            ISBN: {JSON.stringify(book.industryIdentifiers)}
            <br />
            Subject: {JSON.stringify(book.categories)}
          </Grid>
          <Grid item>
            <Button
              onClick={onRemoveBookClick}
              color="secondary"
              variant="contained"
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BookshelfBookItem;
