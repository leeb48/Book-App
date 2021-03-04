import {
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Bookshelf, removeBookshelf } from "features/bookshelf";
import React, { Fragment } from "react";
import { useAppDispatch } from "app/store";

interface Props {
  bookshelves: Bookshelf[];
}

const BookshelfList = ({ bookshelves }: Props) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState<{ [bookshelfName: string]: boolean }>(
    {}
  );

  const handleClickOpen = (bookshelfName: string) => {
    setOpen({ ...open, [bookshelfName]: true });
  };

  const handleClose = (bookshelfName: string) => {
    setOpen({ ...open, [bookshelfName]: false });
  };

  const onRemoveBookshelf = (bookshelfName: string) => {
    dispatch(removeBookshelf(bookshelfName));
    setOpen({ ...open, [bookshelfName]: false });
  };

  return (
    <Fragment>
      {bookshelves.map((bookshelf) => (
        <Grid key={bookshelf.bookshelfIdentifier} item xs={12}>
          <Paper style={{ padding: "1rem", margin: ".5rem" }} elevation={3}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography component="p" variant="h6">
                  Name: {bookshelf.bookshelfName}
                </Typography>
                <Typography component="p" variant="body1">
                  Book Count: {bookshelf.books.length}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "8px" }}
                  onClick={() => handleClickOpen(bookshelf.bookshelfName)}
                >
                  Remove
                </Button>

                <Dialog
                  open={
                    open[bookshelf.bookshelfName]
                      ? open[bookshelf.bookshelfName]
                      : false
                  }
                  onClose={handleClose}
                  aria-labelledby={`alert-dialog-${bookshelf.bookshelfName}`}
                  aria-describedby={`alert-dialog-desc-${bookshelf.bookshelfName}`}
                >
                  <DialogTitle id={`alert-dialog-${bookshelf.bookshelfName}`}>
                    Are you sure you want to remove {bookshelf.bookshelfName}?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      This action cannot be undone and all the books in the
                      bookshelf will be removed.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => handleClose(bookshelf.bookshelfName)}
                      color="primary"
                    >
                      Keep
                    </Button>
                    <Button
                      onClick={() => onRemoveBookshelf(bookshelf.bookshelfName)}
                      color="secondary"
                      autoFocus
                    >
                      Remove
                    </Button>
                  </DialogActions>
                </Dialog>

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
