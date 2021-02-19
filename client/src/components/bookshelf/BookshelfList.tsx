import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Bookshelf } from "features/bookshelf";
import React, { Fragment } from "react";

interface Props {
  bookshelves: Bookshelf[];
}

const BookshelfList = ({ bookshelves }: Props) => {
  return (
    <Fragment>
      {bookshelves.map((bookshelf) => (
        <Grid key={bookshelf.bookshelfIdentifier} item xs={12}>
          <Paper style={{ padding: "1rem", margin: ".5rem" }} elevation={3}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography component="p" variant="subtitle1">
                  {bookshelf.bookshelfName}
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary">
                  Remove
                </Button>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={`/bookshelf/${bookshelf.bookshelfName}`}
                >
                  View
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Fragment>
  );
};

export default BookshelfList;
