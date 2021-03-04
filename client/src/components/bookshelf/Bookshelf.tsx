import {
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { RootState } from "app/rootReducer";
import { useAppDispatch } from "app/store";
import { getUsersBookshelves } from "features/bookshelf";
import React, { Fragment, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BookshelfCreate from "./BookshelfCreate";
import BookshelfList from "./BookshelfList";

const Bookshelf = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, bookshelves, loading } = useSelector(
    (state: RootState) => {
      return {
        isAuthenticated: state.user.isAuthenticated,
        bookshelves: state.bookshelf.currentUsersBookshelves,
        loading: state.bookshelf.loading,
      };
    },
    shallowEqual
  );

  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/register");
    }
    dispatch(getUsersBookshelves());
  }, [dispatch, isAuthenticated, history]);

  return (
    <Fragment>
      <BookshelfCreate />

      <Container style={{ marginTop: "2rem" }} maxWidth="md">
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <Grid container>
              {bookshelves && <BookshelfList bookshelves={bookshelves} />}
            </Grid>
          </div>
        )}
      </Container>
    </Fragment>
  );
};

export default Bookshelf;
