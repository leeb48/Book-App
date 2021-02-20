import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
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

  const title = JSON.stringify(book.title).replace(/['"]+/g, "");
  const authors = book.authors?.join(", ");
  const desc = book.description
    ? JSON.stringify(book.description).substr(0, 300).replace(/['"]+/g, "") +
      " (cont...)"
    : "No Description Provided";
  const publisher = book.publisher
    ? JSON.stringify(book.publisher).replace(/['"]+/g, "")
    : "No Publisher";
  const isbn = book.industryIdentifiers?.map((isbn) => (
    <Typography key={isbn.identifier} variant="body2">
      {`${isbn.type.replace(/[_]+/g, " ")}: ${isbn.identifier}\n`}
    </Typography>
  ));
  const categories = book.categories?.join(",");

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
        <Grid item container direction="column" justify="space-between" xs={8}>
          <Grid item>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="subtitle1">{authors}</Typography>
            <Typography variant="body2">{categories}</Typography>
            <br />
            <Typography variant="body1">{desc}</Typography>
            <br />
            {isbn}
            <Typography variant="body2">{publisher}</Typography>
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
