import { Grid, makeStyles, Paper } from "@material-ui/core";
import { ItemsEntity } from "interfaces/bookSearchResponse.interface";
import React from "react";
import AddToBookshelfSelector from "./AddToBookshelfSelector";

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
  book: ItemsEntity;
}

const BookItem = ({ book }: Props) => {
  const classes = useStyles();

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
              book.volumeInfo.imageLinks?.thumbnail || EMPTY_BOOK_URL
            })`,
          }}
          item
          xs={3}
        />
        <Grid container item xs={8}>
          <Grid item>
            Title: {JSON.stringify(book.volumeInfo.title)}
            <br />
            Author(s): {JSON.stringify(book.volumeInfo.authors)}
            <br />
            Description:{" "}
            {`${JSON.stringify(book.volumeInfo.description).substr(
              0,
              600
            )} (cont...)`}
            <br />
            Publisher: {JSON.stringify(book.volumeInfo.publisher)}
            <br />
            ISBN: {JSON.stringify(book.volumeInfo.industryIdentifiers)}
            <br />
            Subject: {JSON.stringify(book.volumeInfo.categories)}
          </Grid>
          <Grid item>
            <AddToBookshelfSelector book={book} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BookItem;
