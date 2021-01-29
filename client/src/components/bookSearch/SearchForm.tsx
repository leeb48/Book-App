import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { RootState } from "app/rootReducer";
import { useAppDispatch } from "app/store";
import { searchBooks, SearchInfo } from "features/bookSearch/bookSearchSlice";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useForm } from "utils/useForm";
import BookItem from "./BookItem";

const SearchForm = () => {
  const { values, onChange } = useForm<SearchInfo>({
    generalSearch: "",
    title: "",
    author: "",
    publisher: "",
    subject: "",
    isbn: "",
    startIndex: 0,
    resultsPerPage: 40,
  });

  const { generalSearch } = values;
  const dispatch = useAppDispatch();

  const { searchLoading, searchResults } = useSelector((state: RootState) => {
    return {
      searchLoading: state.bookSearch.searchLoading,
      searchResults: state.bookSearch.searchResponse?.items,
    };
  }, shallowEqual);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(searchBooks(values));
  };

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item container justify="center" xs={12}>
          <form onSubmit={onSubmit}>
            <TextField
              id="standard-search"
              name="generalSearch"
              value={generalSearch}
              onChange={onChange}
              label="Search field"
              type="search"
            />
            <Button type="submit">Submit</Button>
          </form>
        </Grid>
        <Grid item container spacing={3} xs={12}>
          {searchLoading && <h3>Loading...</h3>}
          {searchResults &&
            searchResults.map((book) => (
              <Grid key={book.id} item xs={12}>
                <BookItem book={book} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchForm;
