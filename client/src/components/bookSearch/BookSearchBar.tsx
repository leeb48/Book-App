import { Button, Grid, TextField } from "@material-ui/core";
import { useAppDispatch } from "app/store";
import { searchBooks, SearchInfo } from "features/bookSearch/bookSearchSlice";
import React from "react";
import { useForm } from "utils/useForm";

// TODO: implement detailed search page

const BookSearchBar = () => {
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(searchBooks(values));
  };

  return (
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
  );
};

export default BookSearchBar;
