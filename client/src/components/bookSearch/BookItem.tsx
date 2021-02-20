import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
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

  const title = JSON.stringify(book.volumeInfo.title).replace(/['"]+/g, "");
  const authors = book.volumeInfo.authors?.join(", ");
  const desc = book.volumeInfo.description
    ? JSON.stringify(book.volumeInfo.description)
        .substr(0, 300)
        .replace(/['"]+/g, "") + " (cont...)"
    : "No Description Provided";
  const publisher = book.volumeInfo.publisher
    ? JSON.stringify(book.volumeInfo.publisher).replace(/['"]+/g, "")
    : "No Publisher";
  const isbn = book.volumeInfo.industryIdentifiers?.map((isbn) => (
    <Typography key={isbn.identifier} variant="body2">
      {`${isbn.type.replace(/[_]+/g, " ")}: ${isbn.identifier}\n`}
    </Typography>
  ));
  const categories = book.volumeInfo.categories?.join(",");

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
        <Grid container direction="column" justify="space-between" item xs={8}>
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
            <AddToBookshelfSelector book={book} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BookItem;
